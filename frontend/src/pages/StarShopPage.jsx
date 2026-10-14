import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import {
  getRewardRequest,
  getRewards,
  getStars,
  saveRewardRequest,
} from '../data/progress.js'

function StarShopPage() {
  const balance = getStars()
  const rewards = getRewards()
  const [request, setRequest] = useState(getRewardRequest)
  const [notice, setNotice] = useState('')

  function requestReward(reward) {
    if (balance < reward.cost) {
      setNotice('You need a few more stars for that reward.')
      return
    }
    const nextRequest = { title: reward.title, cost: reward.cost }
    saveRewardRequest(nextRequest)
    setRequest(nextRequest)
    setNotice(`${reward.title} requested. Waiting for your parent’s OK.`)
  }

  return (
    <div className="app-screen">
      <main className="app-screen-main shop-main">
        <header className="screen-heading-row">
          <h1 className="screen-title">Star shop</h1>
          <LogoutButton />
        </header>
        <section className="shop-balance">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />
          </svg>
          <div>
            <strong>{balance}</strong>
            <span>stars to spend</span>
          </div>
        </section>
        <h2 className="section-title">Rewards</h2>
        <div className="reward-list">
          {rewards.map((reward) => {
            const waiting = request?.title === reward.title
            const affordable = balance >= reward.cost
            return (
              <article className="reward-card" key={reward.id}>
                <div className="reward-icon" aria-hidden="true">
                  ★
                </div>
                <div className="reward-copy">
                  <strong>{reward.title}</strong>
                  <span>{reward.cost} stars</span>
                  {reward.cost > balance && (
                    <div
                      className="reward-progress"
                      role="progressbar"
                      aria-valuenow={Math.min(balance, reward.cost)}
                      aria-valuemin="0"
                      aria-valuemax={reward.cost}
                      aria-label={`${reward.cost - balance} stars to go`}
                    >
                      <span style={{ width: `${Math.min(100, (balance / reward.cost) * 100)}%` }} />
                    </div>
                  )}
                </div>
                {waiting ? (
                  <span className="reward-waiting">Waiting for OK</span>
                ) : (
                  <button
                    className="reward-action"
                    type="button"
                    disabled={!affordable}
                    onClick={() => requestReward(reward)}
                  >
                    {affordable ? 'Get it' : 'Save up'}
                  </button>
                )}
              </article>
            )
          })}
        </div>
        <p className="shop-footnote">
          {rewards.length
            ? 'Rewards are set by your parent. Requests need a quick OK.'
            : 'Your parent has not added any rewards yet.'}
        </p>
        {notice && <p className="today-notice" role="status">{notice}</p>}
      </main>
      <nav className="today-nav" aria-label="Main">
        <a href="#today">
          <CalendarIcon />Today
        </a>
        <a href="#notebook">
          <BookIcon />Notebook
        </a>
        <a href="#shop" aria-current="page">
          <GiftIcon />Star shop
        </a>
      </nav>
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

export default StarShopPage
