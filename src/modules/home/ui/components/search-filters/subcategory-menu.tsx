import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";

interface SubcategoryMenuProps {
  category: CategoriesGetManyOutput[number];
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: SubcategoryMenuProps) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div className="absolute z-[100]" style={{ top: "100%", left: 0 }}>
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_4px_0px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
