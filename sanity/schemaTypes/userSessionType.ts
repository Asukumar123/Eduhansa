import { defineField, defineType } from "sanity";

export const userSessionType = defineType({
  name: "userSession",
  title: "User Session",
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
      name: "sessionId",
      title: "Session ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "device",
      title: "Device Info",
      type: "object",
      fields: [
        {
          name: "userAgent",
          title: "User Agent",
          type: "string",
        },
        {
          name: "platform",
          title: "Platform",
          type: "string",
        },
        {
          name: "ipAddress",
          title: "IP Address",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "startedAt",
      title: "Session Started",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "lastActivityAt",
      title: "Last Activity",
      type: "datetime",
    }),
    defineField({
      name: "endedAt",
      title: "Session Ended",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
