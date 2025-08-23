import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      if (!req.user) return true;
      if (req.user?.tenants?.[0]?.tenant) {
        const tenant = req.user.tenants[0].tenant as Tenant;
        return {
          tenants: {
            contains: tenant.id,
          },
        };
      }
      return true;
    },
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      return Boolean(req.user?.tenants?.[0]?.tenant);
    },
    update: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
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
      return isSuperAdmin(req.user);
    },
  },
  admin: {
    hidden: ({ user }) => {
      if (isSuperAdmin(user)) return false;
      return !Boolean(user?.tenants?.[0]?.tenant);
    },
    defaultColumns: ["filename", "alt", "isPublic", "tenants", "createdAt"],
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "create" && req.user?.tenants?.[0]?.tenant) {
          const tenant = req.user.tenants[0].tenant as Tenant;
          data.tenants = [tenant.id];
          data.isPublic = true;
        }
        if (
          operation === "create" &&
          isSuperAdmin(req.user) &&
          !data.hasOwnProperty("isPublic")
        ) {
          data.isPublic = true;
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
      label: "Visibility",
      type: "checkbox",
      defaultValue: false,
      access: {
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Allow public access to this media file",
      },
    },
    {
      name: "tenants",
      type: "relationship",
      relationTo: "tenants",
      hasMany: true,
      admin: {
        condition: () => false,
      },
    },
  ],
  upload: true,
};
