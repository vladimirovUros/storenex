import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import { isSuperAdmin } from "@/lib/access";

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
});
export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      if (isSuperAdmin(req.user)) {
        return true;
      }
      return req.user?.id === id;
    },
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: {
    cookies: {
      ...(process.env.NODE_ENV !== "development" && {
        sameSite: "None",
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
      }),
    },
  },
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
    {
      name: "isVerified",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "User email verification status",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: "verificationToken",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Token for email verification",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: "verificationTokenExpiry",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Expiry time for verification token",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField.admin || {}),
        position: "sidebar",
      },
    },
  ],
};
