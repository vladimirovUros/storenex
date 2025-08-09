"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchFiltersProps {
  disabled?: boolean;
  placeholder?: string;
}
export const SearchInput = ({
  disabled = false,
  placeholder = "Search...",
}: SearchFiltersProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4  text-neutral-500" />
        <Input
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          className="pl-8"
        />
      </div>
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {isClient && session.isSuccess && session.data?.user && (
        <Link prefetch href="/library">
          <Button variant="elevated" className="flex items-center gap-2">
            Library
            <BookmarkCheckIcon />
          </Button>
        </Link>
      )}
    </div>
  );
};
