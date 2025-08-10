"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Target, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ResultData {
  testTitle: string
  totalScore: number
  maxScore: number
  percentage: number
  timeTaken: number
  totalTime: number
  rank: number
  totalAttempts: number
  sectionWiseResults: {
    name: string
    score: number
    maxScore: number
    attempted: number
    correct: number
    incorrect: number
    unattempted: number
    accuracy: number
  }[]
  testSeries: {
    slug: {
      current: string
    }
  }
  submittedAt: string
}

// Mock data as fallback
const mockResultData: ResultData = {
  testTitle: "JEE Main Mock Test 1",
  totalScore: 245,
  maxScore: 300,
  percentage: 81.67,
  timeTaken: 165,
  totalTime: 180,
  rank: 1247,
  totalAttempts: 15420,
  sectionWiseResults: [
    {
      name: "Physics",
      score: 88,
      maxScore: 100,
      attempted: 28,
      correct: 22,
      incorrect: 6,
      unattempted: 2,
      accuracy: 78.57,
    },
    {
      name: "Chemistry",
      score: 84,
      maxScore: 100,
      attempted: 26,
      correct: 21,
      incorrect: 5,
      unattempted: 4,
      accuracy: 80.77,
    },
    {
      name: "Mathematics",
      score: 73,
      maxScore: 100,
      attempted: 25,
      correct: 19,
      incorrect: 6,
      unattempted: 5,
      accuracy: 76.0,
    },
  ],
  testSeries: {
    slug: {
      current: "jee-main-2024",
    },
  },
  submittedAt: new Date().toISOString(),
}

export default function ResultsPage({ params }: { params: { attemptId: string } }) {
  const router = useRouter()
  const [resultData, setResultData] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Results page loaded with attemptId:", params.attemptId)

    try {
      // Try to get results from localStorage first
      const storedResult = localStorage.getItem("testResult")
      console.log("Stored result from localStorage:", storedResult)

      if (storedResult) {
        const parsedResult = JSON.parse(storedResult)
        console.log("Parsed result:", parsedResult)
        setResultData(parsedResult)
      } else {
        console.log("No stored result found, using mock data")
        setResultData(mockResultData)
      }
    } catch (error) {
      console.error("Error loading results:", error)
      setResultData(mockResultData)
    } finally {
      setLoading(false)
    }
  }, [params.attemptId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl font-bold mb-4">Results Not Found</h1>
            <p className="text-gray-600 mb-6">Unable to load test results.</p>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/test-series/${resultData.testSeries.slug.current}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test Series
            </Button>
          </Link>
        </div>

        {/* Overall Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{resultData.testTitle} - Results</CardTitle>
            <p className="text-sm text-gray-600">Submitted on {new Date(resultData.submittedAt).toLocaleString()}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {resultData.totalScore}/{resultData.maxScore}
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{resultData.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Percentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{resultData.timeTaken}m</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">#{resultData.rank}</div>
                <div className="text-sm text-gray-600">Your Rank</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Performance</span>
                <span className="text-sm text-gray-600">{resultData.percentage.toFixed(1)}%</span>
              </div>
              <Progress value={resultData.percentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Section-wise Results */}
        {resultData.sectionWiseResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {resultData.sectionWiseResults.map((section) => (
              <Card key={section.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {section.score}/{section.maxScore}
                      </span>
                      <Badge variant="secondary">{((section.score / section.maxScore) * 100).toFixed(1)}%</Badge>
                    </div>

                    <Progress value={(section.score / section.maxScore) * 100} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Correct: {section.correct}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span>Incorrect: {section.incorrect}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>Attempted: {section.attempted}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span>Accuracy: {section.accuracy.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Performance Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Strengths</h4>
                <ul className="space-y-2 text-sm">
                  {resultData.sectionWiseResults.length > 0 &&
                    resultData.sectionWiseResults
                      .sort((a, b) => b.accuracy - a.accuracy)
                      .slice(0, 1)
                      .map((section) => (
                        <li key={section.name} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>
                            Strong performance in {section.name} ({section.accuracy.toFixed(1)}% accuracy)
                          </span>
                        </li>
                      ))}
                  {resultData.timeTaken < resultData.totalTime && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Good time management ({resultData.totalTime - resultData.timeTaken} minutes saved)</span>
                    </li>
                  )}
                  {resultData.percentage > 75 && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Above average overall performance</span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Areas for Improvement</h4>
                <ul className="space-y-2 text-sm">
                  {resultData.sectionWiseResults.length > 0 &&
                    resultData.sectionWiseResults
                      .sort((a, b) => a.accuracy - b.accuracy)
                      .slice(0, 1)
                      .map((section) => (
                        <li key={section.name} className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>
                            {section.name} needs more practice ({section.accuracy.toFixed(1)}% accuracy)
                          </span>
                        </li>
                      ))}
                  {resultData.sectionWiseResults.reduce((acc, section) => acc + section.unattempted, 0) > 0 && (
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>
                        Reduce unattempted questions (
                        {resultData.sectionWiseResults.reduce((acc, section) => acc + section.unattempted, 0)} total)
                      </span>
                    </li>
                  )}
                  {resultData.sectionWiseResults.some((section) => section.incorrect > section.correct / 2) && (
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>Focus on accuracy over speed</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button size="lg">View Detailed Solutions</Button>
          <Button variant="outline" size="lg" onClick={() => router.back()}>
            Retake Test
          </Button>
          <Button variant="outline" size="lg">
            Download Report
          </Button>
        </div>

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === "development" && (
          <Card className="mt-8 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm">Debug Info</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs overflow-auto max-h-40">
                <code>{JSON.stringify(resultData, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
