import { headers as getHeaders } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
// import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";
import { stripe } from "@/lib/stripe";

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
            message: "An account with this email is already registered",
          });
        }

        const account = await stripe.accounts.create({});

        if (!account) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to create Stripe account",
          });
        }

        const tenant = await ctx.dataBase.create({
          collection: "tenants",
          data: {
            name: input.username,
            slug: input.username,
            stripeAccountId: account.id,
          },
        });

        await ctx.dataBase.create({
          collection: "users",
          data: {
            email: input.email,
            username: input.username,
            password: input.password,
            isVerified: false, // Eksplicitno postaviti na false
            tenants: [
              {
                tenant: tenant.id,
              },
            ],
          },
        });

        // NE prijavljuj korisnika automatski - mora prvo da verifikuje email
        return {
          success: true,
          message:
            "Account created successfully! Please check your email to verify your account.",
        };
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
      // Prvo pronađi korisnika da proveriš da li je verifikovan
      const users = await ctx.dataBase.find({
        collection: "users",
        where: {
          email: { equals: input.email },
        },
        limit: 1,
      });

      if (users.docs.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.",
        });
      }

      const user = users.docs[0];

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.",
        });
      }

      // Proveri da li je korisnik verifikovan
      if (!user.isVerified) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Please verify your email address before signing in. Check your inbox for verification link.",
        });
      }

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

      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password.",
      });
    }
  }),
});
