import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getRewards, saveRewards } from '../data/progress.js'

function ParentRewardsPage() {
  const [rewards, setRewards] = useState(getRewards)
  const [notice, setNotice] = useState('')

  function addReward(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('reward-name').trim()
    const cost = Number(formData.get('reward-cost'))
    if (!title || !Number.isInteger(cost) || cost < 1) {
      setNotice('Enter a reward name and a star cost greater than zero.')
      return
    }

    const nextRewards = [
      ...rewards,
      { id: `reward-${Date.now()}`, title, cost },
    ]
    saveRewards(nextRewards)
    setRewards(nextRewards)
    setNotice(`${title} was added to the child’s Star shop.`)
    event.currentTarget.reset()
  }

  function removeReward(reward) {
    const nextRewards = rewards.filter((item) => item.id !== reward.id)
    saveRewards(nextRewards)
    setRewards(nextRewards)
    setNotice(`${reward.title} was removed from the Star shop.`)
  }

  return (
    <div className="app-screen">
      <main className="app-screen-main parent-rewards-main">
        <header className="screen-heading-row">
          <div>
            <h1 className="screen-title">Manage rewards</h1>
            <p className="screen-subtitle">
              Choose rewards your child can earn stars for.
            </p>
          </div>
          <LogoutButton />
        </header>

        <form className="add-reward-form" onSubmit={addReward}>
          <h2 className="section-title">Add a reward</h2>
          <label htmlFor="reward-name">Reward name</label>
          <input
            id="reward-name"
            name="reward-name"
            placeholder="e.g. Choose a family game"
            maxLength={60}
            required
          />
          <label htmlFor="reward-cost">Star cost</label>
          <div className="reward-cost-row">
            <input
              id="reward-cost"
              name="reward-cost"
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 20"
              required
            />
            <span>stars</span>
          </div>
          <button className="answer-submit" type="submit">
            Add reward
          </button>
        </form>

        <section className="parent-managed-rewards">
          <div className="managed-rewards-heading">
            <h2 className="section-title">Rewards in the child&apos;s shop</h2>
            <span>{rewards.length}</span>
          </div>
          {rewards.length ? (
            <div className="reward-list">
              {rewards.map((reward) => (
                <article className="reward-card" key={reward.id}>
                  <div className="reward-icon" aria-hidden="true">★</div>
                  <div className="reward-copy">
                    <strong>{reward.title}</strong>
                    <span>{reward.cost} stars</span>
                  </div>
                  <button
                    className="remove-reward-button"
                    type="button"
                    aria-label={`Remove ${reward.title}`}
                    onClick={() => removeReward(reward)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-rewards">
              No rewards yet. Add a reward above to show it in the child&apos;s
              Star shop.
            </p>
          )}
        </section>

        {notice && (
          <p className="today-notice" role="status">
            {notice}
          </p>
        )}
      </main>
      <nav className="today-nav parent-nav" aria-label="Parent">
        <a href="#parent-home">
          <HomeIcon />Home
        </a>
        <a href="#parent-plan">
          <CalendarIcon />Plan
        </a>
        <a href="#parent-rewards" aria-current="page">
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

export default ParentRewardsPage
