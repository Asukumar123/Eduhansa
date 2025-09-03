import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Course Enrollment",
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
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),
    // CHANGE: Update payment fields for Razorpay
    defineField({
      name: "paymentProvider",
      title: "Payment Provider",
      type: "string",
      options: {
        list: [
          { title: "Razorpay", value: "razorpay" },
          { title: "Free", value: "free" },
        ],
      },
      initialValue: "razorpay",
    }),
    defineField({
      name: "razorpayOrderId",
      title: "Razorpay Order ID",
      type: "string",
      description: "Razorpay order ID (replaces Stripe session ID)",
    }),
    defineField({
      name: "razorpayPaymentId",
      title: "Razorpay Payment ID",
      type: "string",
      description: "Razorpay payment ID for successful payments",
    }),
    defineField({
      name: "paymentId",
      title: "Payment ID",
      type: "string",
      description: "Generic payment ID (for backward compatibility)",
    }),
    // REMOVE: Stripe-specific fields
    // defineField({
    //   name: "stripeSessionId", // DELETE THIS FIELD
    //   title: "Stripe Session ID",
    //   type: "string",
    // }),
    
    defineField({
      name: "amount",
      title: "Amount Paid",
      type: "number",
      validation: (Rule) => Rule.min(0),
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
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
          { title: "Failed", value: "failed" },
          { title: "Refunded", value: "refunded" },
          { title: "Free", value: "free" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "expiresAt",
      title: "Access Expires At",
      type: "datetime",
      description: "Leave empty for lifetime access",
    }),
    defineField({
      name: "metadata",
      title: "Additional Metadata",
      type: "object",
      fields: [
        {
          name: "enrollmentSource",
          title: "Enrollment Source",
          type: "string",
          options: {
            list: [
              { title: "Website", value: "website" },
              { title: "Mobile App", value: "mobile" },
              { title: "Promotion", value: "promotion" },
            ],
          },
        },
        {
          name: "discountApplied",
          title: "Discount Applied",
          type: "number",
        },
        {
          name: "couponCode",
          title: "Coupon Code Used",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      studentName: "student.displayName",
      courseTitle: "course.title",
      amount: "amount",
      status: "paymentStatus",
    },
    prepare({ studentName, courseTitle, amount, status }) {
      return {
        title: `${studentName} → ${courseTitle}`,
        subtitle: `₹${amount} (${status})`,
      };
    },
  },
});
