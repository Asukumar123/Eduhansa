// Update the import path if necessary, or ensure the file exists and exports 'client'
import { client } from "../../sanity/lib/adminClient";

// IMPORTANT: Run this script to migrate existing data
export async function migrateClerkToFirebase() {
  console.log("Starting Clerk to Firebase migration...");
  
  try {
    // 1. Get all students with Clerk IDs
    const studentsWithClerkIds = await client.fetch(`
      *[_type == "student" && defined(clerkId)] {
        _id,
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl
      }
    `);

    console.log(`Found ${studentsWithClerkIds.length} students to migrate`);

    // 2. For each student, you'll need to:
    // - Get their Firebase UID (they need to sign in with Firebase first)
    // - Update their record with firebaseUid
    // - Remove clerkId field
    
    for (const student of studentsWithClerkIds) {
      // Create migration log
      await client.create({
        _type: "migrationLog",
        migrationType: "auth_migration",
        oldId: student.clerkId,
        newId: "pending_firebase_signin", // Will be updated when user signs in
        entityType: "user",
        status: "partial",
        migrationData: {
          originalData: JSON.stringify(student),
        },
      });
    }

    console.log("Migration preparation completed");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

