import { useState } from 'react'
import Brand from '../components/Brand.jsx'

function CreateAccountPage() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')

    if (password !== confirmPassword) {
      event.currentTarget.elements['confirm-password'].setCustomValidity(
        'Passwords do not match.',
      )
      event.currentTarget.elements['confirm-password'].reportValidity()
      return
    }

    setNotice('Account creation is not connected yet.')
  }

  function clearConfirmPasswordError(event) {
    event.currentTarget.setCustomValidity('')
  }

  return (
    <main className="create-account-page">
      <a className="create-brand-link" href="#login" aria-label="Math Stars home">
        <Brand />
      </a>
      <header className="create-heading">
        <h1>Create your parent account</h1>
        <p>Help your child learn, one problem at a time.</p>
      </header>

      <form className="create-account-form" onSubmit={handleSubmit}>
        <label htmlFor="create-name">Your name</label>
        <input
          id="create-name"
          type="text"
          name="name"
          placeholder="Enter your name"
          autoComplete="name"
          required
        />

        <label htmlFor="create-email">Email address</label>
        <input
          id="create-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="create-password">Password</label>
        <input
          id="create-password"
          type="password"
          name="password"
          placeholder="Create a password"
          autoComplete="new-password"
          minLength={12}
          required
        />
        <p className="password-hint">Use at least 12 characters.</p>

        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          onChange={clearConfirmPasswordError}
          required
        />

        <label className="terms-agreement">
          <input type="checkbox" name="terms" required />
          <span>
            I agree to the{' '}
            <a href="#terms" onClick={(event) => event.preventDefault()}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(event) => event.preventDefault()}>
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <button className="create-submit-button" type="submit">
          Create account
        </button>
        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}
      </form>

      <p className="create-login-prompt">
        Already have an account? <a href="#login">Log in</a>
      </p>
      <p className="create-account-tip">
        <span className="tip-star" aria-hidden="true">
          ★
        </span>
        Next, you&apos;ll add your child and set up their learning code.
      </p>
    </main>
  )
}

export default CreateAccountPage
