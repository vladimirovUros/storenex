"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  disabled?: boolean;
  placeholder?: string;
  data: CustomCategory[];
}
export const SearchInput = ({
  disabled = false,
  placeholder = "Search...",
  data,
}: SearchFiltersProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4  text-neutral-500" />
        <Input
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          className="pl-8"
        />
      </div>
      {/*TODO: Add categories view button*/}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/*TODO: Add library button*/}
    </div>
  );
};
