import {
  ProductView,
  ProductViewSkeleton,
} from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ productId: string; slug: string }>;
}

// Optimized: static where possible, dynamic only when needed
export const dynamic = "auto";
export const revalidate = 60; // Cache for 60 seconds

const Page = async ({ params }: Props) => {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();

  try {
    // Use Promise.all for parallel fetching
    await Promise.all([
      queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug })),
      queryClient.prefetchQuery(
        trpc.products.getOne.queryOptions({ id: productId })
      ),
    ]);
  } catch (error) {
    // Log error but don't block rendering
    console.warn("Prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
