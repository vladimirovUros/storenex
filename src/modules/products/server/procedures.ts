import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";
import { headers as getHeaders } from "next/headers";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.dataBase.auth({ headers });

      const product = await ctx.dataBase.findByID({
        collection: "products",
        id: input.id,
        depth: 2, // Load the "product.image", "product.tenant", and "product.tenant.image"
      });

      if (!product) {
        throw new Error("Product not found");
      }

      let isPurchased = false;

      if (session.user) {
        const ordersData = await ctx.dataBase.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              {
                product: {
                  equals: input.id,
                },
              },
              {
                user: {
                  equals: session.user.id,
                },
              },
            ],
          },
        });

        isPurchased = ordersData.totalDocs > 0;
        // isPurchased = !!ordersData.docs[0];
      }

      const reviews = await ctx.dataBase.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            equals: input.id,
          },
        },
      });

      const reviewRating =
        reviews.docs.length > 0
          ? reviews.docs.reduce((acc, review) => acc + review.rating, 0) /
            reviews.totalDocs
          : 0;

      const ratingDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      if (reviews.totalDocs > 0) {
        reviews.docs.forEach((review) => {
          const rating = review.rating;
          if (rating >= 1 && rating <= 5) {
            ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
          }
        });

        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key);
          const count = ratingDistribution[rating] || 0;
          ratingDistribution[rating] = Math.round(
            (count / reviews.totalDocs) * 100
          );
        });
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null }, //loading the tenant is depth 1 and loading the image is depth 2 so its need to be depth 2 above
        reviewRating,
        reviewCount: reviews.totalDocs,
        ratingDistribution,
      };
    }),
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

      const productIds = data.docs.map((doc) => doc.id);

      const allReviewsData = await ctx.dataBase.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            in: productIds,
          },
        },
      });

      const reviewsByProductId = allReviewsData.docs.reduce(
        (acc, review) => {
          const productId =
            typeof review.product === "string"
              ? review.product
              : review.product.id;
          if (!acc[productId]) {
            acc[productId] = [];
          }
          acc[productId].push(review);
          return acc;
        },
        {} as Record<string, typeof allReviewsData.docs>
      );

      const dataWithSummarizeReviews = data.docs.map((doc) => {
        const productReviews = reviewsByProductId[doc.id] || [];
        const reviewCount = productReviews.length;
        const reviewRating =
          reviewCount === 0
            ? 0
            : productReviews.reduce((acc, review) => acc + review.rating, 0) /
              reviewCount;

        return {
          ...doc,
          reviewCount,
          reviewRating,
        };
      });

      return {
        ...data,
        docs: dataWithSummarizeReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
