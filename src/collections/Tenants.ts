import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
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
        //admin is used for someone who is in (who is looking) the admin panel (dashboard)
        description: "The name of the store, (e.g., 'My Awesome Store')",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
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
      admin: {
        readOnly: true,
        description: "The Stripe account ID for the store, used for payments.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you have submitted your Stripe details.",
      },
    },
  ],
};
