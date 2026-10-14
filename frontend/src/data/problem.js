const STORAGE_KEY = 'math-for-you-today-problem'

export const defaultProblem = {
  topic: 'Number theory',
  question:
    'If a four-digit number 3a7a is a multiple of 55, find the value of a.',
  answer: '5',
  hints: ['', ''],
}

export function getTodayProblem() {
  const savedProblem = localStorage.getItem(STORAGE_KEY)
  if (!savedProblem) return defaultProblem

  try {
    const parsed = JSON.parse(savedProblem)
    if (
      typeof parsed.topic !== 'string' ||
      typeof parsed.question !== 'string' ||
      typeof parsed.answer !== 'string' ||
      !Array.isArray(parsed.hints) ||
      !parsed.hints.every((hint) => typeof hint === 'string')
    ) {
      throw new Error('Saved question has an invalid format.')
    }

    return {
      topic: parsed.topic,
      question: parsed.question,
      answer: parsed.answer,
      hints: [parsed.hints[0] || '', parsed.hints[1] || ''],
    }
  } catch (error) {
    console.error('Could not load the saved question.', error)
    return defaultProblem
  }
}

export function saveTodayProblem(problem) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problem))
}
