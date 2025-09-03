import { defineField, defineType } from "sanity";

export const migrationLogType = defineType({
  name: "migrationLog",
  title: "Migration Log",
  type: "document",
  fields: [
    defineField({
      name: "migrationType",
      title: "Migration Type",
      type: "string",
      options: {
        list: [
          { title: "Clerk to Firebase", value: "auth_migration" },
          { title: "Stripe to Razorpay", value: "payment_migration" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oldId",
      title: "Old ID (Clerk/Stripe)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newId",
      title: "New ID (Firebase/Razorpay)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "entityType",
      title: "Entity Type",
      type: "string",
      options: {
        list: [
          { title: "User", value: "user" },
          { title: "Payment", value: "payment" },
          { title: "Enrollment", value: "enrollment" },
        ],
      },
    }),
    defineField({
      name: "migratedAt",
      title: "Migrated At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "migrationData",
      title: "Migration Data",
      type: "object",
      description: "Additional data from migration process",
      fields: [
        {
          name: "originalData",
          title: "Original Data",
          type: "text",
        },
        {
          name: "transformedData",
          title: "Transformed Data",
          type: "text",
        },
        {
          name: "errors",
          title: "Migration Errors",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Migration Status",
      type: "string",
      options: {
        list: [
          { title: "Success", value: "success" },
          { title: "Failed", value: "failed" },
          { title: "Partial", value: "partial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
