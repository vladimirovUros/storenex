import Link from "next/link";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}
interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: UseQueryResult<any, any>;
}
export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
  session,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Choose an option from the menu
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            {session.data?.user ? (
              <Link
                href="/admin"
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors"
                onClick={() => onOpenChange(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  Start selling
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
