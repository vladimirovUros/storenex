import type { SearchParams } from "nuqs/server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";
import { SubcategoryRedirectToast } from "@/components/subcategory-redirect-toast";
import {
  SearchFilters,
  SearchFiltersLoading,
} from "@/modules/home/ui/components/search-filters";
import { Suspense } from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { redirect } from "next/navigation";
interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "auto";
export const revalidate = 300;

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const payload = await getPayload({ config: configPromise });

  const categoryData = await payload.find({
    collection: "categories",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: category,
      },
      parent: {
        exists: false,
      },
    },
  });

  if (categoryData.docs.length === 0) {
    redirect("/?category_not_found=true");
  }

  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery(trpc.categories.getMany.queryOptions()),
      queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
          ...filters,
          category,
          limit: DEFAULT_LIMIT,
        })
      ),
    ]);
  } catch (error) {
    console.warn("Prefetch failed:", error);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SearchFiltersLoading />}>
        <SearchFilters />
      </Suspense>
      <SubcategoryRedirectToast />
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};
export default Page;
