import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { redirect } from "next/navigation";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  SearchFilters,
  SearchFiltersLoading,
} from "@/modules/home/ui/components/search-filters";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
  const { category, subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  const payload = await getPayload({ config: configPromise });

  const parentCategoryData = await payload.find({
    collection: "categories",
    limit: 1,
    depth: 1,
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

  const parentCategory = parentCategoryData.docs[0];

  if (!parentCategory) {
    redirect("/?category_not_found=true");
  }

  const subcategories = parentCategory.subcategories?.docs ?? [];
  const subcategoryExists = subcategories.some(
    (subcat) => typeof subcat === "object" && subcat.slug === subcategory
  );

  if (!subcategoryExists) {
    redirect(`/${category}?subcategory_not_found=${subcategory}`);
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SearchFiltersLoading />}>
        <SearchFilters />
      </Suspense>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};
export default Page;
