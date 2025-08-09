import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface CheckoutSidebarProps {
  total: number;
  onPurchase: () => void;
  isCanceled?: boolean;
  disabled?: boolean;
}

export const CheckoutSidebar = ({
  total,
  onPurchase,
  isCanceled,
  disabled,
}: CheckoutSidebarProps) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <h3 className="font-bold text-lg p-2.5">Order Summary</h3>
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg">Total:</h4>
        <p className="font-bold text-lg">{formatCurrency(total)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          variant="elevated"
          disabled={disabled}
          onClick={onPurchase}
          size="lg"
          className="text-base w-full text-white bg-primary hover:bg-orange-500 hover:text-primary"
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex items-center justify-center border-t">
          <div className="bg-red-500 border  font-medium px-4 py-3 rounded flex items-center w-full ">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-50" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
