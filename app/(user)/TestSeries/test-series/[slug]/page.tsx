import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, ArrowLeft, Play } from "lucide-react"

import { client, queries } from "@/sanity/lib/sanity"
import { notFound } from "next/navigation"

interface TestSeriesData {
  _id: string
  title: string
  description: string
  category: {
    name: string
    color: string
  }
  tests: {
    title: string
    duration: number
    sections: {
      name: string
      questions: unknown[]
    }[]
  }[]
}

// Fallback data for when Sanity is not available
const fallbackTestSeries: Record<string, TestSeriesData> = {
  "jee-main-2024": {
    _id: "1",
    title: "JEE Main 2024 Test Series",
    description: "Complete test series for JEE Main preparation with full-length tests",
    category: { name: "JEE Main", color: "blue" },
    tests: [
      {
        title: "JEE Main Mock Test 1",
        duration: 180,
        sections: [
          { name: "Physics", questions: Array(30).fill({}) },
          { name: "Chemistry", questions: Array(30).fill({}) },
          { name: "Mathematics", questions: Array(30).fill({}) },
        ],
      },
      {
        title: "JEE Main Mock Test 2",
        duration: 180,
        sections: [
          { name: "Physics", questions: Array(30).fill({}) },
          { name: "Chemistry", questions: Array(30).fill({}) },
          { name: "Mathematics", questions: Array(30).fill({}) },
        ],
      },
      {
        title: "JEE Main Mock Test 3",
        duration: 180,
        sections: [
          { name: "Physics", questions: Array(30).fill({}) },
          { name: "Chemistry", questions: Array(30).fill({}) },
          { name: "Mathematics", questions: Array(30).fill({}) },
        ],
      },
    ],
  },
  "neet-2024": {
    _id: "2",
    title: "NEET 2024 Test Series",
    description: "Comprehensive NEET preparation with Biology, Chemistry, and Physics tests",
    category: { name: "NEET", color: "green" },
    tests: [
      {
        title: "NEET Mock Test 1",
        duration: 180,
        sections: [
          { name: "Physics", questions: Array(45).fill({}) },
          { name: "Chemistry", questions: Array(45).fill({}) },
          { name: "Biology", questions: Array(90).fill({}) },
        ],
      },
    ],
  },
}

async function getTestSeries(slug: string): Promise<TestSeriesData | null> {
  try {
    const data = await client.fetch<TestSeriesData>(queries.getTestSeriesBySlug, { slug })
    return data || fallbackTestSeries[slug] || null
  } catch (error) {
    console.warn("Failed to fetch test series from Sanity, using fallback data:", error)
    return fallbackTestSeries[slug] || null
  }
}

export default async function TestSeriesPage({ params }: { params: { slug: string } }) {
  const series = await getTestSeries(params.slug)

  if (!series) {
    notFound()
  }

  // Ensure tests is an array
  const safeTests = Array.isArray(series.tests) ? series.tests : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Series Info */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{series.title}</h1>
              <p className="text-gray-600 mb-4">{series.description}</p>
              <Badge>{series.category?.name || "General"}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{safeTests.length}</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">{safeTests.length}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
        </div>

        {/* Tests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {safeTests.map((test, index) => {
            const totalQuestions = Array.isArray(test.sections)
              ? test.sections.reduce(
                  (acc, section) => acc + (Array.isArray(section.questions) ? section.questions.length : 0),
                  0,
                )
              : 0

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{test.title}</CardTitle>
                      <CardDescription>
                        Test {index + 1} •{" "}
                        {Array.isArray(test.sections) ? test.sections.map((s) => s.name).join(", ") : ""}
                      </CardDescription>
                    </div>
                    <Badge variant="default">Medium</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{test.duration || 180} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{totalQuestions} questions</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/TestSeries/test/${series._id}/${index}`} className="flex-1">
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Test
                      </Button>
                    </Link>
                    <Button variant="outline">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Development Notice */}
        {series === fallbackTestSeries[params.slug] && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Currently showing demo data. Configure your Sanity environment variables and add
              content to see real data.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
