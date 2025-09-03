import { defineField, defineType } from "sanity";

export const studentType = defineType({
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    // CHANGE: Replace clerkId with firebaseUid
    defineField({
      name: "firebaseUid",
      title: "Firebase UID",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Firebase User ID (replaces Clerk ID)",
    }),
    // REMOVE: clerkId field (if it exists)
    // defineField({
    //   name: "clerkId", // DELETE THIS FIELD
    //   title: "Clerk ID",
    //   type: "string",
    // }),
    
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "displayName",
      title: "Display Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "photoURL",
      title: "Profile Photo URL",
      type: "url",
      description: "Firebase user photo URL",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "lastLoginAt",
      title: "Last Login",
      type: "datetime",
    }),
    defineField({
      name: "isEmailVerified",
      title: "Email Verified",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "preferences",
      title: "User Preferences",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Preferred Language",
          type: "string",
          options: {
            list: [
              { title: "English", value: "en" },
              { title: "Hindi", value: "hi" },
            ],
          },
          initialValue: "en",
        },
        {
          name: "notifications",
          title: "Email Notifications",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "theme",
          title: "Theme Preference",
          type: "string",
          options: {
            list: [
              { title: "Light", value: "light" },
              { title: "Dark", value: "dark" },
              { title: "System", value: "system" },
            ],
          },
          initialValue: "system",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "email",
      media: "photoURL",
    },
  },
});
