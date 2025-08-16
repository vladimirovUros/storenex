"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilter } from "./tags-filter";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="text-lg font-semibold">{title}</p>
        <Icon className="size-5 text-gray-500" />
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};
export const ProductFilters = ({}) => {
  const [filters, setFilters] = useProductFilters();

  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false;

    if (Array.isArray(value)) {
      // For arrays, check if they are not empty, which indicates that there are selected tags. za tag.. ta se ne bi prikazavalo clear all...
      return value.length > 0;
    }

    if (typeof value === "string") {
      return value.trim() !== "";
    }
    if (typeof value === "number") {
      return value > 0;
    }
    return value !== undefined && value !== null;
  });

  const onClear = () => {
    setFilters({
      search: "", // Default vrednost kao što je definisano u params
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p>
          <span className="text-lg font-semibold">Filters</span>
        </p>
        {hasAnyFilters && (
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer"
            onClick={() => onClear()}
          >
            Clear All
          </button>
        )}
      </div>
      <ProductFilter title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Tags" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onChange={(value) => onChange("tags", value)}
        />
      </ProductFilter>
    </div>
  );
};
