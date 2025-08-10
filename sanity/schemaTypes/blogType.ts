import { defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blogType",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short summary of the blog post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Name of the icon (e.g. 'Clock' or 'Book') or a reference to a component",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the author",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "Estimated read time, e.g. '5 min read'",
      validation: (Rule) => Rule.required(),
    }),
   defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    { type: "block" }, // Keep this for rich text
    { 
      type: "image",   // 🔧 Add this line for image support
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for screen readers and SEO'
        }
      ]
    }
  ],
  validation: (Rule) => Rule.required(),
}),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark this post as a featured article.",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogType" }] }],
      description: "Select blog posts related to this one.",
    }),
  ],
});
