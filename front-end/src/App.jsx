import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// AuthProvider makes login state available to every component inside it.
// Any component in the tree can call useAuth() to read or update that state.
import { AuthProvider } from './AuthContext'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import SetCookie from './SetCookie'
import GetCookie from './GetCookie'
import SetLocalStorage from './SetLocalStorage'
import GetLocalStorage from './GetLocalStorage'
import Signup from './Signup'
import Login from './Login'
import Logout from './Logout'
import Protected from './Protected'

console.log(`Back-end assumed to be at ${import.meta.env.VITE_BACKEND}`)

const App = props => {
  return (
    // Wrapping the whole app in AuthProvider means every route below can access
    // auth state via useAuth() without receiving it as a prop from App.
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/set-cookie" element={<SetCookie />} />
            <Route path="/get-cookie" element={<GetCookie />} />
            <Route path="/set-local-storage" element={<SetLocalStorage />} />
            <Route path="/get-local-storage" element={<GetLocalStorage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/protected" element={<Protected />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
