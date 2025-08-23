import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;

      const tenantsData = await payload.find({
        collection: "tenants",
        depth: 1, // "tenant.image is a type of "Media" and I want to fetch it.... But I alredy saw that payload local API does not change typescript depending on the depth, so i need to do it manually.. Kad bi bilo depth 0, ne bi radilo tj ne vi se videla slika.
        where: {
          slug: {
            equals: input.slug,
          },
        },
        limit: 1,
        pagination: false,
      });

      const tenant = tenantsData.docs[0];

      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Tenant with slug '${input.slug}' not found`,
        });
      }

      return tenant as Tenant & { image: Media | null };
    }),
});
