"use client";

import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "oldest" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "oldest" })}
      >
        Oldest
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "best_rated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "best_rated" })}
      >
        Best Rated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
