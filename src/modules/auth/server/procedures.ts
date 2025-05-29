import { headers as getHeaders } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
// import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.dataBase.auth({ headers });

    // console.log(session);

    return session || null;
  }),
  // logout: baseProcedure.mutation(async () => {
  //   const cookies = await getCookies();
  //   cookies.delete({
  //     name: AUTH_COOKIE,
  //     // path: "/",
  //   });
  // }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const existingUsername = await ctx.dataBase.find({
          collection: "users",
          limit: 1,
          where: {
            username: { equals: input.username },
          },
        });

        const existingUser = existingUsername.docs[0];

        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username already taken",
          });
        }

        const existingEmail = await ctx.dataBase.find({
          collection: "users",
          limit: 1,
          where: {
            email: { equals: input.email },
          },
        });

        const existingEmailUser = existingEmail.docs[0];

        if (existingEmailUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An account with this email already exists",
          });
        }

        await ctx.dataBase.create({
          collection: "users",
          data: {
            email: input.email,
            username: input.username,
            password: input.password,
          },
        });

        const data = await ctx.dataBase.login({
          collection: "users",
          data: {
            email: input.email,
            password: input.password,
          },
        });
        if (!data.token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Failed to log in, Invalid email or password",
          });
        }

        await generateAuthCookie({
          prefix: ctx.dataBase.config.cookiePrefix,
          value: data.token,
        });
      } catch (error: unknown) {
        // console.log("Registration error:", error);!!!!!!!!!!!!!!!

        if (error instanceof TRPCError) {
          throw error;
        }

        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message || "Failed to register user",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during registration",
        });
      }
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    try {
      const data = await ctx.dataBase.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data || !data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.", // Opšta poruka
        });
      }

      await generateAuthCookie({
        prefix: ctx.dataBase.config.cookiePrefix,
        value: data.token,
      });
      return data;
    } catch (error: unknown) {
      console.error(`Login failed for ${input.email}:`, error);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password.",
      });
    }
  }),
});
