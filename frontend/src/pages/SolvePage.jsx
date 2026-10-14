import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getTodayProblem } from '../data/problem.js'
import { saveSubmission } from '../data/progress.js'

function SolvePage() {
  const [problem] = useState(getTodayProblem)
  const [answer, setAnswer] = useState('')
  const [hintCount, setHintCount] = useState(0)
  const [stars, setStars] = useState(46)
  const [feedback, setFeedback] = useState('')
  const [pageCount, setPageCount] = useState(0)

  function openHint(index) {
    if (hintCount !== index || stars < 1) return
    setStars((currentStars) => currentStars - 1)
    setHintCount((currentCount) => currentCount + 1)
  }

  function submitAnswer(event) {
    event.preventDefault()
    const normalizedAnswer = answer.trim().toLowerCase().replace(/\s/g, '')
    const normalizedCorrectAnswer = problem.answer
      .trim()
      .toLowerCase()
      .replace(/\s/g, '')
    const isCorrect = normalizedAnswer === normalizedCorrectAnswer
    saveSubmission({
      answer: answer.trim(),
      isCorrect,
      hadAGo: true,
      clearWorking: pageCount > 0,
      working: pageCount > 0,
      submittedAt: new Date().toISOString(),
    })
    setFeedback(
      'Your answer has been sent to your parent for marking.',
    )
  }

  return (
    <div className="solve-page">
      <header className="solve-header">
        <a className="solve-back" href="#today" aria-label="Back to dashboard">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </a>
        <h1>Friday · Problem 5</h1>
        <div className="solve-time">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
          </svg>
          3h 50m
        </div>
        <LogoutButton />
      </header>

      <main className="solve-main">
        <section className="solve-card solve-prompt">
          <span className="topic-tag">{problem.topic}</span>
          <p>{problem.question}</p>
          <div className="solve-reward">
            Earn up to 3 stars: try it, get it right, show clear working
          </div>
        </section>

        <section className="solve-card solve-hints">
          <div className="hint-heading">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
            </svg>
            <h2>Stuck? Open a hint</h2>
            <span className="hint-cost">costs 1 star</span>
          </div>
          <div className="hint-buttons">
            <button
              type="button"
              disabled={hintCount > 0 || stars < 1 || !problem.hints[0]}
              onClick={() => openHint(0)}
            >
              {hintCount > 0 ? 'Hint 1 opened' : 'Open hint 1'}
            </button>
            <button
              type="button"
              disabled={hintCount < 1 || hintCount > 1 || stars < 1 || !problem.hints[1]}
              onClick={() => openHint(1)}
            >
              {hintCount > 1 ? 'Hint 2 opened' : 'Hint 2'}
            </button>
          </div>
          {hintCount > 0 && problem.hints[0] && (
            <p className="hint-copy">{problem.hints[0]}</p>
          )}
          {hintCount > 1 && problem.hints[1] && (
            <p className="hint-copy">{problem.hints[1]}</p>
          )}
          <p className="hint-balance">Your stars: {stars}</p>
        </section>

        <section className="solve-working">
          <div className="working-heading">
            <h2>My working</h2>
            <span>Snap your paper</span>
          </div>
          <div className="working-actions">
            <label className="photo-upload">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
                <circle cx="12" cy="13.5" r="3.5" />
              </svg>
              Take photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(event) => {
                  const count = event.target.files?.length || 0
                  setPageCount((currentCount) => currentCount + count)
                }}
              />
            </label>
            <label className="add-page-upload">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {pageCount ? `Add page (${pageCount})` : 'Add page'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const count = event.target.files?.length || 0
                  setPageCount((currentCount) => currentCount + count)
                }}
              />
            </label>
          </div>
        </section>

        <form className="answer-form" onSubmit={submitAnswer}>
          <label htmlFor="final-answer">Final answer</label>
          <div className="answer-input-row">
            <input
              id="final-answer"
              type="text"
              inputMode="text"
              placeholder="Type your answer"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value)
                setFeedback('')
              }}
              required
            />
          </div>
          <button className="answer-submit" type="submit">
            Submit answer
          </button>
          {feedback ? (
            <p className="answer-feedback" role="status">
              {feedback}
            </p>
          ) : (
            <p className="answer-caption">Your stars arrive once it&apos;s marked</p>
          )}
        </form>
      </main>
    </div>
  )
}

export default SolvePage
