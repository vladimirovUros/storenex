"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarPickerProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({
  value = 0,
  onChange,
  disabled,
  className,
}: StarPickerProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleChange = (value: number) => {
    // console.log("Star selected:", { value });
    if (disabled) return;
    onChange?.(value);
  };

  const handleMouseEnter = (star: number) => {
    if (disabled) return;
    setHoverValue(star);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverValue(0);
  };

  return (
    <div
      className={cn(
        "flex items-center",
        disabled && "opacity-80 cursor-not-allowed",
        className
      )}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn(
            "p-0.5 transition",
            !disabled && "cursor-pointer hover:scale-110",
            disabled && "cursor-not-allowed"
          )}
          onClick={() => handleChange(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          <StarIcon
            className={cn(
              "size-6",
              (hoverValue || value) >= star
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 fill-gray-300 stroke-neutral-400"
            )}
          />
        </button>
      ))}
    </div>
  );
};
