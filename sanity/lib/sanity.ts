// Sanity client configuration
import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

// Check if environment variables are set
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const client = createClient({
  projectId: projectId || "dummy-project-id", // Provide fallback to prevent errors
  dataset: dataset,
  useCdn: true,
  apiVersion: "2023-05-03",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  if (!source || !projectId) {
    return {
      url: () => "/placeholder.svg?height=200&width=300",
    }
  }
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // Get all test series with category info
  getAllTestSeries: `*[_type == "testSeries" && isActive == true] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    difficulty,
    thumbnail,
    category->{
      name,
      color
    },
    tests[] {
      title,
      duration
    }
  }`,

  // Get test series by slug
  getTestSeriesBySlug: `*[_type == "testSeries" && slug.current == $slug][0] {
    _id,
    title,
    description,
    difficulty,
    thumbnail,
    category->{
      name,
      color
    },
    tests[] {
      title,
      duration,
      sections[] {
        name,
        questions[]->{
          _id,
          question,
          questionType,
          options,
          correctAnswer,
          explanation,
          subject,
          difficulty,
          marks,
          negativeMarks
        }
      }
    }
  }`,

  // Get all categories
  getAllCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    color,
    icon
  }`,

  // Get user attempts for a specific test
  getUserAttempts: `*[_type == "userAttempt" && userId == $userId && testSeries._ref == $testSeriesId] | order(submittedAt desc) {
    _id,
    testId,
    totalScore,
    maxScore,
    percentage,
    timeTaken,
    sectionWiseScore,
    submittedAt,
    status
  }`,

  // Get user attempt by ID
  getUserAttemptById: `*[_type == "userAttempt" && _id == $attemptId][0] {
    _id,
    testSeries->{
      _id,
      title,
      slug
    },
    testId,
    totalScore,
    maxScore,
    percentage,
    timeTaken,
    sectionWiseScore,
    submittedAt,
    status
  }`,

  // Create a new user attempt
  createUserAttempt: `
    *[_type == "userAttempt" && userId == $userId && testId == $testId][0] {
      _id
    }
  `,

  // Get test by ID
  getTestById: `*[_type == "testSeries" && _id == $seriesId][0] {
    _id,
    title,
    tests[$testIndex] {
      title,
      duration,
      sections[] {
        name,
        questions[]->{
          _id,
          question,
          questionType,
          options,
          correctAnswer,
          explanation,
          subject,
          difficulty,
          marks,
          negativeMarks
        }
      }
    }
  }`,
}

// Helper function to create a new user attempt document
export async function createUserAttempt(userId: string, testSeriesId: string, testId: string) {
  if (!projectId) {
    console.warn("Sanity not configured - cannot create user attempt")
    return null
  }

  try {
    return await client.create({
      _type: "userAttempt",
      userId,
      testSeries: {
        _type: "reference",
        _ref: testSeriesId,
      },
      testId,
      answers: [],
      status: "in_progress",
      startedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to create user attempt:", error)
    return null
  }
}

// Helper function to update a user attempt with results
export async function updateUserAttemptWithResults(
  attemptId: string,
  answers: unknown[],
  totalScore: number,
  maxScore: number,
  sectionWiseScore: unknown[],
) {
  if (!projectId) {
    console.warn("Sanity not configured - cannot update user attempt")
    return null
  }

  try {
    return await client
      .patch(attemptId)
      .set({
        answers,
        totalScore,
        maxScore,
        percentage: (totalScore / maxScore) * 100,
        sectionWiseScore,
        submittedAt: new Date().toISOString(),
        status: "completed",
      })
      .commit()
  } catch (error) {
    console.error("Failed to update user attempt:", error)
    return null
  }
}
