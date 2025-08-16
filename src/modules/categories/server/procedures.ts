// import configPromise from "@payload-config";
// import { getPayload } from "payload"; ovo SAD NE TREBA JER SAM U INIT.TS PROMENIO baseProcedure DA NE BIH MORAO DA SVUDA PISHEM getPayload({ config: configPromise }) jer se to vec radi u baseProcedure
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";
import z from "zod";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const payload = ctx.dataBase; // Using the payload instance from the context
    const data = await payload.find({
      collection: "categories",
      depth: 1, //Populate subcategories, subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });
    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        //Because of 'depth: 1' i know "doc" will be a type of "Category"
        ...(doc as Category),
      })),
    }));
    // This is where you would fetch categories from your database or any other source
    // For demonstration, we return a static list of categories
    return formattedData;
  }),
  validateSubcategory: baseProcedure
    .input(
      z.object({
        category: z.string(),
        subcategory: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;

      // Find parent category
      const parentCategoryData = await payload.find({
        collection: "categories",
        limit: 1,
        depth: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.category,
          },
          parent: {
            exists: false,
          },
        },
      });

      const parentCategory = parentCategoryData.docs[0];
      if (!parentCategory) {
        return { isValid: false, parentExists: false };
      }

      // Check if subcategory exists and belongs to parent
      const subcategories = (parentCategory.subcategories?.docs ?? []).map(
        (doc) => ({
          ...(doc as Category),
        })
      );

      const subcategoryExists = subcategories.some(
        (subcat) => subcat.slug === input.subcategory
      );

      return {
        isValid: subcategoryExists,
        parentExists: true,
        parentCategory: {
          slug: parentCategory.slug,
          name: parentCategory.name,
        },
      };
    }),
});
