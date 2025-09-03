import { type SchemaTypeDefinition } from "sanity";
import {
  categoryType,
  questionType,
  testSeriesType,
  userAttemptType,
  courseType,
  moduleType,
  lessonType,
  instructorType,
  studentType,
  enrollmentType,
  lessonCompletionType,
  blogType,
  paymentTransactionType, // NEW
  userSessionType,        // NEW (optional)
  migrationLogType,       // NEW (for tracking migrations)
} from "./schemaTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Existing types
    categoryType,
    questionType,
    testSeriesType,
    userAttemptType,
    courseType,
    moduleType,
    lessonType,
    instructorType,
    blogType,

    // Updated types
    studentType,
    enrollmentType,
    lessonCompletionType,

    // New types for Firebase/Razorpay & migration
    paymentTransactionType,
    userSessionType, // optional
    migrationLogType,
  ],
};
