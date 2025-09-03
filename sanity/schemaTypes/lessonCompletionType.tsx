import { defineField, defineType } from "sanity";

export const lessonCompletionType = defineType({
  name: "lessonCompletion",
  title: "Lesson Completion",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "module",
      title: "Module",
      type: "reference",
      to: [{ type: "module" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "timeSpent",
      title: "Time Spent (minutes)",
      type: "number",
      description: "Time spent on this lesson in minutes",
    }),
    defineField({
      name: "watchTime",
      title: "Video Watch Time (seconds)",
      type: "number",
      description: "Total video watch time in seconds",
    }),
    defineField({
      name: "completionPercentage",
      title: "Completion Percentage",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      studentName: "student.displayName",
      lessonTitle: "lesson.title",
      completedAt: "completedAt",
    },
    prepare({ studentName, lessonTitle, completedAt }) {
      return {
        title: `${studentName} completed ${lessonTitle}`,
        subtitle: new Date(completedAt).toLocaleDateString(),
      };
    },
  },
});