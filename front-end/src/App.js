import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Footer from "./Footer"
import Home from "./Home"
import SetCookie from "./SetCookie"
import GetCookie from "./GetCookie"
import SetLocalStorage from "./SetLocalStorage"
import GetLocalStorage from "./GetLocalStorage"
import Signup from "./Signup"
import Login from "./Login"
import Logout from "./Logout"
import Protected from "./Protected"

const App = props => {
  return (
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
  )
}

export default App
