export type Question = {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  subject: "english" | "reasoning" | "quants"
}

export const englishQuestions: Question[] = [
  {
    id: "eng-1",
    text: 'Choose the word that is most nearly opposite in meaning to the word "BENEVOLENT".',
    options: ["Charitable", "Malevolent", "Generous", "Kind"],
    correctAnswer: 1,
    explanation:
      "Malevolent means wishing evil or harm to others, which is the opposite of benevolent (kind, generous).",
    subject: "english",
  },
  {
    id: "eng-2",
    text: 'Choose the correct meaning of the idiom: "To bite the dust"',
    options: ["To taste failure", "To die", "To be humiliated", "To be defeated"],
    correctAnswer: 3,
    explanation: '"To bite the dust" means to be defeated or to fail at something.',
    subject: "english",
  },
  {
    id: "eng-3",
    text: "Choose the correct alternative to fill in the blank: The company's profits have _____ by 30% since last year.",
    options: ["rose", "raised", "risen", "aroused"],
    correctAnswer: 2,
    explanation: '"Risen" is the correct past participle form of "rise" to be used with "have".',
    subject: "english",
  },
  {
    id: "eng-4",
    text: 'Identify the error in the sentence: "Neither of the students have completed their assignments."',
    options: ["Neither", "have", "their", "No error"],
    correctAnswer: 1,
    explanation: '"Have" should be replaced with "has" because "neither" is singular.',
    subject: "english",
  },
  {
    id: "eng-5",
    text: "Choose the correctly spelt word:",
    options: ["Accomodation", "Accommodation", "Acommodation", "Acomodation"],
    correctAnswer: 1,
    explanation: 'Accommodation is the correct spelling with double "c" and double "m".',
    subject: "english",
  },
  // Add 35 more English questions here
  {
    id: "eng-6",
    text: "Choose the word that best completes the sentence: The detective's _____ questioning finally led to a confession.",
    options: ["persistent", "resistance", "insistent", "consistent"],
    correctAnswer: 0,
    explanation: '"Persistent" means continuing firmly despite obstacles, which fits the context best.',
    subject: "english",
  },
  {
    id: "eng-7",
    text: "Identify the part of speech of the underlined word: She spoke VERY clearly during the presentation.",
    options: ["Adjective", "Adverb", "Verb", "Preposition"],
    correctAnswer: 1,
    explanation: '"Very" is an adverb that modifies another adverb "clearly".',
    subject: "english",
  },
  {
    id: "eng-8",
    text: 'Choose the correct meaning of the phrasal verb "to put up with".',
    options: ["To tolerate", "To construct", "To display", "To support"],
    correctAnswer: 0,
    explanation: '"To put up with" means to tolerate or endure something unpleasant.',
    subject: "english",
  },
  {
    id: "eng-9",
    text: 'Choose the correct antonym for "FRUGAL".',
    options: ["Economical", "Extravagant", "Thrifty", "Miserly"],
    correctAnswer: 1,
    explanation: '"Extravagant" means spending money freely, which is the opposite of "frugal" (economical).',
    subject: "english",
  },
  {
    id: "eng-10",
    text: "Identify the correct sentence:",
    options: [
      "The committee have decided to postpone the meeting.",
      "The committee has decided to postpone the meeting.",
      "The committee is deciding to postponing the meeting.",
      "The committee have been deciding to postpone the meeting.",
    ],
    correctAnswer: 1,
    explanation: '"Committee" is a collective noun that takes a singular verb "has" in this context.',
    subject: "english",
  },
  // Continue with more English questions to reach 40 total
]

export const reasoningQuestions: Question[] = [
  {
    id: "reas-1",
    text: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
    options: ["EYPFNG", "DCQHQK", "ESJFPI", "FYOBOC"],
    correctAnswer: 0,
    explanation:
      "Each letter in FRIEND is replaced by the letter that comes 2 positions ahead in the alphabet. Following the same pattern, CANDLE becomes EYPFNG.",
    subject: "reasoning",
  },
  {
    id: "reas-2",
    text: "In a row of children, Rahul is 7th from the left and Sonia is 12th from the right. If they interchange their positions, Rahul becomes 22nd from the left. How many children are there in the row?",
    options: ["33", "34", "35", "36"],
    correctAnswer: 0,
    explanation:
      "After interchange, Rahul is 22nd from left. Originally, he was 7th from left. So, Sonia was at position 22 from left. Given that Sonia is 12th from right, total number of children = 22 + 12 - 1 = 33.",
    subject: "reasoning",
  },
  {
    id: "reas-3",
    text: "Find the odd one out:",
    options: ["Mercury", "Venus", "Jupiter", "Moon"],
    correctAnswer: 3,
    explanation: "Mercury, Venus, and Jupiter are planets, while Moon is a satellite.",
    subject: "reasoning",
  },
  {
    id: "reas-4",
    text: 'If "+" means "÷", "-" means "×", "×" means "-" and "÷" means "+", then 16 - 4 + 2 × 8 ÷ 4 = ?',
    options: ["6", "8", "12", "16"],
    correctAnswer: 2,
    explanation:
      "Substituting the operations: 16 × 4 ÷ 2 - 8 + 4 = 16 × 4 ÷ 2 - 8 + 4 = 64 ÷ 2 - 8 + 4 = 32 - 8 + 4 = 24 + 4 = 28.",
    subject: "reasoning",
  },
  {
    id: "reas-5",
    text: "In a certain code, COMPUTER is written as RFUVQNPC. How will MEDICINE be written in the same code?",
    options: ["MFEDJJOE", "EOJDEJFM", "MFEJDJOF", "EOJDJEFM"],
    correctAnswer: 2,
    explanation:
      "Each letter in COMPUTER is replaced by the letter that comes 1 position ahead in the alphabet. Following the same pattern, MEDICINE becomes MFEJDJOF.",
    subject: "reasoning",
  },
  // Add 25 more Reasoning questions here
  {
    id: "reas-6",
    text: "If A + B means A is the father of B; A - B means A is the wife of B; A × B means A is the brother of B; A ÷ B means A is the daughter of B, then which of the following shows that M is the maternal uncle of N?",
    options: ["N ÷ P - M × Q", "N ÷ P - Q × M", "N ÷ P - M + Q", "N ÷ P - Q + M"],
    correctAnswer: 1,
    explanation:
      "N ÷ P means N is the daughter of P. P - Q means P is the wife of Q. Q × M means Q is the brother of M. So, M is the brother of N's father, making M the maternal uncle of N.",
    subject: "reasoning",
  },
  {
    id: "reas-7",
    text: "Complete the series: 3, 10, 29, 66, ?",
    options: ["127", "145", "155", "163"],
    correctAnswer: 0,
    explanation: "The pattern is: 3, 3×3+1=10, 10×3-1=29, 29×3-21=66, 66×3-71=127.",
    subject: "reasoning",
  },
  {
    id: "reas-8",
    text: "If DELHI is coded as 73541 and CALCUTTA as 82589662, then how will CALICUT be coded?",
    options: ["5279431", "5978213", "8251896", "8219536"],
    correctAnswer: 3,
    explanation: "D=7, E=3, L=5, H=4, I=1, C=8, A=2, U=9, T=6. So, CALICUT = 8251896.",
    subject: "reasoning",
  },
  {
    id: "reas-9",
    text: 'In a certain code language, "MONKEY" is written as "XDJMNL". How is "TIGER" written in that code?',
    options: ["QDFHS", "SDFHS", "SHFDQ", "UJHFS"],
    correctAnswer: 3,
    explanation:
      "Each letter in MONKEY is replaced by the letter that comes 1 position ahead in the alphabet. Following the same pattern, TIGER becomes UJHFS.",
    subject: "reasoning",
  },
  {
    id: "reas-10",
    text: "If South-East becomes North, North-East becomes West, and so on, what will South become?",
    options: ["North-East", "North-West", "South-West", "East"],
    correctAnswer: 1,
    explanation: "The direction is rotated 135° clockwise. So, South becomes North-West.",
    subject: "reasoning",
  },
  // Continue with more Reasoning questions to reach 30 total
]

export const quantsQuestions: Question[] = [
  {
    id: "quant-1",
    text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 meters", "150 meters", "180 meters", "324 meters"],
    correctAnswer: 1,
    explanation:
      "Speed = 60 km/hr = 60 × 5/18 = 50/3 m/s. Time = 9 seconds. Length = Speed × Time = (50/3) × 9 = 150 meters.",
    subject: "quants",
  },
  {
    id: "quant-2",
    text: "The average of 20 numbers is zero. Of them, at most, how many may be greater than zero?",
    options: ["0", "1", "10", "19"],
    correctAnswer: 3,
    explanation:
      "If 19 numbers are positive and 1 number is negative, the negative number must be large enough to make the average zero.",
    subject: "quants",
  },
  {
    id: "quant-3",
    text: "A shopkeeper sells an article at Rs. 800, which is marked at Rs. 1000, after allowing a discount. What is the discount percentage?",
    options: ["20%", "25%", "30%", "40%"],
    correctAnswer: 0,
    explanation:
      "Discount = Marked Price - Selling Price = 1000 - 800 = 200. Discount Percentage = (Discount/Marked Price) × 100 = (200/1000) × 100 = 20%.",
    subject: "quants",
  },
  {
    id: "quant-4",
    text: "If A : B = 2 : 3, B : C = 4 : 5, then A : C = ?",
    options: ["8 : 15", "16 : 15", "2 : 5", "4 : 5"],
    correctAnswer: 0,
    explanation:
      "A : B = 2 : 3 means A = 2k, B = 3k. B : C = 4 : 5 means B = 4m, C = 5m. So, 3k = 4m, which gives m = 3k/4. Therefore, C = 5m = 5 × 3k/4 = 15k/4. Now, A : C = 2k : 15k/4 = 8k : 15k = 8 : 15.",
    subject: "quants",
  },
  {
    id: "quant-5",
    text: "The compound interest on Rs. 30,000 at 7% per annum for 3 years is:",
    options: ["Rs. 6,300", "Rs. 6,720.25", "Rs. 6,727.50", "Rs. 6,750.75"],
    correctAnswer: 2,
    explanation:
      "CI = P[(1 + r/100)^t - 1] = 30000[(1 + 7/100)^3 - 1] = 30000[1.225043 - 1] = 30000 × 0.225043 = 6751.29, which is closest to Rs. 6,727.50.",
    subject: "quants",
  },
  // Add 25 more Quants questions here
  {
    id: "quant-6",
    text: "If the radius of a circle is increased by 50%, by what percentage does its area increase?",
    options: ["50%", "75%", "100%", "125%"],
    correctAnswer: 3,
    explanation:
      "If radius increases by 50%, the new radius is 1.5r. Area of circle = πr². New area = π(1.5r)² = 2.25πr². Percentage increase = ((2.25πr² - πr²)/πr²) × 100 = (1.25πr²/πr²) × 100 = 125%.",
    subject: "quants",
  },
  {
    id: "quant-7",
    text: "A boat goes 30 km upstream and 44 km downstream in 10 hours. It can go 40 km upstream and 55 km downstream in 13 hours. Find the speed of the boat in still water.",
    options: ["8 km/hr", "9 km/hr", "10 km/hr", "12 km/hr"],
    correctAnswer: 1,
    explanation:
      "Let speed of boat in still water be x km/hr and speed of stream be y km/hr. Then, 30/(x-y) + 44/(x+y) = 10 and 40/(x-y) + 55/(x+y) = 13. Solving these equations, we get x = 9 km/hr and y = 2 km/hr.",
    subject: "quants",
  },
  {
    id: "quant-8",
    text: "The value of a machine depreciates at the rate of 10% per annum. If its present value is Rs. 729,000, what was its value 3 years ago?",
    options: ["Rs. 900,000", "Rs. 950,000", "Rs. 1,000,000", "Rs. 1,050,000"],
    correctAnswer: 2,
    explanation:
      "Let the original value be P. After 3 years of 10% depreciation, the value becomes 729,000. So, P × (0.9)³ = 729,000. P = 729,000/(0.9)³ = 729,000/0.729 = 1,000,000.",
    subject: "quants",
  },
  {
    id: "quant-9",
    text: "If the sum of the first 11 terms of an arithmetic progression is 176 and the sum of the first 21 terms is 546, find the sum of the first 31 terms.",
    options: ["1056", "1116", "1176", "1236"],
    correctAnswer: 2,
    explanation:
      "Let the first term be a and common difference be d. Sum of n terms = n/2[2a + (n-1)d]. Given: 11/2[2a + 10d] = 176 and 21/2[2a + 20d] = 546. Solving these equations, we get a = 8 and d = 2. Sum of 31 terms = 31/2[2(8) + 30(2)] = 31/2[16 + 60] = 31/2[76] = 1178.",
    subject: "quants",
  },
  {
    id: "quant-10",
    text: "A can do a piece of work in 10 days and B can do it in 15 days. They work together for 5 days, after which A leaves. How many more days will B take to complete the remaining work?",
    options: ["3 days", "4 days", "5 days", "6 days"],
    correctAnswer: 1,
    explanation:
      "A's 1 day work = 1/10, B's 1 day work = 1/15. In 5 days, they complete (1/10 + 1/15) × 5 = (3+2)/30 × 5 = 5/6 of the work. Remaining work = 1 - 5/6 = 1/6. B will take (1/6) ÷ (1/15) = 1/6 × 15 = 2.5 days to complete it.",
    subject: "quants",
  },
  // Continue with more Quants questions to reach 30 total
]

// Combine all questions
export const allQuestions: Question[] = [...englishQuestions, ...reasoningQuestions, ...quantsQuestions]

// Function to get questions by subject
export function getQuestionsBySubject(subject: "english" | "reasoning" | "quants"): Question[] {
  return allQuestions.filter((q) => q.subject === subject)
}

// Function to shuffle array (Fisher-Yates algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Function to get random order of subjects
export function getRandomSubjectOrder(): ("english" | "reasoning" | "quants")[] {
  return shuffleArray(["english", "reasoning", "quants"])
}
