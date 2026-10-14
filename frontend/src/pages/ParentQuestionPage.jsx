import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import LogoutButton from '../components/LogoutButton.jsx'
import { getTodayProblem, saveTodayProblem } from '../data/problem.js'

function ParentQuestionPage() {
  const [notice, setNotice] = useState('')
  const [problem] = useState(getTodayProblem)

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const problem = {
      topic: formData.get('topic').trim(),
      question: formData.get('question').trim(),
      answer: formData.get('answer').trim(),
      hints: [formData.get('hint-one').trim(), formData.get('hint-two').trim()],
    }

    if (!problem.topic || !problem.question || !problem.answer) {
      setNotice('Please fill in the topic, question, and correct answer.')
      return
    }

    try {
      saveTodayProblem(problem)
      window.location.hash = '#parent-home'
    } catch (error) {
      console.error('Could not save the question.', error)
      setNotice('The question could not be saved. Please try again.')
    }
  }

  return (
    <main className="parent-question-page">
      <a className="create-brand-link" href="#login" aria-label="Math Stars">
        <Brand />
      </a>
      <header className="parent-question-heading">
        <div className="screen-heading-row">
          <h1>Set today&apos;s question</h1>
          <LogoutButton />
        </div>
        <p>Your child will see this question in their dashboard.</p>
      </header>
      <form className="parent-question-form" onSubmit={handleSubmit}>
        <label htmlFor="question-topic">Topic</label>
        <input
          id="question-topic"
          name="topic"
          defaultValue={problem.topic}
          required
        />

        <label htmlFor="question-text">Question</label>
        <textarea
          id="question-text"
          name="question"
          defaultValue={problem.question}
          rows={4}
          required
        />

        <label htmlFor="question-answer">Correct answer</label>
        <input
          id="question-answer"
          name="answer"
          defaultValue={problem.answer}
          required
        />

        <p className="parent-question-hint">
          Hints are optional. The first hint is available to your child; the
          second can be unlocked for one star.
        </p>
        <label htmlFor="question-hint-one">Hint 1</label>
        <textarea
          id="question-hint-one"
          name="hint-one"
          defaultValue={problem.hints[0]}
          rows={2}
        />

        <label htmlFor="question-hint-two">Hint 2</label>
        <textarea
          id="question-hint-two"
          name="hint-two"
          defaultValue={problem.hints[1]}
          rows={2}
        />

        <button className="create-submit-button" type="submit">
          Save question
        </button>
        {notice && (
          <p className="form-notice" role="alert">
            {notice}
          </p>
        )}
      </form>
      <p className="parent-question-return">
        <a href="#login">Back to log in</a>
      </p>
    </main>
  )
}

export default ParentQuestionPage
