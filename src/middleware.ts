import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     *Match all paths except for the following:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // Extract the hostname (e.g., "uros.storenex,com" or "john.localhost:3000")
  const hostName = req.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostName.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostName.replace(`.${rootDomain}`, "");
    const response = NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url)
    );

    // Add caching headers for better performance
    if (url.pathname.includes("/products/")) {
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=600"
      );
    }

    return response;
  }

  return NextResponse.next();
}
