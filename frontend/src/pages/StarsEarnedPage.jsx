import { getLastResult, getStars } from '../data/progress.js'
import LogoutButton from '../components/LogoutButton.jsx'

function Star({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />
    </svg>
  )
}

function StarsEarnedPage() {
  const result = getLastResult()
  const awardedStars = result?.awardedStars ?? 3
  const totalStars = getStars()

  return (
    <main className="result-page">
      <header className="result-header">
        <a className="solve-back" href="#today" aria-label="Close result">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </a>
        <span>Problem 5 · marked</span>
        <span className="result-header-spacer" />
        <LogoutButton />
      </header>

      <section className="result-hero">
        <div className="result-stars" aria-hidden="true">
          {[0, 1, 2].map((star) => (
            <Star className={star === 1 ? 'large-result-star' : ''} key={star} />
          ))}
        </div>
        <h1>{awardedStars > 0 ? 'Brilliant work!' : 'Keep practising!'}</h1>
        <div className="result-total">
          +{awardedStars} stars · you now have {totalStars}
        </div>
      </section>

      <section className="result-breakdown" aria-label="Star breakdown">
        {[
          ['Had a go', result?.hadAGo ?? true],
          ['Correct answer', result?.isCorrect ?? true],
          ['Clear working', result?.clearWorking ?? true],
        ].map(([label, earned]) => (
          <div className="result-row" key={label}>
            <Star className={earned ? 'earned-star' : 'empty-star'} />
            <span>{label}</span>
            <strong>{earned ? '+1' : '+0'}</strong>
          </div>
        ))}
      </section>

      <section className="parent-note">
        <strong>Note from your parent</strong>
        <p>{result?.note || 'Great effort on today’s problem. Keep it up!'}</p>
      </section>

      <div className="result-actions">
        <a className="result-outline-button" href="#solve">
          See my working
        </a>
        <a className="result-primary-button" href="#today">
          Back to today
        </a>
      </div>
    </main>
  )
}

export default StarsEarnedPage
