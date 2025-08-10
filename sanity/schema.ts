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
} from "./schemaTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
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
  ],
};
