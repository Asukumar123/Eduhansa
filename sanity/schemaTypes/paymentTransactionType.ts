import { defineField, defineType } from "sanity";

export const paymentTransactionType = defineType({
  name: "paymentTransaction",
  title: "Payment Transaction",
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
    defineField({
      name: "provider",
      title: "Payment Provider",
      type: "string",
      options: {
        list: [
          { title: "Razorpay", value: "razorpay" },
          { title: "Free", value: "free" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "razorpayOrderId",
      title: "Razorpay Order ID",
      type: "string",
    }),
    defineField({
      name: "razorpayPaymentId",
      title: "Razorpay Payment ID",
      type: "string",
    }),
    defineField({
      name: "razorpaySignature",
      title: "Razorpay Signature",
      type: "string",
    }),
    defineField({
      name: "amount",
      title: "Amount (in INR)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "INR",
    }),
    defineField({
      name: "status",
      title: "Transaction Status",
      type: "string",
      options: {
        list: [
          { title: "Created", value: "created" },
          { title: "Authorized", value: "authorized" },
          { title: "Captured", value: "captured" },
          { title: "Failed", value: "failed" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Refunded", value: "refunded" },
        ],
      },
      initialValue: "created",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "UPI", value: "upi" },
          { title: "Credit Card", value: "card" },
          { title: "Debit Card", value: "card" },
          { title: "Net Banking", value: "netbanking" },
          { title: "Wallet", value: "wallet" },
          { title: "Free", value: "free" },
        ],
      },
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
    defineField({
      name: "failureReason",
      title: "Failure Reason",
      type: "string",
      description: "Reason for payment failure (if applicable)",
    }),
    defineField({
      name: "refundAmount",
      title: "Refund Amount",
      type: "number",
      description: "Amount refunded (if applicable)",
    }),
    defineField({
      name: "refundedAt",
      title: "Refunded At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      studentName: "student.displayName",
      courseTitle: "course.title",
      amount: "amount",
      status: "status",
      createdAt: "createdAt",
    },
    prepare({ studentName, courseTitle, amount, status, createdAt }) {
      return {
        title: `₹${amount} - ${studentName}`,
        subtitle: `${courseTitle} (${status}) - ${new Date(createdAt).toLocaleDateString()}`,
      };
    },
  },
});
