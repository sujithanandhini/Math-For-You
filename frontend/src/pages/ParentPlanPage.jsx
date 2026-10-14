import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getWeekPlan, saveWeekPlan } from '../data/progress.js'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function ParentPlanPage() {
  const [plan, setPlan] = useState(getWeekPlan)
  const [selectedDay, setSelectedDay] = useState('Wed')
  const [source, setSource] = useState('Type it')
  const [notice, setNotice] = useState('')
  const selectedProblem = plan.find((item) => item.day === selectedDay)

  function openEditor(day) {
    setSelectedDay(day)
    setSource('Type it')
    setNotice('')
  }

  function saveProblem(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title').trim()
    if (!title) {
      setNotice('Add the problem text before saving.')
      return
    }
    const updated = plan.map((item) =>
      item.day === selectedDay
        ? {
            ...item,
            title,
            topic: formData.get('topic'),
            answer: formData.get('answer').trim(),
            hint: formData.get('hint').trim(),
            due: formData.get('due'),
            source,
          }
        : item,
    )
    setPlan(updated)
    saveWeekPlan(updated)
    setNotice(`${selectedDay}'s problem saved.`)
    setSelectedDay('')
  }

  return (
    <div className="app-screen plan-screen">
      <main className="app-screen-main parent-plan-main">
        <header className="screen-heading-row">
          <div>
            <h1 className="screen-title">Plan next week</h1>
            <p className="screen-subtitle">
              Mon 12 – Fri 16 Oct · one problem a day
            </p>
          </div>
          <LogoutButton />
        </header>
        <div className="plan-day-list">
          {days.map((day) => {
            const item = plan.find((problem) => problem.day === day)
            const active = day === selectedDay
            return (
              <button
                className={`plan-day-row ${active ? 'active' : ''} ${!item?.title ? 'empty' : ''}`}
                key={day}
                type="button"
                onClick={() => openEditor(day)}
              >
                <strong>{day}</strong>
                <span>{item?.title || '+ Add problem'}</span>
                {item?.title && (
                  <small>{item.source === 'Reuse' ? 'Revenge · auto' : item.topic}</small>
                )}
              </button>
            )
          })}
        </div>
        {notice && <p className="today-notice" role="status">{notice}</p>}
      </main>
      {selectedDay && (
        <>
          <button
            className="sheet-backdrop"
            aria-label="Close problem editor"
            type="button"
            onClick={() => setSelectedDay('')}
          />
          <form className="plan-sheet" onSubmit={saveProblem}>
            <div className="sheet-heading">
              <div className="sheet-handle" />
              <h2>Add {selectedDay}&apos;s problem</h2>
              <button
                className="sheet-close"
                type="button"
                aria-label="Close without saving"
                onClick={() => {
                  setSelectedDay('')
                  setNotice('')
                }}
              >
                ×
              </button>
            </div>
            <div className="plan-source-options">
              {['Type it', 'Snap a book', 'Reuse a missed one'].map((option) => (
                <button
                  className={source === option ? 'selected' : ''}
                  type="button"
                  aria-pressed={source === option}
                  key={option}
                  onClick={() => setSource(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {source === 'Type it' ? (
              <label className="plan-field">
                Problem
                <textarea
                  name="title"
                  defaultValue={selectedProblem?.title || ''}
                  rows={2}
                  required
                />
              </label>
            ) : source === 'Snap a book' ? (
              <>
                <label className="plan-upload">
                  Take or upload a photo
                  <input type="file" accept="image/*" capture="environment" />
                </label>
                <label className="plan-field">
                  Problem text
                  <textarea
                    name="title"
                    defaultValue={selectedProblem?.title || ''}
                    rows={2}
                    required
                  />
                </label>
              </>
            ) : (
              <>
                <label className="plan-field">
                  Choose a missed question
                  <select name="title" defaultValue="Angles in a triangle">
                    <option>Angles in a triangle</option>
                    <option>Handshake counting</option>
                  </select>
                </label>
                </>
            )}
            <div className="plan-select-row">
              <label className="plan-field">
                Topic
                <select name="topic" defaultValue={selectedProblem?.topic || 'Geometry'}>
                  <option>Geometry</option>
                  <option>Number theory</option>
                  <option>Counting</option>
                  <option>Logic puzzles</option>
                </select>
              </label>
              <label className="plan-field">
                Due by
                <select name="due" defaultValue={selectedProblem?.due || '11:59 pm'}>
                  <option>11:59 pm</option>
                  <option>8:00 pm</option>
                </select>
              </label>
            </div>
            <label className="plan-field">
              Answer key
              <input
                name="answer"
                defaultValue={selectedProblem?.answer || ''}
                placeholder="Only you can see this"
              />
            </label>
            <label className="plan-field">
              Hint (optional, costs 1 star)
              <input
                name="hint"
                defaultValue={selectedProblem?.hint || ''}
                placeholder="A nudge, not the method"
              />
            </label>
            <button className="answer-submit" type="submit">
              Save for {selectedDay}
            </button>
          </form>
        </>
      )}
      <nav className="today-nav parent-nav" aria-label="Parent">
        <a href="#parent-home">
          <HomeIcon />Home
        </a>
        <a href="#parent-plan" aria-current="page">
          <CalendarIcon />Plan
        </a>
        <a href="#parent-rewards">
          <GiftIcon />Rewards
        </a>
      </nav>
    </div>
  )
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 11 8-7 8 7v9h-5v-6H9v6H4z" /></svg>
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
}

function GiftIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M3.5 13h17M12 9v11M12 9c-2-4-6-4-6-1.5S9 9 12 9Zm0 0c2-4 6-4 6-1.5S15 9 12 9Z" /></svg>
}

export default ParentPlanPage
