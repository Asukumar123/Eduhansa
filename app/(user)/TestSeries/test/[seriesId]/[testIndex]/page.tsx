"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, Circle, AlertTriangle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { client } from "@/lib/sanity"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  _id: string
  question: string
  options: string[]
  correctAnswer: string
  subject: string
  marks: number
  negativeMarks: number
}

interface Section {
  name: string
  questions: Question[]
}

interface TestData {
  _id: string
  title: string
  duration: number
  sections: Section[]
  seriesSlug: string
}

// Mock test data as fallback
const mockTestData: TestData = {
  _id: "mock-test-1",
  title: "JEE Main Mock Test 1",
  duration: 180,
  seriesSlug: "jee-main-2024",
  sections: [
    {
      name: "Physics",
      questions: Array.from({ length: 30 }, (_, i) => ({
        _id: `physics-${i + 1}`,
        question: `Physics Question ${i + 1}: What is the acceleration due to gravity on Earth?`,
        options: ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "8.9 m/s²"],
        correctAnswer: "0",
        subject: "physics",
        marks: 4,
        negativeMarks: -1,
      })),
    },
    {
      name: "Chemistry",
      questions: Array.from({ length: 30 }, (_, i) => ({
        _id: `chemistry-${i + 1}`,
        question: `Chemistry Question ${i + 1}: What is the atomic number of Carbon?`,
        options: ["6", "12", "14", "8"],
        correctAnswer: "0",
        subject: "chemistry",
        marks: 4,
        negativeMarks: -1,
      })),
    },
    {
      name: "Mathematics",
      questions: Array.from({ length: 30 }, (_, i) => ({
        _id: `math-${i + 1}`,
        question: `Mathematics Question ${i + 1}: What is the value of sin(90°)?`,
        options: ["0", "1", "-1", "∞"],
        correctAnswer: "1",
        subject: "mathematics",
        marks: 4,
        negativeMarks: -1,
      })),
    },
  ],
}

export default function TestPage({ params }: { params: { seriesId: string; testIndex: string } }) {
  const router = useRouter()
  const [testData, setTestData] = useState<TestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set())
  const [testStarted, setTestStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch test data
  useEffect(() => {
    async function fetchTestData() {
      try {
        setLoading(true)
        const testIndex = Number.parseInt(params.testIndex)

        // Try to fetch from Sanity
        const data = await client.fetch(
          `*[_type == "testSeries" && _id == $seriesId][0] {
            _id,
            title,
            slug,
            tests[$testIndex] {
              title,
              duration,
              sections[] {
                name,
                questions[]->{
                  _id,
                  question,
                  options,
                  correctAnswer,
                  subject,
                  marks,
                  negativeMarks
                }
              }
            }
          }`,
          { seriesId: params.seriesId, testIndex },
        )

        if (data && data.tests) {
          const test = data.tests
          setTestData({
            _id: params.seriesId,
            title: test.title,
            duration: test.duration,
            sections: test.sections || [],
            seriesSlug: data.slug?.current || params.seriesId,
          })
          setTimeLeft(test.duration * 60)
        } else {
          // Use mock data as fallback
          console.log("Using mock test data")
          setTestData(mockTestData)
          setTimeLeft(mockTestData.duration * 60)
        }
      } catch (error) {
        console.error("Failed to fetch test data:", error)
        // Use mock data as fallback
        console.log("Using mock test data due to error")
        setTestData(mockTestData)
        setTimeLeft(mockTestData.duration * 60)
      } finally {
        setLoading(false)
      }
    }

    fetchTestData()
  }, [params.seriesId, params.testIndex])

  // Timer effect
  useEffect(() => {
    if (!testStarted || timeLeft <= 0 || !testData) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, timeLeft, testData])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getCurrentQuestion = () => {
    if (!testData) return null
    return testData.sections[currentSection]?.questions[currentQuestion]
  }

  const handleAnswerSelect = (optionIndex: string) => {
    const currentQ = getCurrentQuestion()
    if (!currentQ) return

    console.log(`Selected answer ${optionIndex} for question ${currentQ._id}`)
    setAnswers((prev) => ({ ...prev, [currentQ._id]: optionIndex }))
  }

  const handleMarkForReview = () => {
    const currentQ = getCurrentQuestion()
    if (!currentQ) return

    setMarkedForReview((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQ._id)) {
        newSet.delete(currentQ._id)
      } else {
        newSet.add(currentQ._id)
      }
      return newSet
    })
  }

  const navigateToQuestion = (sectionIndex: number, questionIndex: number) => {
    setCurrentSection(sectionIndex)
    setCurrentQuestion(questionIndex)
  }

  const handleNext = () => {
    if (!testData) return

    if (currentQuestion < testData.sections[currentSection].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else if (currentSection < testData.sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
      setCurrentQuestion(0)
    }
  }

  const handlePrevious = () => {
    if (!testData) return

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
      setCurrentQuestion(testData.sections[currentSection - 1].questions.length - 1)
    }
  }

  const handleSubmitTest = async () => {
    if (!testData || submitting) return

    setSubmitting(true)
    console.log("Starting test submission...")
    console.log("Current answers:", answers)

    try {
      // Calculate score
      let totalScore = 0
      let maxScore = 0
      const sectionWiseScore: any[] = []

      testData.sections.forEach((section) => {
        let sectionScore = 0
        let sectionMaxScore = 0
        let correct = 0
        let incorrect = 0
        let attempted = 0

        section.questions.forEach((question) => {
          sectionMaxScore += question.marks
          const userAnswer = answers[question._id]

          if (userAnswer !== undefined && userAnswer !== "") {
            attempted++
            console.log(`Question ${question._id}: User answer: ${userAnswer}, Correct: ${question.correctAnswer}`)

            if (userAnswer === question.correctAnswer) {
              correct++
              sectionScore += question.marks
              console.log(`Correct! Added ${question.marks} marks`)
            } else {
              incorrect++
              sectionScore += question.negativeMarks
              console.log(`Incorrect! Added ${question.negativeMarks} marks`)
            }
          }
        })

        const finalSectionScore = Math.max(0, sectionScore)
        sectionWiseScore.push({
          sectionName: section.name,
          score: finalSectionScore,
          maxScore: sectionMaxScore,
          attempted,
          correct,
          incorrect,
          unattempted: section.questions.length - attempted,
        })

        totalScore += finalSectionScore
        maxScore += sectionMaxScore

        console.log(`Section ${section.name}: Score ${finalSectionScore}/${sectionMaxScore}`)
      })

      const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0
      const timeTaken = Math.floor((testData.duration * 60 - timeLeft) / 60)

      console.log("Final calculation:")
      console.log(`Total Score: ${totalScore}/${maxScore} (${percentage.toFixed(1)}%)`)
      console.log(`Time Taken: ${timeTaken} minutes`)
      console.log("Section-wise scores:", sectionWiseScore)

      // Store results in localStorage for the results page
      const resultData = {
        testTitle: testData.title,
        totalScore,
        maxScore,
        percentage,
        timeTaken,
        totalTime: testData.duration,
        rank: Math.floor(Math.random() * 2000) + 1,
        totalAttempts: Math.floor(Math.random() * 20000) + 5000,
        sectionWiseResults: sectionWiseScore.map((section) => ({
          name: section.sectionName,
          score: section.score,
          maxScore: section.maxScore,
          attempted: section.attempted,
          correct: section.correct,
          incorrect: section.incorrect,
          unattempted: section.unattempted,
          accuracy: section.attempted > 0 ? (section.correct / section.attempted) * 100 : 0,
        })),
        testSeries: {
          slug: {
            current: testData.seriesSlug,
          },
        },
        submittedAt: new Date().toISOString(),
      }

      // Store in localStorage
      localStorage.setItem("testResult", JSON.stringify(resultData))
      console.log("Stored result in localStorage:", resultData)

      // Redirect to results page
      console.log("Redirecting to results page...")
      router.push(`/TestSeries/results/mock-result-id`)
    } catch (error) {
      console.error("Failed to submit test:", error)
      alert("There was an error submitting your test. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const getQuestionStatus = (questionId: string) => {
    const isAnswered = answers.hasOwnProperty(questionId) && answers[questionId] !== ""
    const isMarked = markedForReview.has(questionId)

    if (isAnswered && isMarked) return "answered-marked"
    if (isAnswered) return "answered"
    if (isMarked) return "marked"
    return "not-visited"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl font-bold mb-4">Test Not Found</h1>
            <p className="text-gray-600 mb-6">The requested test could not be loaded.</p>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href={`TestSeries/test-series/${testData.seriesSlug}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">{testData.title}</h1>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span>Duration:</span>
                  <span className="font-semibold">{testData.duration} minutes</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span>Total Questions:</span>
                  <span className="font-semibold">
                    {testData.sections.reduce((acc, section) => acc + section.questions.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span>Sections:</span>
                  <span className="font-semibold">{testData.sections.map((s) => s.name).join(", ")}</span>
                </div>
              </div>
              <Button onClick={() => setTestStarted(true)} size="lg" className="w-full">
                Start Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = getCurrentQuestion()
  if (!currentQ) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">{testData.title}</h1>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm",
                timeLeft < 600 ? "bg-red-100 text-red-700 animate-pulse" : "bg-blue-100 text-blue-700",
              )}
            >
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
            <Button onClick={handleSubmitTest} variant="destructive" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Test"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Question Panel */}
        <div className="flex-1 p-6">
          {/* Section Tabs */}
          <div className="flex gap-2 mb-6">
            {testData.sections.map((section, index) => (
              <Button
                key={section.name}
                variant={currentSection === index ? "default" : "outline"}
                onClick={() => navigateToQuestion(index, 0)}
                className="flex-1"
              >
                {section.name}
              </Button>
            ))}
          </div>

          {/* Question */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">
                  Question {currentSection * 30 + currentQuestion + 1} of{" "}
                  {testData.sections.reduce((acc, s) => acc + s.questions.length, 0)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReview}
                  className={cn(markedForReview.has(currentQ._id) && "bg-yellow-100 border-yellow-300")}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {markedForReview.has(currentQ._id) ? "Unmark" : "Mark for Review"}
                </Button>
              </div>

              <h2 className="text-lg font-medium mb-6">{currentQ.question}</h2>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className={cn(
                      "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                      answers[currentQ._id] === index.toString()
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50",
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQ._id}`}
                      value={index}
                      checked={answers[currentQ._id] === index.toString()}
                      onChange={() => handleAnswerSelect(index.toString())}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                        answers[currentQ._id] === index.toString() ? "border-blue-500 bg-blue-500" : "border-gray-300",
                      )}
                    >
                      {answers[currentQ._id] === index.toString() && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-medium mr-3">({String.fromCharCode(65 + index)})</span>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0 && currentQuestion === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                currentSection === testData.sections.length - 1 &&
                currentQuestion === testData.sections[currentSection].questions.length - 1
              }
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Navigation Panel */}
        <div className="w-80 bg-white border-l p-4">
          <h3 className="font-semibold mb-4">Question Navigation</h3>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                <Circle className="w-3 h-3 text-white" />
              </div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              <span>Marked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs font-medium">1</span>
              </div>
              <span>Not Visited</span>
            </div>
          </div>

          {/* Question Grid */}
          {testData.sections.map((section, sectionIndex) => (
            <div key={section.name} className="mb-6">
              <h4 className="font-medium text-sm mb-3 text-gray-700">{section.name}</h4>
              <div className="grid grid-cols-5 gap-2">
                {section.questions.map((question, questionIndex) => {
                  const status = getQuestionStatus(question._id)
                  const isActive = currentSection === sectionIndex && currentQuestion === questionIndex

                  return (
                    <button
                      key={question._id}
                      onClick={() => navigateToQuestion(sectionIndex, questionIndex)}
                      className={cn(
                        "w-8 h-8 rounded text-xs font-medium transition-colors",
                        isActive && "ring-2 ring-blue-500 ring-offset-1",
                        status === "answered" && "bg-green-500 text-white",
                        status === "marked" && "bg-purple-500 text-white",
                        status === "answered-marked" && "bg-orange-500 text-white",
                        status === "not-visited" && "bg-gray-200 text-gray-700 hover:bg-gray-300",
                      )}
                    >
                      {questionIndex + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Progress */}
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              Progress: {Object.keys(answers).length} /{" "}
              {testData.sections.reduce((acc, s) => acc + s.questions.length, 0)}
            </div>
            <Progress
              value={
                (Object.keys(answers).length / testData.sections.reduce((acc, s) => acc + s.questions.length, 0)) * 100
              }
              className="h-2"
            />
          </div>

          {/* Debug Info */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
              <div>Answers: {Object.keys(answers).length}</div>
              <div>Current: {currentQ._id}</div>
              <div>Selected: {answers[currentQ._id] || "None"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
