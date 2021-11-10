import { Link } from "react-router-dom"
import "./Header.css"

const Header = props => {
  return (
    <header className="Header">
      <h1>Data Storage Examples</h1>
      <nav class="navigation">
        <ul>
          <li>
            <Link to="/set-cookie">set cookie</Link>
          </li>
          <li>
            <Link to="/get-cookie">get cookie</Link>
          </li>
          <li>
            <Link to="/set-local-storage">set local storage</Link>
          </li>
          <li>
            <Link to="/get-local-storage">get local storage</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
