import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange?: (value: string) => void;
  onMaxPriceChange?: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");

  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");
  if (!formattedValue) return "";
  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    //Get the raw input value and extract only numeric values
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMinPriceChange?.(numericValue);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPriceChange?.(numericValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base" htmlFor="minPrice">
          Minimum Price
        </Label>
        <Input
          id="minPrice"
          type="text"
          placeholder="$0.00"
          value={formatAsCurrency(minPrice ?? "")}
          onChange={handleMinPriceChange}
          //   onBlur={(e) => {
          //     const formattedValue = formatAsCurrency(e.target.value);
          //     if (onMinPriceChange) {
          //       onMinPriceChange(formattedValue.replace(/[^0-9.]/g, ""));
          //     }
          //   }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base" htmlFor="maxPrice">
          Maximum Price
        </Label>
        <Input
          id="maxPrice"
          type="text"
          placeholder="∞"
          value={formatAsCurrency(maxPrice ?? "")}
          onChange={handleMaxPriceChange}
          //   onBlur={(e) => {
          //     const formattedValue = formatAsCurrency(e.target.value);
          //     if (onMaxPriceChange) {
          //       onMaxPriceChange(formattedValue.replace(/[^0-9.]/g, ""));
          //     }
          //   }}
        />
      </div>
    </div>
  );
};
