import { Media, Tenant, User, Product } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { DEFAULT_LIMIT } from "@/constants";
import { isSuperAdmin } from "@/lib/access";

export const ordersRouter = createTRPCRouter({
  // Za vlasnika prodavnice da vidi ordere svojih proizvoda
  getMyStoreOrders: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;
      const user = ctx.session.user;

      if (!isSuperAdmin(user) && (!user.tenants || user.tenants.length === 0)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to any store orders",
        });
      }

      let whereCondition = {};

      if (isSuperAdmin(user)) {
        whereCondition = {};
      } else {
        if (!user.tenants || user.tenants.length === 0) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "No tenant associated with user",
          });
        }

        const firstTenant = user.tenants[0];
        if (!firstTenant || !firstTenant.tenant) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Invalid tenant data",
          });
        }

        const tenantId =
          typeof firstTenant.tenant === "string"
            ? firstTenant.tenant
            : firstTenant.tenant.id;

        whereCondition = {
          tenant: {
            equals: tenantId,
          },
        };
      }

      const ordersData = await payload.find({
        collection: "orders",
        page: input.cursor,
        limit: input.limit,
        where: whereCondition,
        depth: 2, // Da dobijemo user, product i tenant podatke
        sort: "-createdAt",
      });

      return {
        ...ordersData,
        docs: ordersData.docs.map((order) => ({
          ...order,
          user: order.user as User,
          product: {
            ...(order.product as Product),
            image: (order.product as Product).image as Media | null,
          },
          tenant: order.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  getMyOrders: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;
      const user = ctx.session.user;

      const ordersData = await payload.find({
        collection: "orders",
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: user.id,
          },
        },
        depth: 2,
        sort: "-createdAt",
      });

      return {
        ...ordersData,
        docs: ordersData.docs.map((order) => ({
          ...order,
          product: {
            ...(order.product as Product),
            image: (order.product as Product).image as Media | null,
          },
          tenant: order.tenant as Tenant & { image: Media | null },
        })),
      };
    }),

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;
      const user = ctx.session.user;

      const order = await payload.findByID({
        collection: "orders",
        id: input.id,
        depth: 2,
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      const isOwner = (order.user as User).id === user.id;

      let isTenantOwner = false;
      if (user.tenants && user.tenants.length > 0) {
        isTenantOwner = user.tenants.some((t) => {
          if (!t || !t.tenant) return false;

          const tenantId =
            typeof t.tenant === "string" ? t.tenant : t.tenant.id;
          const orderTenantId =
            typeof order.tenant === "string" ? order.tenant : order.tenant?.id;

          return tenantId === orderTenantId;
        });
      }

      if (!isSuperAdmin(user) && !isOwner && !isTenantOwner) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this order",
        });
      }

      return {
        ...order,
        user: order.user as User,
        product: {
          ...(order.product as Product),
          image: (order.product as Product).image as Media | null,
        },
        tenant: order.tenant as Tenant & { image: Media | null },
      };
    }),
});
