import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchFiltersProps {
  disabled?: boolean;
  placeholder?: string;
}
export const SearchInput = ({
  disabled = false,
  placeholder = "Search...",
}: SearchFiltersProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4  text-neutral-500" />
        <Input
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          className="pl-8"
        />
        {/*TODO: Add categories view button*/}
        {/*TODO: Add library button*/}
      </div>
    </div>
  );
};
