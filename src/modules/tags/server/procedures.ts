import { DEFAULT_CURSOR, DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(DEFAULT_CURSOR),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const payload = ctx.dataBase;
      const data = await payload.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
        // depth: 0,
      });

      return data;
    }),
});
