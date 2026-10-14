import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import {
  clearRewardRequest,
  getRewardRequest,
  getStars,
  getSubmission,
  getWeekPlan,
} from '../data/progress.js'
import { getChildProfile } from '../data/account.js'

function ParentHomePage() {
  const child = getChildProfile()
  const [submission] = useState(getSubmission)
  const [rewardRequest, setRewardRequest] = useState(getRewardRequest)
  const [notice, setNotice] = useState('')
  const weekPlan = getWeekPlan()

  function handleReward(approved) {
    setNotice(
      approved
        ? `${rewardRequest.title} approved.`
        : `${rewardRequest.title} dismissed.`,
    )
    clearRewardRequest()
    setRewardRequest(null)
  }

  return (
    <div className="app-screen">
      <main className="app-screen-main parent-home-main">
        <header className="parent-home-header">
          <div>
            <span>Parent view</span>
            <h1>{child ? `${child.name}’s week` : 'Parent dashboard'}</h1>
          </div>
          <div className="parent-header-actions">
            <button
              className="settings-button"
              type="button"
              aria-label="Manage child login"
              onClick={() => {
                window.location.hash = '#parent-child'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h10M18 7h2M4 17h2m4 0h10" />
                <circle cx="16" cy="7" r="2" />
                <circle cx="8" cy="17" r="2" />
              </svg>
            </button>
            <LogoutButton />
          </div>
        </header>
        <div className="parent-stats">
          <Stat value="5 days" label="streak" />
          <Stat value={getStars()} label="stars banked" highlight />
          <Stat value="4 / 5" label="done this week" />
        </div>
        <section className="child-access-summary">
          <div>
            <strong>{child ? `${child.name}’s login` : 'Set up child login'}</strong>
            <span>
              {child
                ? `Learning code: ${child.code}`
                : 'Generate a learning code and secret PIN for your child.'}
            </span>
          </div>
          <a href="#parent-child">
            {child ? 'Manage' : 'Set up'}
          </a>
        </section>
        <h2 className="section-title needs-title">Needs you</h2>
        {submission ? (
          <section className="needs-card mark-needed">
            <div className="needs-icon">✎</div>
            <div className="needs-copy">
              <strong>1 answer to mark</strong>
              <span>Problem 5 · submitted by your child</span>
            </div>
            <a className="small-primary-button" href="#parent-mark">
              Mark now
            </a>
          </section>
        ) : (
          <section className="needs-card">
            <div className="needs-icon">✓</div>
            <div className="needs-copy">
              <strong>No answers to mark</strong>
              <span>New submissions will appear here.</span>
            </div>
          </section>
        )}
        {rewardRequest && (
          <section className="parent-reward-card">
            <div className="parent-reward-heading">
              <div className="reward-icon">♧</div>
              <div className="needs-copy">
                <strong>Reward request</strong>
                <span>
                  {rewardRequest.title} · {rewardRequest.cost} stars
                </span>
              </div>
            </div>
            <div className="parent-reward-actions">
              <button type="button" onClick={() => handleReward(false)}>
                Not now
              </button>
              <button type="button" onClick={() => handleReward(true)}>
                Approve
              </button>
            </div>
          </section>
        )}
        <section className="parent-week-card" aria-label="This week's activity">
          {weekPlan.map((item, index) => (
            <div className="parent-week-row" key={item.day}>
              <strong>{item.day}</strong>
              <div className="parent-week-stars" aria-label={`${index < 4 ? 3 : 0} stars`}>
                {[0, 1, 2].map((star) => (
                  <StarIcon filled={index < 4} key={star} />
                ))}
              </div>
              <span>{item.title ? item.topic || 'Question' : 'Waiting for you to plan'}</span>
            </div>
          ))}
        </section>
        <a className="parent-add-question" href="#parent-question">
          Set today&apos;s question
        </a>
        {notice && <p className="today-notice" role="status">{notice}</p>}
      </main>
      <nav className="today-nav parent-nav" aria-label="Parent">
        <a href="#parent-home" aria-current="page">
          <HomeIcon />Home
        </a>
        <a href="#parent-plan">
          <CalendarIcon />Plan
        </a>
        <a href="#parent-rewards">
          <GiftIcon />Rewards
        </a>
      </nav>
    </div>
  )
}

function Stat({ value, label, highlight = false }) {
  return (
    <div className={`parent-stat ${highlight ? 'highlight' : ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
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

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 11 8-7 8 7v9h-5v-6H9v6H4z" /></svg>
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
}

function GiftIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M3.5 13h17M12 9v11M12 9c-2-4-6-4-6-1.5S9 9 12 9Zm0 0c2-4 6-4 6-1.5S15 9 12 9Z" /></svg>
}

export default ParentHomePage
