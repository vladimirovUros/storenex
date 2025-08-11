import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
}

export function formatCurrency(value: number | string) {
  const numericValue = Number(value);

  // If it's a whole number, show no decimals
  if (numericValue % 1 === 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numericValue);
  }

  // If it has decimals, show up to 1 decimal place
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(numericValue);
}

export function formatPrice(value: number | string) {
  const numericValue = Number(value);

  // Always round prices to nearest whole number, no decimals
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(numericValue));
}

export function formatRating(value: number | string) {
  const numericValue = Number(value);

  // If it's a whole number, show no decimals
  if (numericValue % 1 === 0) {
    return numericValue.toString();
  }

  // If it has decimals, show up to 1 decimal place
  return numericValue.toFixed(1);
}

export function getRoundedPrice(value: number | string): number {
  const numericValue = Number(value);
  return Math.round(numericValue);
}
