import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getStudentByFirebaseUid(firebaseUid: string) {
  const getStudentQuery = defineQuery(
    `*[_type == "student" && firebaseUid == $firebaseUid][0]`
  );

  const student = await sanityFetch({
    query: getStudentQuery,
    params: { firebaseUid },
  });

  return student;
}
