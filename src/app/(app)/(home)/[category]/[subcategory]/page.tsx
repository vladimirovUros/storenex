import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { redirect } from "next/navigation";
import configPromise from "@payload-config";
import { getPayload } from "payload";

interface Props {
  // params: Promise<{ subcategory: string }>;
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
  // const { subcategory } = await params;
  const { category, subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  // Validate subcategory using direct Payload access
  const payload = await getPayload({ config: configPromise });

  // Find parent category
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

  // If parent category doesn't exist, redirect to home
  if (!parentCategory) {
    redirect("/?category_not_found=true");
  }

  // Check if subcategory exists and belongs to parent
  const subcategories = parentCategory.subcategories?.docs ?? [];
  const subcategoryExists = subcategories.some(
    (subcat) => typeof subcat === "object" && subcat.slug === subcategory
  );

  // If subcategory doesn't exist, redirect to parent category
  if (!subcategoryExists) {
    redirect(`/${category}?subcategory_not_found=${subcategory}`);
  }

  // console.log(JSON.stringify(filters), "THIS IS FROM RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};
export default Page;
