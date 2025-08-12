import type { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "user", "product", "createdAt"],
  },
  access: {
    read: ({ req }) => {
      // Super admin vidi sve (bez tenant filtering kada nije selected)
      if (isSuperAdmin(req.user)) {
        return true;
      }

      if (req.user) {
        // Za obične usere - kombinujemo user i tenant logiku
        const conditions: any[] = [
          // Svoje kupljene ordere
          {
            user: {
              equals: req.user.id,
            },
          },
        ];

        // Ako ima tenant-e, može da vidi i ordere svojih proizvoda
        if (req.user.tenants && req.user.tenants.length > 0) {
          req.user.tenants.forEach((tenantRelation) => {
            const tenantId =
              typeof tenantRelation.tenant === "string"
                ? tenantRelation.tenant
                : tenantRelation.tenant?.id;

            if (tenantId) {
              conditions.push({
                tenant: {
                  equals: tenantId,
                },
              });
            }
          });
        }

        return {
          or: conditions,
        };
      }

      return false;
    },
    create: ({ req }) => {
      // Allow webhook system calls (when no user context)
      if (!req.user) {
        return true;
      }
      return isSuperAdmin(req.user);
    },
    update: ({ req }) => {
      return isSuperAdmin(req.user);
    },
    delete: ({ req }) => {
      return isSuperAdmin(req.user);
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
      admin: {
        allowCreate: false,
      },
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Stripe checkout session associated with the order",
      },
    },
  ],
};
