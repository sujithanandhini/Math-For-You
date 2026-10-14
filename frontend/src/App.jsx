import { useEffect, useState } from 'react'
import CreateAccountPage from './pages/CreateAccountPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotebookPage from './pages/NotebookPage.jsx'
import ParentChildAccessPage from './pages/ParentChildAccessPage.jsx'
import ParentHomePage from './pages/ParentHomePage.jsx'
import ParentMarkPage from './pages/ParentMarkPage.jsx'
import ParentPlanPage from './pages/ParentPlanPage.jsx'
import ParentQuestionPage from './pages/ParentQuestionPage.jsx'
import ParentRewardsPage from './pages/ParentRewardsPage.jsx'
import SolvePage from './pages/SolvePage.jsx'
import StarShopPage from './pages/StarShopPage.jsx'
import StarsEarnedPage from './pages/StarsEarnedPage.jsx'
import TodayPage from './pages/TodayPage.jsx'
import './App.css'

function getPageFromHash() {
  if (window.location.hash === '#login') return 'login'
  if (window.location.hash === '#today') return 'today'
  if (window.location.hash === '#solve') return 'solve'
  if (window.location.hash === '#parent-question') return 'parent-question'
  if (window.location.hash === '#notebook') return 'notebook'
  if (window.location.hash === '#shop') return 'shop'
  if (window.location.hash === '#parent-home') return 'parent-home'
  if (window.location.hash === '#parent-child') return 'parent-child'
  if (window.location.hash === '#parent-mark') return 'parent-mark'
  if (window.location.hash === '#parent-plan') return 'parent-plan'
  if (window.location.hash === '#parent-rewards') return 'parent-rewards'
  if (window.location.hash === '#stars-earned') return 'stars-earned'
  return 'create-account'
}

function App() {
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    function updatePage() {
      setPage(getPageFromHash())
    }

    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  if (page === 'today') return <TodayPage />
  if (page === 'solve') return <SolvePage />
  if (page === 'notebook') return <NotebookPage />
  if (page === 'shop') return <StarShopPage />
  if (page === 'parent-home') return <ParentHomePage />
  if (page === 'parent-child') return <ParentChildAccessPage />
  if (page === 'parent-mark') return <ParentMarkPage />
  if (page === 'parent-plan') return <ParentPlanPage />
  if (page === 'parent-rewards') return <ParentRewardsPage />
  if (page === 'stars-earned') return <StarsEarnedPage />
  if (page === 'parent-question') return <ParentQuestionPage />
  if (page === 'login') {
    return <LoginPage
      onChildLogin={() => {
        window.location.hash = '#today'
      }}
      onParentLogin={() => {
        window.location.hash = '#parent-home'
      }}
    />
  }
  return <CreateAccountPage />
}

export default App
