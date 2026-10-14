import { clearAuthSession } from '../data/account.js'

function LogoutButton() {
  return (
    <a
      className="logout-button"
      href="#login"
      onClick={clearAuthSession}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" />
      </svg>
      Log out
    </a>
  )
}

export default LogoutButton
