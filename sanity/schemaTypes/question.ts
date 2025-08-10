import { defineField, defineType } from "sanity"

export const questionType = defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "questionType",
      title: "Question Type",
      type: "string",
      options: {
        list: [
          { title: "Multiple Choice (Single)", value: "mcq_single" },
          { title: "Multiple Choice (Multiple)", value: "mcq_multiple" },
          { title: "Numerical", value: "numerical" },
          { title: "True/False", value: "boolean" },
        ],
      },
      initialValue: "mcq_single",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.questionType === "numerical",
      validation: (rule) =>
        rule.custom((options, context) => {
          const questionType = context.document?.questionType
          if (questionType === "numerical") return true
          if (!options || options.length < 2) {
            return "Please provide at least 2 options for multiple choice questions"
          }
          return true
        }),
    }),
    defineField({
      name: "correctAnswer",
      title: "Correct Answer",
      type: "string",
      description: "For MCQ: option index (0,1,2,3). For numerical: exact value",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "explanation",
      title: "Explanation",
      type: "text",
      description: "Detailed explanation of the correct answer",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: {
        list: [
          { title: "Physics", value: "physics" },
          { title: "Chemistry", value: "chemistry" },
          { title: "Mathematics", value: "mathematics" },
          { title: "Biology", value: "biology" },
          { title: "General Knowledge", value: "gk" },
          { title: "English", value: "english" },
          { title: "Reasoning", value: "reasoning" },
          { title: "Current Affairs", value: "current_affairs" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Medium", value: "medium" },
          { title: "Hard", value: "hard" },
        ],
      },
      initialValue: "medium",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "marks",
      title: "Marks",
      type: "number",
      initialValue: 4,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "negativeMarks",
      title: "Negative Marks",
      type: "number",
      initialValue: -1,
      description: "Marks deducted for wrong answer (use negative value)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Add tags for better organization and filtering",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this question from tests",
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "subject",
      difficulty: "difficulty",
    },
    prepare(selection) {
      const { title, subtitle, difficulty } = selection
      return {
        title: title?.substring(0, 60) + (title?.length > 60 ? "..." : ""),
        subtitle: `${subtitle?.toUpperCase()} • ${difficulty?.toUpperCase()}`,
      }
    },
  },
})
