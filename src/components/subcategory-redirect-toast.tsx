"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function SubcategoryRedirectToast() {
  const searchParams = useSearchParams();
  const subcategoryNotFound = searchParams.get("subcategory_not_found");
  const categoryNotFound = searchParams.get("category_not_found");
  const tenantNotFound = searchParams.get("tenant_not_found");

  useEffect(() => {
    // Add slight delay to ensure toast provider is ready
    const timeoutId = setTimeout(() => {
      if (subcategoryNotFound) {
        toast.warning(
          `Subcategory "${subcategoryNotFound}" not found. Instead, showing parent category.`
        );

        // Remove the parameter from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete("subcategory_not_found");
        window.history.replaceState({}, "", url.toString());
      }

      if (categoryNotFound) {
        toast.warning("Category not found. Redirected to home page.");

        // Remove the parameter from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete("category_not_found");
        window.history.replaceState({}, "", url.toString());
      }

      if (tenantNotFound) {
        toast.warning("Store not found. Redirected to home page.");

        // Remove the parameter from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete("tenant_not_found");
        window.history.replaceState({}, "", url.toString());
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [subcategoryNotFound, categoryNotFound, tenantNotFound]);

  return null;
}
