import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        asChild
        className="flex-1 font-medium bg-yellow-400"
      >
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/library/${productId}`}>
          View in Library
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 bg-orange-500",
        cart.isProductInCart(productId) && "bg-red-600"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from Cart" : "Add to cart"}
    </Button>
  );
};
