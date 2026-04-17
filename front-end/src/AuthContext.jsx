// React Context lets any component in the tree read shared state without having
// it passed down manually through props at every level ("prop drilling").
// This file sets up a single source of truth for the user's login status.
import { createContext, useContext, useState } from 'react'

// createContext() creates the context object.  The argument (null) is just the
// default value used when a component tries to read the context but is NOT
// inside an AuthProvider — in practice that shouldn't happen in this app.
const AuthContext = createContext(null)

// AuthProvider is a regular React component that wraps part of the component
// tree.  Any component rendered inside <AuthProvider> can read the values
// listed in the `value` prop below, no matter how deeply nested it is.
// `children` refers to whatever JSX is placed between <AuthProvider> and
// </AuthProvider> — in App.jsx that is the entire app.
export const AuthProvider = ({ children }) => {
  // initialize token from localStorage so login status survives page refreshes
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Derive a plain boolean from the token: !! converts any truthy value to true
  // and any falsy value (null, undefined, '') to false.
  const isLoggedIn = !!token

  // login() is called after the server confirms valid credentials and returns a
  // JWT token.  We save it in both React state (so components re-render) and
  // localStorage (so it persists if the user refreshes the page).
  const login = newToken => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  // logout() clears the token from both places.  Setting state to null causes
  // any component reading isLoggedIn from this context to re-render immediately.
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  // AuthContext.Provider is the component that actually makes the values
  // available to descendants.  The `value` prop is the object that consuming
  // components will receive when they call useAuth() (see below).
  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuth is a custom hook that wraps useContext(AuthContext).  Exporting it
// means other components only need to import { useAuth } rather than importing
// both useContext and AuthContext separately.
export const useAuth = () => useContext(AuthContext)

export default AuthContext
