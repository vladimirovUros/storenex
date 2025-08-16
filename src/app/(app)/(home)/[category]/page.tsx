import type { SearchParams } from "nuqs/server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";
import { SubcategoryRedirectToast } from "@/components/subcategory-redirect-toast";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { redirect } from "next/navigation";
interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  // Validate category using direct Payload access
  const payload = await getPayload({ config: configPromise });

  // Find category (only parent categories)
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

  // If category doesn't exist, redirect to home with toast
  if (categoryData.docs.length === 0) {
    redirect("/?category_not_found=true");
  }

  // console.log(JSON.stringify(filters), "THIS IS FROM RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubcategoryRedirectToast />
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};
export default Page;
