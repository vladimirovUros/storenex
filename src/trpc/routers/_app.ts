import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
import { libraryRouter } from "@/modules/library/server/procedures";
import { reviewsRouter } from "@/modules/reviews/server/procedures";
import { ordersRouter } from "@/modules/orders/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  reviews: reviewsRouter,
  checkout: checkoutRouter,
  products: productsRouter,
  library: libraryRouter,
  orders: ordersRouter,
  categories: categoriesRouter,
});
export type AppRouter = typeof appRouter;
