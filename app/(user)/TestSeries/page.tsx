import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen } from "lucide-react"
import { client, queries, urlFor } from "@/sanity/lib/sanity"

// Define types for our data
interface TestSeries {
  _id: string
  title: string
  description: string
  slug: { current: string }
  category: {
    name: string
    color: string
  }
  thumbnail: unknown
  difficulty: string
  tests: unknown[]
}

interface Category {
  _id: string
  name: string
  slug?: { current: string }
  color?: string
}

// Fallback data when Sanity is not available
const fallbackTestSeries = [
  {
    _id: "1",
    title: "JEE Main 2024 Test Series",
    description: "Complete test series for JEE Main preparation with 20 full-length tests",
    slug: { current: "jee-main-2024" },
    category: { name: "JEE Main", color: "blue" },
    thumbnail: null,
    difficulty: "advanced",
    tests: Array(20).fill({}),
  },
  {
    _id: "2",
    title: "NEET 2024 Test Series",
    description: "Comprehensive NEET preparation with Biology, Chemistry, and Physics tests",
    slug: { current: "neet-2024" },
    category: { name: "NEET", color: "green" },
    thumbnail: null,
    difficulty: "advanced",
    tests: Array(15).fill({}),
  },
  {
    _id: "3",
    title: "JEE Advanced Mock Tests",
    description: "High-difficulty tests for JEE Advanced preparation",
    slug: { current: "jee-advanced" },
    category: { name: "JEE Advanced", color: "red" },
    thumbnail: null,
    difficulty: "expert",
    tests: Array(10).fill({}),
  },
  {
    _id: "4",
    title: "SSC CGL Test Series",
    description: "Complete preparation for SSC Combined Graduate Level examination",
    slug: { current: "ssc-cgl" },
    category: { name: "SSC", color: "purple" },
    thumbnail: null,
    difficulty: "intermediate",
    tests: Array(25).fill({}),
  },
]

const fallbackCategories = [
  { _id: "1", name: "JEE Main" },
  { _id: "2", name: "NEET" },
  { _id: "3", name: "JEE Advanced" },
  { _id: "4", name: "SSC" },
]

// Fetch data from Sanity with error handling
async function getTestSeries(): Promise<TestSeries[]> {
  try {
    const data = await client.fetch<TestSeries[]>(queries.getAllTestSeries)
    return Array.isArray(data) && data.length > 0 ? data : fallbackTestSeries
  } catch (error) {
    console.warn("Failed to fetch test series from Sanity, using fallback data:", error)
    return fallbackTestSeries
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.fetch<Category[]>(queries.getAllCategories)
    return Array.isArray(data) && data.length > 0 ? data : fallbackCategories
  } catch (error) {
    console.warn("Failed to fetch categories from Sanity, using fallback data:", error)
    return fallbackCategories
  }
}

export default async function Dashboard() {
  // Fetch data with error handling
  const testSeries = await getTestSeries()
  const categories = await getCategories()

  // Ensure we have arrays to work with
  const safeTestSeries = Array.isArray(testSeries) ? testSeries : fallbackTestSeries
  const safeCategories = Array.isArray(categories) ? categories : fallbackCategories

  // Add "All" category
  const allCategories = [{ _id: "all", name: "All" }, ...safeCategories]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Series Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prepare for competitive exams with our comprehensive test series designed to simulate real exam conditions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allCategories.map((category) => (
            <Badge
              key={category._id}
              variant={category.name === "All" ? "default" : "secondary"}
              className="px-4 py-2 cursor-pointer hover:bg-primary/80"
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Test Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {safeTestSeries.map((series) => (
            <Link key={series._id} href={`/TestSeries/test-series/${series.slug.current}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={series.thumbnail ? urlFor(series.thumbnail).url() : "/placeholder.svg?height=200&width=300"}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{series.category?.name || "General"}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{series.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{series.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{Array.isArray(series.tests) ? series.tests.length : 0} Tests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {/* This would come from analytics in a real app */}
                        {Math.floor(Math.random() * 10000) + 5000}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        series.difficulty === "expert"
                          ? "destructive"
                          : series.difficulty === "advanced"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {series.difficulty
                        ? series.difficulty.charAt(0).toUpperCase() + series.difficulty.slice(1)
                        : "Medium"}
                    </Badge>
                    <span className="text-sm font-medium text-primary">Start Now →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
            <div className="text-gray-600">Practice Tests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

       
      </div>
    </div>
  )
}
