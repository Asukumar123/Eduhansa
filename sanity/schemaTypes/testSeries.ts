import { defineField, defineType } from "sanity"

export const testSeriesType = defineType({
  name: "testSeries",
  title: "Test Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(100),
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
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Important for accessibility and SEO",
        }),
      ],
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      initialValue: "intermediate",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tests",
      title: "Tests",
      type: "array",
      of: [
        defineField({
          name: "test",
          title: "Test",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Test Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Duration (minutes)",
              type: "number",
              validation: (rule) => rule.required().min(1).max(600),
              description: "Test duration in minutes (max 10 hours)",
            }),
            defineField({
              name: "instructions",
              title: "Test Instructions",
              type: "text",
              description: "Special instructions for this test",
            }),
            defineField({
              name: "sections",
              title: "Sections",
              type: "array",
              of: [
                defineField({
                  name: "section",
                  title: "Section",
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Section Name",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Section Description",
                      type: "text",
                    }),
                    defineField({
                      name: "questions",
                      title: "Questions",
                      type: "array",
                      of: [{ type: "reference", to: [{ type: "question" }] }],
                      validation: (rule) => rule.min(1),
                    }),
                    defineField({
                      name: "timeLimit",
                      title: "Section Time Limit (minutes)",
                      type: "number",
                      description: "Optional: Set specific time limit for this section",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      questionCount: "questions",
                    },
                    prepare(selection) {
                      const { title, questionCount } = selection
                      return {
                        title,
                        subtitle: `${questionCount?.length || 0} questions`,
                      }
                    },
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: "title",
              duration: "duration",
              sections: "sections",
            },
            prepare(selection) {
              const { title, duration, sections } = selection
              const totalQuestions = sections?.reduce(
                (acc: number, section: { questions?: unknown[] }) => acc + (section.questions?.length || 0),
                0,
              )
              return {
                title,
                subtitle: `${duration}min • ${totalQuestions} questions`,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Price in your currency (0 for free)",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this test series from students",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark as featured to highlight on homepage",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.name",
      media: "thumbnail",
      difficulty: "difficulty",
    },
    prepare(selection) {
      const { title, subtitle, media, difficulty } = selection
      return {
        title,
        subtitle: `${subtitle} • ${difficulty?.toUpperCase()}`,
        media,
      }
    },
  },
})
