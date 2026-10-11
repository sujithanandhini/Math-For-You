import { useEffect, useState } from 'react'
import CreateAccountPage from './pages/CreateAccountPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import './App.css'

function App() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(
    window.location.hash !== '#login',
  )

  useEffect(() => {
    function updatePage() {
      setIsCreatingAccount(window.location.hash !== '#login')
    }

    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  return isCreatingAccount ? <CreateAccountPage /> : <LoginPage />
}

export default App
