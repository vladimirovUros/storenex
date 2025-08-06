import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      const min = parseFloat(input.minPrice ?? "");
      const max = parseFloat(input.maxPrice ?? "");

      let sort: Sort = "-createdAt"; // Default sort

      // if (input.sort === "trending") {
      //   sort = "name";
      // } else if (input.sort === "price-asc") {
      //   sort = "price";
      // } else if (input.sort === "price-desc") {
      //   sort = "-price";
      // } else if (input.sort === "best-selling") {
      //   sort = "-salesCount";
      // } else if (input.sort === "highest-rated") {
      //   sort = "-averageRating";
      // } else if (input.sort === "most-discounted") {
      //   sort = "-discountPercentage";
      // } else if (input.sort === "relevance") {
      //   sort = "-relevanceScore";
      // } else if (input.sort === "hot_and_new") {
      //   sort = "+createdAt";
      // } else if (input.sort === "curated") {
      //   sort = "-createdAt";
      // }

      if (input.sort === "curated") {
        sort = "-createdAt"; // Default sort for curated
      } else if (input.sort === "hot_and_new") {
        sort = "+createdAt"; // Sort by creation date for hot and new
      } else if (input.sort === "trending") {
        sort = "-createdAt";
      }

      //Backend validation for minPrice and maxPrice
      if (!isNaN(min) && !isNaN(max) && min > max) {
        throw new Error("Minimum price cannot be greater than maximum price.");
      }
      const priceFilter: Record<string, number> = {};
      if (!isNaN(min)) {
        priceFilter.greater_than_equal = min;
      }
      if (!isNaN(max)) {
        priceFilter.less_than_equal = max;
      }
      if (Object.keys(priceFilter).length > 0) {
        where.price = priceFilter;
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

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
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }
      const payload = ctx.dataBase;
      const data = await payload.find({
        collection: "products",
        depth: 2, //Populate "category", & "image", "tenant" & "tenant.image"
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
        // pagination: true,
      });

      // console.log(JSON.stringify(data.docs, null, 2));

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
