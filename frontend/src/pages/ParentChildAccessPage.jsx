import { useState } from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { getChildProfile, saveChildCredentials } from '../data/account.js'

function ParentChildAccessPage() {
  const [child, setChild] = useState(getChildProfile)
  const [name, setName] = useState(() => getChildProfile()?.name ?? '')
  const [generatedPin, setGeneratedPin] = useState('')
  const [notice, setNotice] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setNotice('')
    try {
      const credentials = await saveChildCredentials(name)
      setChild({ name: credentials.name, code: credentials.code })
      setName(credentials.name)
      setGeneratedPin(credentials.pin)
    } catch (error) {
      console.error('Could not save child login details.', error)
      setNotice(
        error instanceof Error
          ? error.message
          : 'Child access could not be saved. Please try again.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="app-screen">
      <main className="app-screen-main parent-child-main">
        <header className="screen-heading-row">
          <div>
            <h1 className="screen-title">Child login details</h1>
            <p className="screen-subtitle">
              Create the code and PIN your child will use to sign in.
            </p>
          </div>
          <LogoutButton />
        </header>

        <form className="child-access-form" onSubmit={handleSubmit}>
          <label htmlFor="child-name">Child&apos;s name</label>
          <input
            id="child-name"
            name="child-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            autoComplete="off"
            required
          />
          <p>
            We&apos;ll keep the learning code the same and generate a new
            four-digit PIN whenever you save.
          </p>
          <button
            className="answer-submit"
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? 'Generating…'
              : child
                ? 'Generate a new PIN'
                : 'Generate learning code and PIN'}
          </button>
        </form>

        {child && (
          <section className="child-credentials-card" aria-live="polite">
            <h2 className="section-title">Share these login details</h2>
            <div className="child-credential">
              <span>Learning code</span>
              <strong>{child.code}</strong>
            </div>
            {generatedPin ? (
              <div className="child-credential">
                <span>Secret PIN — write it down now</span>
                <strong>{generatedPin}</strong>
              </div>
            ) : (
              <p className="credential-hidden-note">
                The PIN is stored securely and can&apos;t be shown again. Generate
                a new PIN if your child forgets it.
              </p>
            )}
          </section>
        )}

        <p className="prototype-note">
          Prototype note: accounts are stored only in this browser. A backend
          is needed for real accounts and access across devices.
        </p>
        {notice && (
          <p className="today-notice" role="alert">
            {notice}
          </p>
        )}
      </main>
      <nav className="today-nav parent-nav" aria-label="Parent">
        <a href="#parent-home">Home</a>
        <a href="#parent-child" aria-current="page">Child access</a>
        <a href="#parent-rewards">Rewards</a>
      </nav>
    </div>
  )
}

export default ParentChildAccessPage
