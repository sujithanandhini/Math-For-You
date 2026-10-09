import { useState } from 'react'
import Brand from '../components/Brand.jsx'

function LoginPage() {
  const [role, setRole] = useState('parent')
  const [notice, setNotice] = useState('')
  const isParent = role === 'parent'

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('Sign-in is not connected yet.')
  }

  function selectRole(nextRole) {
    setRole(nextRole)
    setNotice('')
  }

  return (
    <main className="login-page">
      <section className="login-card parent-card" aria-label={`${role} login`}>
        <Brand />
        <header className="card-heading">
          <h1>{isParent ? 'Welcome back!' : 'Ready for a challenge?'}</h1>
          <p>
            {isParent
              ? 'A little practice. A lot of progress.'
              : 'Your next problem is waiting for you.'}
          </p>
        </header>

        <div className="role-switch" aria-label="Choose your account type">
          <button
            type="button"
            className={isParent ? 'selected' : ''}
            aria-pressed={isParent}
            onClick={() => selectRole('parent')}
          >
            I&apos;m a parent
          </button>
          <button
            type="button"
            className={!isParent ? 'selected' : ''}
            aria-pressed={!isParent}
            onClick={() => selectRole('child')}
          >
            I&apos;m a child
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isParent ? (
            <>
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                className="text-action forgot-link"
                type="button"
                onClick={() =>
                  setNotice('Password recovery is not connected yet.')
                }
              >
                Forgot password?
              </button>
            </>
          ) : (
            <>
              <label htmlFor="login-code">Your learning code</label>
              <input
                id="login-code"
                type="text"
                name="learning-code"
                placeholder="e.g. STAR-4821"
                autoComplete="off"
                required
              />
              <label htmlFor="login-pin">Your secret PIN</label>
              <input
                id="login-pin"
                type="password"
                name="pin"
                placeholder="••••••••"
                inputMode="numeric"
                autoComplete="off"
                required
              />
            </>
          )}
          <button className="submit-button" type="submit">
            {isParent ? 'Log in' : "Let's start learning"}
          </button>
          {notice && (
            <p className="form-notice" role="status">
              {notice}
            </p>
          )}
        </form>

        {isParent ? (
          <p className="account-prompt">
            New here?{' '}
            <a className="text-action" href="#create-account">
              Create a parent account
            </a>
          </p>
        ) : (
          <div
            className="account-prompt account-prompt-spacer"
            aria-hidden="true"
          />
        )}

        <p className="card-tip">
          {isParent
            ? 'One problem a day. Every effort earns a star.'
            : 'Ask your parent for your learning code and PIN.'}
        </p>
      </section>
    </main>
  )
}

export default LoginPage
