import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    create: ({ req }) => {
      // Allow only authenticated users to create reviews
      return Boolean(req.user);
    },
    read: ({ req }) => {
      // Super admin can see all reviews
      if (isSuperAdmin(req.user)) {
        return true;
      }

      // Regular users can only see their own reviews
      if (req.user) {
        return {
          user: {
            equals: req.user.id,
          },
        };
      }

      // Not authenticated users cannot see any reviews
      return false;
    },
    update: ({ req }) => {
      // Only super admins can update reviews
      return isSuperAdmin(req.user);
    },
    delete: ({ req }) => {
      // Only super admins can delete reviews
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
