import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "The name of the store, (e.g., 'My Awesome Store')",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      label: "Store Slug",
      admin: {
        description:
          "The slug of the store, this is used in the URL (e.g., '[slug].storenex.com')",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Store Image",
      admin: {
        description: "The image of the store",
      },
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "The Stripe account ID associated with your shop for payments.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "You cannot create products until you have submitted your Stripe details.",
      },
    },
  ],
};
