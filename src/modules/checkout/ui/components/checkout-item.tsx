import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";

interface CheckoutItemProps {
  price: number;
  name: string;
  isLast?: boolean;
  imageUrl?: string | null;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  onRemove: () => void;
}

export const CheckoutItem = ({
  price,
  name,
  isLast,
  imageUrl,
  productUrl,
  tenantUrl,
  tenantName,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            fill
            sizes="8.5rem"
            alt={name}
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h3 className="font-bold underline">{name}</h3>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatPrice(price)}</p>
        <button
          className="underline font-medium cursor-pointer"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
