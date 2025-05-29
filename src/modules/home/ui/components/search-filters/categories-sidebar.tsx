import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface CategoriesSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: CategoriesSidebarProps) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();

  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[number] | null
  >(null);

  //if we have parent categories, show those, otherwise show the root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange?.(open);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutput[number]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      // If the category has subcategories, set it as the parent
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
      // Update the current categories to show subcategories
    } else {
      // This is a leaf category, (no subcategories)
      if (parentCategories && selectedCategory) {
        //This is a subcategory, navigate to /category/subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        // This is a main category, navigate to /category
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories && selectedCategory) {
      // If we have parent categories, go back to the previous level
      setParentCategories(null);
      setSelectedCategory(null);
    } else {
      // If we are at the root level, close the sidebar
      handleOpenChange(false);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories?.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
