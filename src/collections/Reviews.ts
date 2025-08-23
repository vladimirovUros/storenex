import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    create: ({ req }) => {
      return isSuperAdmin(req.user);
    },
    read: ({ req }) => {
      if (isSuperAdmin(req.user)) {
        return true;
      }
      if (req.user) {
        return {
          user: {
            equals: req.user.id,
          },
        };
      }
      return false;
    },
    update: ({ req }) => {
      return isSuperAdmin(req.user);
    },
    delete: ({ req }) => {
      return isSuperAdmin(req.user);
    },
  },
  admin: {
    useAsTitle: "description",
    description: "Manage product reviews.",
  },
  labels: {
    singular: "Review",
    plural: "Reviews",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
  ],
};
