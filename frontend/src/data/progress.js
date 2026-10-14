const STAR_KEY = 'math-for-you-stars'
const SUBMISSION_KEY = 'math-for-you-submission'
const REWARD_KEY = 'math-for-you-reward-request'
const REWARDS_KEY = 'math-for-you-rewards'
const WEEK_KEY = 'math-for-you-week-plan'
const RESULT_KEY = 'math-for-you-last-result'

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const defaultWeekPlan = [
  { day: 'Mon', title: 'Handshake counting', topic: 'Counting' },
  { day: 'Tue', title: 'Paths on a grid', topic: 'Counting' },
  { day: 'Wed', title: '', topic: 'Geometry' },
  { day: 'Thu', title: '', topic: '' },
  { day: 'Fri', title: 'Shaded area', topic: 'Geometry' },
]

export const defaultRewards = [
  { id: 'screen-time', title: '30 min extra screen time', cost: 20 },
  { id: 'dinner-choice', title: "Pick Friday's dinner", cost: 15 },
  { id: 'stay-up', title: 'Stay up 30 min (Saturday)', cost: 25 },
  { id: 'bookshop', title: 'Trip to the bookshop', cost: 50 },
]

function readJSON(key, fallback) {
  const value = localStorage.getItem(key)
  if (!value) return fallback

  try {
    return JSON.parse(value)
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error)
    return fallback
  }
}

export function getStars() {
  const storedValue = localStorage.getItem(STAR_KEY)
  if (storedValue === null) return 46
  const value = Number(storedValue)
  return Number.isFinite(value) && value >= 0 ? value : 46
}

export function saveStars(stars) {
  localStorage.setItem(STAR_KEY, String(Math.max(0, stars)))
}

export function getSubmission() {
  return readJSON(SUBMISSION_KEY, null)
}

export function saveSubmission(submission) {
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission))
}

export function saveResult(result) {
  localStorage.setItem(RESULT_KEY, JSON.stringify(result))
}

export function getLastResult() {
  return readJSON(RESULT_KEY, null)
}

export function clearSubmission() {
  localStorage.removeItem(SUBMISSION_KEY)
}

export function getRewardRequest() {
  return readJSON(REWARD_KEY, null)
}

export function saveRewardRequest(request) {
  localStorage.setItem(REWARD_KEY, JSON.stringify(request))
}

export function clearRewardRequest() {
  localStorage.removeItem(REWARD_KEY)
}

export function getRewards() {
  const storedRewards = readJSON(REWARDS_KEY, defaultRewards)
  if (
    !Array.isArray(storedRewards) ||
    !storedRewards.every(
      (reward) =>
        reward &&
        typeof reward.id === 'string' &&
        typeof reward.title === 'string' &&
        reward.title.trim().length > 0 &&
        Number.isInteger(reward.cost) &&
        reward.cost > 0,
    )
  ) {
    return defaultRewards
  }
  return storedRewards
}

export function saveRewards(rewards) {
  localStorage.setItem(REWARDS_KEY, JSON.stringify(rewards))
}

export function getWeekPlan() {
  const storedPlan = readJSON(WEEK_KEY, defaultWeekPlan)
  if (
    !Array.isArray(storedPlan) ||
    !storedPlan.every(
      (item) =>
        item &&
        typeof item.day === 'string' &&
        typeof item.title === 'string' &&
        typeof item.topic === 'string',
    )
  ) {
    return defaultWeekPlan
  }
  return storedPlan
}

export function saveWeekPlan(plan) {
  localStorage.setItem(WEEK_KEY, JSON.stringify(plan))
}
