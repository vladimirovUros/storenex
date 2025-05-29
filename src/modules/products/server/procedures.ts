import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ category: z.string().nullable().optional() }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.dataBase.find({
          collection: "categories",
          limit: 1,
          depth: 1, //Populate subcategories, subcategories.[0] will be a type of "Category"
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        // console.log(JSON.stringify(categoriesData, null, 2));

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            //Because of 'depth: 1' i know "doc" will be a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategories) => subcategories.slug
            )
          );
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
        };
      }
      const payload = ctx.dataBase;
      const data = await payload.find({
        collection: "products",
        depth: 1, //Populate "category", & "image"
        where,
      });

      return data;
    }),
});
