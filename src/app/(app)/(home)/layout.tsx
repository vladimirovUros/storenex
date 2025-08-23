import { Navbar } from "@/modules/home/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
export default Layout;
