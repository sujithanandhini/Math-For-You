import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getTodayProblem } from '../data/problem.js'
import {
  clearSubmission,
  getStars,
  getSubmission,
  saveResult,
  saveStars,
} from '../data/progress.js'

const criteria = ['Had a go', 'Correct', 'Clear working']

function ParentMarkPage() {
  const problem = getTodayProblem()
  const submission = getSubmission()
  const [selected, setSelected] = useState([
    true,
    submission?.isCorrect ?? false,
    Boolean(submission?.working),
  ])
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')

  const awardedStars = selected.filter(Boolean).length

  function toggleCriterion(index) {
    setSelected((current) =>
      current.map((value, itemIndex) =>
        itemIndex === index ? !value : value,
      ),
    )
  }

  function sendStars() {
    saveStars(getStars() + awardedStars)
    saveResult({
      awardedStars,
      hadAGo: selected[0],
      isCorrect: selected[1],
      clearWorking: selected[2],
      note: note.trim(),
    })
    clearSubmission()
    window.location.hash = '#stars-earned'
  }

  return (
    <main className="mark-page">
      <header className="mark-header">
        <a className="solve-back" href="#parent-home" aria-label="Back to parent home">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </a>
        <div>
          <h1>Mark Problem 5</h1>
          <p>Friday · sent by your child · no hints used</p>
        </div>
        <LogoutButton />
      </header>
      <p className="mark-question">{problem.question}</p>
      <button
        className="working-preview"
        type="button"
        onClick={() => setNotice('No working photo was attached to this submission.')}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="m4 18 5-5 4 4 3-3 4 4" />
        </svg>
        <strong>{submission?.working ? 'Working photo attached' : 'No working photo'}</strong>
        <span>{submission?.working ? 'Tap to view' : 'Your child can add working on the Solve page.'}</span>
        {submission?.answer && <small>Answer submitted: {submission.answer}</small>}
      </button>
      <div className="answer-comparison">
        <div>
          <span>Their answer</span>
          <strong>{submission?.answer || 'Not submitted'}</strong>
        </div>
        <div>
          <span>Your answer key</span>
          <strong>{problem.answer}</strong>
        </div>
      </div>
      <div className="mark-result-toggle" role="group" aria-label="Answer result">
        <button
          className={selected[1] ? 'active' : ''}
          type="button"
          aria-pressed={selected[1]}
          onClick={() =>
            setSelected((current) => [current[0], true, current[2]])
          }
        >
          ✓ Right
        </button>
        <button
          className={!selected[1] ? 'active' : ''}
          type="button"
          aria-pressed={!selected[1]}
          onClick={() =>
            setSelected((current) => [current[0], false, current[2]])
          }
        >
          Not yet
        </button>
      </div>
      <div className="mark-star-heading">
        <h2>Give stars</h2>
        <span>Tap to turn on or off</span>
      </div>
      <div className="mark-criteria">
        {criteria.map((criterion, index) => (
          <button
            className={selected[index] ? 'selected' : ''}
            type="button"
            aria-pressed={selected[index]}
            key={criterion}
            onClick={() => toggleCriterion(index)}
          >
            <StarIcon filled={selected[index]} />
            {criterion}
          </button>
        ))}
      </div>
      <label className="mark-note-label" htmlFor="parent-note">
        Note to your child
      </label>
      <textarea
        id="parent-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Say what they did well"
        rows={2}
      />
      {notice && <p className="today-notice" role="status">{notice}</p>}
      <button className="answer-submit mark-submit" type="button" onClick={sendStars}>
        Send {awardedStars} {awardedStars === 1 ? 'star' : 'stars'}
      </button>
    </main>
  )
}

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"
        fill={filled ? '#f4b400' : 'none'}
        stroke={filled ? '#9a6b00' : '#9aa1ad'}
      />
    </svg>
  )
}

export default ParentMarkPage
