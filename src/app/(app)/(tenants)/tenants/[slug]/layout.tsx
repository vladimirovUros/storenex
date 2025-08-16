import { redirect } from "next/navigation";
import configPromise from "@payload-config";
import { getPayload } from "payload";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;

  // Validate tenant using direct Payload access
  const payload = await getPayload({ config: configPromise });

  const tenantsData = await payload.find({
    collection: "tenants",
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    pagination: false,
  });

  const tenant = tenantsData.docs[0];

  // If tenant doesn't exist, redirect to home
  if (!tenant) {
    redirect("/?tenant_not_found=true");
  }

  return <>{children}</>;
};

export default Layout;
