import type { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { SubcategoryRedirectToast } from "@/components/subcategory-redirect-toast";
import {
  SearchFilters,
  SearchFiltersLoading,
} from "@/modules/home/ui/components/search-filters";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  // console.log(JSON.stringify(filters), "THIS IS FROM RSC");

  const queryClient = getQueryClient();

  // Prefetch categories for search filters
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Add SearchFilters only on homepage */}
      <Suspense fallback={<SearchFiltersLoading />}>
        <SearchFilters />
      </Suspense>
      <SubcategoryRedirectToast />
      <ProductListView />
    </HydrationBoundary>
  );
};
export default Page;
