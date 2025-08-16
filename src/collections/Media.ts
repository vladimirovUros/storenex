import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: ({ req }) => {
      // Super admin može da vidi sve
      if (isSuperAdmin(req.user)) return true;

      // Ako korisnik nije ulogovan, može da vidi sve slike (javno dostupne)
      if (!req.user) return true;

      // Ulogovani korisnici mogu da vide samo svoje media fajlove
      if (req.user?.tenants?.[0]?.tenant) {
        const tenant = req.user.tenants[0].tenant as Tenant;
        return {
          tenants: {
            contains: tenant.id,
          },
        };
      }

      // Ako je korisnik ulogovan ali nema tenant, može da vidi sve slike
      return true;
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
    // Uključujemo isPublic kolonu - access će kontrolisati pristup
    defaultColumns: ["filename", "alt", "isPublic", "tenants", "createdAt"],
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Automatski dodeli tenant pri kreiranju
        if (operation === "create" && req.user?.tenants?.[0]?.tenant) {
          const tenant = req.user.tenants[0].tenant as Tenant;
          data.tenants = [tenant.id];

          // ✅ Dodaj isPublic flag za javno dostupne slike
          // (avatar, product images, itd.)
          data.isPublic = true;
        }

        // Super admin može da kreira bez tenant-a i bira da li je javno
        if (
          operation === "create" &&
          isSuperAdmin(req.user) &&
          !data.hasOwnProperty("isPublic")
        ) {
          data.isPublic = true; // default za super admin
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
      name: "isPublic",
      label: "Visibility", // Leši naziv kolone umesto "Is Public"
      type: "checkbox",
      defaultValue: false,
      access: {
        // Samo super admin može da čita i menja
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Allow public access to this media file",
        // Bez condition - access je dovoljno za kontrolu
      },
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
