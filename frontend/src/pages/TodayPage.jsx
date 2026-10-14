import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getChildProfile } from '../data/account.js'
import { getTodayProblem } from '../data/problem.js'
import { getStars } from '../data/progress.js'

const week = [
  { day: 'Mon', status: 'done' },
  { day: 'Tue', status: 'done' },
  { day: 'Wed', status: 'done' },
  { day: 'Thu', status: 'done' },
  { day: 'Fri', status: 'today' },
  { day: 'Sat', status: 'upcoming' },
  { day: 'Sun', status: 'upcoming' },
]

function StarIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />
    </svg>
  )
}

function TodayPage() {
  const [notice, setNotice] = useState('')
  const [problem] = useState(getTodayProblem)
  const child = getChildProfile()

  return (
    <div className="today-page">
      <main className="today-main">
        <header className="today-header">
          <div>
            <p className="today-date">Friday, 9 Oct</p>
            <h1>Hi, {child?.name || 'learner'}!</h1>
          </div>
          <div className="star-total" aria-label={`${getStars()} stars`}>
            <StarIcon />
            <span>{getStars()}</span>
          </div>
          <LogoutButton />
        </header>

        <section className="today-card streak-card" aria-labelledby="streak-title">
          <div className="streak-heading">
            <svg
              className="flame-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5 3.4-8.4 1.9 1.2 2.8 3 2.8 4.6 1-.7 1.6-1.9 1.7-3.1 2 1.6 4.1 4 4.1 6.9 0 3.2-2.4 5.6-6 5.6Z" />
            </svg>
            <h2 id="streak-title">5-day streak</h2>
            <span className="best-streak">Best: 9 days</span>
          </div>
          <div className="week-grid" aria-label="This week's learning activity">
            {week.map(({ day, status }) => (
              <div className="week-day" key={day}>
                <span className={status === 'today' ? 'current-day' : ''}>
                  {day}
                </span>
                <div className={`day-indicator ${status}`}>
                  {status === 'done' && <StarIcon />}
                  {status === 'today' && <StarIcon />}
                </div>
              </div>
            ))}
          </div>
          <p className="streak-bonus">
            2 more days for the 7-day bonus: <strong>+5 stars</strong>
          </p>
        </section>

        <section className="today-card problem-card" aria-labelledby="problem-title">
          <div className="problem-meta">
            <span className="topic-tag">{problem.topic}</span>
            <span className="time-left">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.5V12l3 2" />
              </svg>
              3h 50m left
            </span>
          </div>
          <h2 id="problem-title">Today&apos;s problem</h2>
          <p className="problem-text">
            {problem.question}
          </p>
          <div className="problem-reward">
            {[0, 1, 2].map((star) => (
              <StarIcon className="empty-star" key={star} />
            ))}
            <span>Earn up to 3 stars</span>
          </div>
          <button
            className="start-solving"
            type="button"
            onClick={() => {
              window.location.hash = '#solve'
            }}
          >
            Start solving
          </button>
        </section>

        <section className="revenge-card" aria-label="Bonus problem">
          <div className="revenge-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
              <path d="M18 3v4h-4M6 21v-4h4" />
            </svg>
          </div>
          <div className="revenge-copy">
            <h2>Revenge problem ready</h2>
            <p>One you missed last week is back. Beat it for +1 bonus star.</p>
          </div>
          <button
            className="try-problem"
            type="button"
            onClick={() => setNotice('The bonus problem is not connected yet.')}
          >
            Try it
          </button>
        </section>
        {notice && (
          <p className="today-notice" role="status">
            {notice}
          </p>
        )}
      </main>

      <nav className="today-nav" aria-label="Main">
        <a href="#today" aria-current="page">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
          Today
        </a>
        <a href="#notebook">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5.5C6 4.5 9 4.5 12 6c3-1.5 6-1.5 8-.5V19c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5z" />
            <path d="M12 6v13.5" />
          </svg>
          Notebook
        </a>
        <a href="#shop">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
            <path d="M3.5 13h17M12 9v11M12 9c-2-4-6-4-6-1.5S9 9 12 9Zm0 0c2-4 6-4 6-1.5S15 9 12 9Z" />
          </svg>
          Star shop
        </a>
      </nav>
    </div>
  )
}

export default TodayPage
