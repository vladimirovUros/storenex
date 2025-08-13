import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: ({ req }) => {
      // Super admin može da vidi sve
      if (isSuperAdmin(req.user)) return true;

      // Ostali mogu da vide samo svoje media fajlove
      if (req.user?.tenants?.[0]?.tenant) {
        const tenant = req.user.tenants[0].tenant as Tenant;
        return {
          tenants: {
            contains: tenant.id,
          },
        };
      }

      return false;
    },
    create: ({ req }) => {
      // Super admin može sve
      if (isSuperAdmin(req.user)) return true;

      // Tenant može da kreira media fajlove
      return Boolean(req.user?.tenants?.[0]?.tenant);
    },
    update: ({ req }) => {
      // Super admin može sve
      if (isSuperAdmin(req.user)) return true;

      // Ostali mogu da ažuriraju samo svoje media fajlove
      if (req.user?.tenants?.[0]?.tenant) {
        const tenant = req.user.tenants[0].tenant as Tenant;
        return {
          tenants: {
            contains: tenant.id,
          },
        };
      }

      return false;
    },
    delete: ({ req }) => {
      // Samo super admin može da briše
      return isSuperAdmin(req.user);
    },
  },
  admin: {
    hidden: ({ user }) => {
      // Sakrij Media tab za obične usere koji nisu tenanti
      if (isSuperAdmin(user)) return false;
      return !Boolean(user?.tenants?.[0]?.tenant);
    },
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Automatski dodeli tenant pri kreiranju
        if (operation === "create" && req.user?.tenants?.[0]?.tenant) {
          const tenant = req.user.tenants[0].tenant as Tenant;
          data.tenants = [tenant.id];
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "tenants",
      type: "relationship",
      relationTo: "tenants",
      hasMany: true,
      admin: {
        condition: () => false, // Skriva polje iz admin interface-a
      },
    },
  ],
  upload: true,
};
