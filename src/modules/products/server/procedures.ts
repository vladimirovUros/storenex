import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";
import { headers as getHeaders } from "next/headers";
import { TRPCError } from "@trpc/server";

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
        select: {
          content: false,
        },
      });

      if (product.isArchived) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

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
        search: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        isArchived: { not_equals: true },
      };
      const min = parseFloat(input.minPrice ?? "");
      const max = parseFloat(input.maxPrice ?? "");

      let sort: Sort = "-createdAt";
      if (input.sort === "curated") sort = "-createdAt";
      else if (input.sort === "hot_and_new") sort = "+createdAt";
      else if (input.sort === "trending") sort = "-createdAt";

      if (!isNaN(min) && !isNaN(max) && min > max) {
        throw new Error("Minimum price cannot be greater than maximum price.");
      }

      const priceFilter: Record<string, number> = {};
      if (!isNaN(min)) priceFilter.greater_than_equal = min;
      if (!isNaN(max)) priceFilter.less_than_equal = max;
      if (Object.keys(priceFilter).length > 0) where.price = priceFilter;

      if (input.tenantSlug) {
        where["tenant.slug"] = { equals: input.tenantSlug };
      } else {
        where["isPrivate"] = { not_equals: true };
      }

      if (input.category) {
        const categoriesData = await ctx.dataBase.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((sub) => sub.slug)
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
      }

      // 🔹 Advanced search (bez description)
      const searchValue = input.search?.trim();
      if (searchValue) {
        const words = searchValue.split(/\s+/);
        const makeLikeConditions = (field: string) =>
          words.map((word) => ({ [field]: { like: word } }));

        if (words.length > 1) {
          where["or"] = [
            { and: makeLikeConditions("name") },
            { and: makeLikeConditions("tags.name") },
            { and: makeLikeConditions("category.name") },
          ];
        } else {
          where["or"] = [
            { name: { contains: searchValue } },
            { name: { like: searchValue } },
            { "tags.name": { contains: searchValue } },
            { "tags.name": { like: searchValue } },
            { "category.name": { contains: searchValue } },
            { "category.name": { like: searchValue } },
          ];
        }
      }

      const payload = ctx.dataBase;
      const fetchLimit = input.limit * 3;
      const data = await payload.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: fetchLimit,
        select: { content: false },
      });

      // 🔹 Weighted scoring (title > tags > category)
      if (searchValue) {
        const words = searchValue.split(/\s+/);
        const dataWithScore = data.docs.map((doc) => {
          let score = 0;
          const titleLower = doc.name?.toLowerCase() || "";

          words.forEach((word) => {
            const w = word.toLowerCase();
            if (titleLower.includes(w)) score += 4;

            if (Array.isArray(doc.tags) && doc.tags.length) {
              doc.tags.forEach((tag) => {
                const tagName = typeof tag === "string" ? tag : tag.name;
                if (tagName?.toLowerCase().includes(w)) score += 1;
              });
            }

            const categoryName =
              typeof doc.category === "string"
                ? doc.category
                : doc.category?.name;
            if (categoryName?.toLowerCase().includes(w)) score += 0.5;
          });

          return { ...doc, score };
        });

        data.docs = dataWithScore
          .sort((a, b) => b.score - a.score)
          .slice(0, input.limit);
      }

      const productIds = data.docs.map((doc) => doc.id);

      const allReviewsData = await ctx.dataBase.find({
        collection: "reviews",
        pagination: false,
        where: { product: { in: productIds } },
      });

      const reviewsByProductId = allReviewsData.docs.reduce(
        (acc, review) => {
          const productId =
            typeof review.product === "string"
              ? review.product
              : review.product.id;
          if (!acc[productId]) acc[productId] = [];
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

        return { ...doc, reviewCount, reviewRating };
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
