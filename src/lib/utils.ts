import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateTenantURL(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantSlug}`;
  }
  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;
  if (!domain) {
    throw new Error(
      "NEXT_PUBLIC_ROOT_DOMAIN is not defined in environment variables"
    );
  }
  return `${protocol}://${tenantSlug}.${domain}`;
}
export function getSignInURL() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_API_URL}/sign-in`;
  } else {
    const protocol = "https";
    const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;
    return `${protocol}://${domain}/sign-in`;
  }
}
export function redirectToSignIn() {
  window.location.href = getSignInURL();
}
export function formatCurrency(value: number | string) {
  const numericValue = Number(value);
  if (numericValue % 1 === 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numericValue);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(numericValue);
}
export function formatPrice(value: number | string) {
  const numericValue = Number(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(numericValue));
}
export function formatRating(value: number | string) {
  const numericValue = Number(value);
  if (numericValue % 1 === 0) {
    return numericValue.toString();
  }
  return numericValue.toFixed(1);
}
export function getRoundedPrice(value: number | string): number {
  const numericValue = Number(value);
  return Math.round(numericValue);
}
