import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "reference", to: { type: "module" } }],
    }),

    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      to: { type: "instructor" },
    }),

    // ✅ Pricing Information
    defineField({
      name: "pricing",
      title: "Pricing Information",
      type: "object",
      fields: [
        defineField({
          name: "originalPrice",
          title: "Original Price (INR)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: "discountedPrice",
          title: "Discounted Price (INR)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: "discountPercentage",
          title: "Discount Percentage",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "isFree",
          title: "Is Free Course",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "INR",
          options: {
            list: [
              { title: "Indian Rupee", value: "INR" },
              { title: "US Dollar", value: "USD" },
            ],
          },
        }),
      ],
    }),

    // ✅ Enrollment Statistics
    defineField({
      name: "enrollmentStats",
      title: "Enrollment Statistics",
      type: "object",
      readOnly: true,
      fields: [
        defineField({
          name: "totalEnrollments",
          title: "Total Enrollments",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "activeStudents",
          title: "Active Students",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "completionRate",
          title: "Average Completion Rate (%)",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
  ],
});
