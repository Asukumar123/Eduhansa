import groq from "groq";
import { sanityFetch } from "../live";

export async function isEnrolledInCourse(firebaseUid: string, courseId: string) {
  try {
    // Get student by Firebase UID
    const studentQuery = groq`*[_type == "student" && firebaseUid == $firebaseUid][0]._id`;
    const studentResult = await sanityFetch({
      query: studentQuery,
      params: { firebaseUid },
    });

    if (!studentResult.data) {
      console.log("No student found with firebaseUid:", firebaseUid);
      return false;
    }

    // Check for enrollment
    const enrollmentQuery = groq`*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId && paymentStatus == "completed"][0]`;
    const enrollment = await sanityFetch({
      query: enrollmentQuery,
      params: { studentId: studentResult.data, courseId },
    });

    return !!enrollment.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return false;
  }
}
