"use client";

import { Button, Link, useAuth } from "@payloadcms/ui";
import { useEffect, useState } from "react";

export const StripeVerify = () => {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      // Provjeri da li user ima tenant-e
      if (!user?.tenants || user.tenants.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Uzmi prvi tenant (ili možeš dodati logiku za odabir)
        const firstTenant = user.tenants[0];
        const tenantId =
          typeof firstTenant.tenant === "string"
            ? firstTenant.tenant
            : firstTenant.tenant?.id;

        if (!tenantId) {
          setLoading(false);
          return;
        }

        // Fetch tenant data to check stripeDetailsSubmitted
        const response = await fetch(`/api/tenants/${tenantId}`, {
          credentials: "include",
        });

        if (response.ok) {
          const tenant = await response.json();
          setIsVerified(!!tenant.stripeDetailsSubmitted);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }

      setLoading(false);
    };

    checkVerificationStatus();
  }, [user]);

  // Don't show anything if loading
  if (loading) {
    return null;
  }

  // Don't show verify button if user doesn't have tenants or is already verified
  if (!user?.tenants || user.tenants.length === 0 || isVerified) {
    return null;
  }

  return (
    <>
      <h5>Verify your Stripe account</h5>
      <Link href="/stripe-verify">
        <Button>Verify account</Button>
      </Link>
    </>
  );
};
