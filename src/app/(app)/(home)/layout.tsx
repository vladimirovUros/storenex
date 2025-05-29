//these is where i fetch and format data
import { getQueryClient, trpc } from "@/trpc/server";

import { Navbar } from "@/modules/home/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";
import {
  SearchFilters,
  SearchFiltersLoading,
} from "@/modules/home/ui/components/search-filters";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  const queryOptions = trpc.categories.getMany.queryOptions();
  void queryClient.prefetchQuery(queryOptions);
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <HydrateClient> */}
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      {/* </HydrateClient> */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
