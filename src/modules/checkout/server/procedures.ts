import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import z from "zod";
import { CheckOutMetadata, ProductMetadata } from "../types";
import { stripe } from "@/lib/stripe";
import { getRoundedPrice } from "@/lib/utils";
import { PLATFORM_FEE_PERCENTAGE } from "@/constants";

export const checkoutRouter = createTRPCRouter({
  verify: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.dataBase.findByID({
      collection: "users",
      id: ctx.session.user.id,
      depth: 0, //user.tenatns[0].tenant ce biti string (tenant ID), necu popuniti ovo.
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const tenantId = user.tenants?.[0]?.tenant as string; // Ovo je id zbog depth 0
    const tenant = await ctx.dataBase.findByID({
      collection: "tenants",
      id: tenantId,
    });

    if (!tenant) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tenant not found",
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: tenant.stripeAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_API_URL!}/admin`,
      return_url: `${process.env.NEXT_PUBLIC_API_URL!}/admin`,
      type: "account_onboarding",
    });

    if (!accountLink.url) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to create verification link",
      });
    }

    return { url: accountLink.url };
  }),
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string().min(1)),
        tenantSlug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.dataBase.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });
      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      const tenantsData = await ctx.dataBase.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });
      const tenant = tenantsData.docs[0];
      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      if (!tenant.stripeDetailsSubmitted) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tenant not allowed to sell products",
        });
      }

      //throw error if stripe details not submitted
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => {
          const roundedPrice = getRoundedPrice(product.price);
          return {
            quantity: 1,
            price_data: {
              unit_amount: roundedPrice * 100,
              currency: "usd",
              product_data: {
                name: product.name,
                metadata: {
                  stripeAccountId: tenant.stripeAccountId,
                  id: product.id,
                  name: product.name,
                  price: roundedPrice,
                } as ProductMetadata,
              },
            },
          };
        });

      const totalAmount = products.docs.reduce(
        (acc, item) => acc + item.price * 100,
        0
      );
      const platformFeeAmount = Math.round(
        totalAmount * (PLATFORM_FEE_PERCENTAGE / 100)
      );

      const checkout = await stripe.checkout.sessions.create(
        {
          customer_email: ctx.session.user.email,
          success_url: `${process.env.NEXT_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
          mode: "payment",
          line_items: lineItems,
          invoice_creation: {
            enabled: true,
          },
          metadata: {
            userId: ctx.session.user.id,
          } as CheckOutMetadata,
          payment_intent_data: {
            application_fee_amount: platformFeeAmount,
          },
        },
        {
          stripeAccount: tenant.stripeAccountId,
        }
      );
      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }
      return { url: checkout.url };
    }),
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()), //.min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;
      const data = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      return {
        ...data,
        totalPrice: data.docs.reduce((acc, product) => acc + product.price, 0),
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
