import { defineField, defineType } from "sanity"

export const userAttemptType = defineType({
  name: "userAttempt",
  title: "User Attempt",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Unique identifier for the user",
    }),
    defineField({
      name: "userEmail",
      title: "User Email",
      type: "string",
      description: "User's email for easier identification",
    }),
    defineField({
      name: "testSeries",
      title: "Test Series",
      type: "reference",
      to: [{ type: "testSeries" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testIndex",
      title: "Test Index",
      type: "number",
      validation: (rule) => rule.required().min(0),
      description: "Index of the test within the test series",
    }),
    defineField({
      name: "testTitle",
      title: "Test Title",
      type: "string",
      description: "Title of the test for easier identification",
    }),
    defineField({
      name: "answers",
      title: "User Answers",
      type: "array",
      of: [
        defineField({
          name: "answer",
          title: "Answer",
          type: "object",
          fields: [
            defineField({
              name: "questionId",
              title: "Question ID",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "selectedAnswer",
              title: "Selected Answer",
              type: "string",
              description: "User's selected answer",
            }),
            defineField({
              name: "isCorrect",
              title: "Is Correct",
              type: "boolean",
            }),
            defineField({
              name: "timeTaken",
              title: "Time Taken (seconds)",
              type: "number",
              description: "Time spent on this question in seconds",
            }),
            defineField({
              name: "markedForReview",
              title: "Marked for Review",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "visitCount",
              title: "Visit Count",
              type: "number",
              initialValue: 1,
              description: "Number of times user visited this question",
            }),
          ],
          preview: {
            select: {
              questionId: "questionId",
              isCorrect: "isCorrect",
              selectedAnswer: "selectedAnswer",
            },
            prepare(selection) {
              const { questionId, isCorrect, selectedAnswer } = selection
              return {
                title: `Question ${questionId}`,
                subtitle: `${isCorrect ? "✓ Correct" : "✗ Incorrect"} • Answer: ${selectedAnswer}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalScore",
      title: "Total Score",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "maxScore",
      title: "Maximum Score",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "percentage",
      title: "Percentage",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "timeTaken",
      title: "Total Time Taken (minutes)",
      type: "number",
      description: "Total time taken to complete the test",
    }),
    defineField({
      name: "sectionWiseScore",
      title: "Section-wise Score",
      type: "array",
      of: [
        defineField({
          name: "sectionScore",
          title: "Section Score",
          type: "object",
          fields: [
            defineField({
              name: "sectionName",
              title: "Section Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "score",
              title: "Score",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "maxScore",
              title: "Max Score",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "attempted",
              title: "Questions Attempted",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "correct",
              title: "Correct Answers",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "incorrect",
              title: "Incorrect Answers",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "unattempted",
              title: "Unattempted Questions",
              type: "number",
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: "timeTaken",
              title: "Time Taken (minutes)",
              type: "number",
              description: "Time spent on this section",
            }),
          ],
          preview: {
            select: {
              title: "sectionName",
              score: "score",
              maxScore: "maxScore",
            },
            prepare(selection) {
              const { title, score, maxScore } = selection
              return {
                title,
                subtitle: `${score}/${maxScore} (${((score / maxScore) * 100).toFixed(1)}%)`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: "startedAt",
      title: "Started At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "In Progress", value: "in_progress" },
          { title: "Completed", value: "completed" },
          { title: "Abandoned", value: "abandoned" },
          { title: "Time Up", value: "time_up" },
        ],
      },
      initialValue: "in_progress",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "deviceInfo",
      title: "Device Info",
      type: "object",
      fields: [
        defineField({
          name: "userAgent",
          title: "User Agent",
          type: "string",
        }),
        defineField({
          name: "screenResolution",
          title: "Screen Resolution",
          type: "string",
        }),
        defineField({
          name: "ipAddress",
          title: "IP Address",
          type: "string",
        }),
      ],
      description: "Device and browser information for security",
    }),
    defineField({
      name: "rank",
      title: "Rank",
      type: "number",
      description: "User's rank among all test takers",
    }),
    defineField({
      name: "percentile",
      title: "Percentile",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
      description: "User's percentile score",
    }),
  ],
  preview: {
    select: {
      testTitle: "testTitle",
      userEmail: "userEmail",
      totalScore: "totalScore",
      maxScore: "maxScore",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare(selection) {
      const { testTitle, userEmail, totalScore, maxScore, submittedAt, status } = selection
      const percentage = totalScore && maxScore ? ((totalScore / maxScore) * 100).toFixed(1) : "0"
      return {
        title: `${testTitle} - ${userEmail}`,
        subtitle: `${totalScore}/${maxScore} (${percentage}%) • ${status} • ${
          submittedAt ? new Date(submittedAt).toLocaleDateString() : "In Progress"
        }`,
      }
    },
  },
})
