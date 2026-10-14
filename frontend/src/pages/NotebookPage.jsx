import { getStars } from '../data/progress.js'
import LogoutButton from '../components/LogoutButton.jsx'

const topics = [
  { title: 'Number theory', correct: 8, total: 10 },
  { title: 'Counting', correct: 5, total: 8 },
  { title: 'Geometry', correct: 3, total: 7, needsPractice: true },
  { title: 'Logic puzzles', correct: 6, total: 6 },
]

function NotebookPage() {
  return (
    <div className="app-screen">
      <main className="app-screen-main notebook-main">
        <header className="screen-heading-row">
          <div className="notebook-heading">
            <h1 className="screen-title">My notebook</h1>
            <p>October so far</p>
          </div>
          <LogoutButton />
        </header>
        <div className="stats-grid">
          <StatCard value="18" label="solved" />
          <StatCard value={getStars()} label="stars" highlight />
          <StatCard value="9" label="best streak" />
        </div>
        <section className="notebook-card topic-progress">
          <h2 className="section-title">Topics</h2>
          {topics.map((topic) => {
            const percentage = Math.round((topic.correct / topic.total) * 100)
            return (
              <div className="topic-progress-item" key={topic.title}>
                <div>
                  <strong>{topic.title}</strong>
                  <span className={topic.needsPractice ? 'needs-practice' : ''}>
                    {topic.correct} / {topic.total}
                  </span>
                </div>
                <div
                  className="topic-progress-track"
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${topic.title}: ${percentage}% correct`}
                >
                  <span
                    className={topic.needsPractice ? 'practice-bar' : ''}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
          <p className="topic-tip">
            Geometry needs practice. More is coming next week.
          </p>
        </section>
        <section className="notebook-card revenge-list">
          <h2 className="section-title">
            <span className="revenge-icon small-revenge-icon" aria-hidden="true">
              ↻
            </span>
            Revenge problems
          </h2>
          <div className="revenge-list-item">
            <div>
              <strong>Angles in a triangle</strong>
              <span>Geometry · missed on 2 Oct</span>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#solve'
              }}
            >
              Try it
            </button>
          </div>
          <div className="revenge-list-item">
            <div>
              <strong>Handshake counting</strong>
              <span>Counting · missed on 7 Oct</span>
            </div>
            <span className="back-date">Back Mon 12</span>
          </div>
        </section>
      </main>
      <nav className="today-nav" aria-label="Main">
        <a href="#today">
          <CalendarIcon />Today
        </a>
        <a href="#notebook" aria-current="page">
          <BookIcon />Notebook
        </a>
        <a href="#shop">
          <GiftIcon />Star shop
        </a>
      </nav>
    </div>
  )
}

function StatCard({ value, label, highlight = false }) {
  return (
    <div className={`stat-card ${highlight ? 'highlight' : ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
}

function BookIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5C6 4.5 9 4.5 12 6c3-1.5 6-1.5 8-.5V19c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5z" /><path d="M12 6v13.5" /></svg>
}

function GiftIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M3.5 13h17M12 9v11M12 9c-2-4-6-4-6-1.5S9 9 12 9Zm0 0c2-4 6-4 6-1.5S15 9 12 9Z" /></svg>
}

export default NotebookPage
