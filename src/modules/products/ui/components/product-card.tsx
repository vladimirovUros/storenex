import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  price,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`} className="no-underline">
      <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            // quality={80}
            // priority
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium text-gray-500">
              {authorUsername}
            </p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 text-yellow-500 fill-amber-400" />
              <p className="text-sm font-medium ">
                {reviewRating} ({reviewCount} reviews)
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-orange-400 w-fit">
            <p className="text-sm font-medium text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
  );
};
