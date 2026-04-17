import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
// useAuth gives this component access to the shared auth context.
import { useAuth } from './AuthContext'

const Logout = props => {
  // Pull the logout() function out of the context.  Calling it will set the
  // shared token to null, which causes any component reading isLoggedIn to
  // re-render and reflect the logged-out state immediately.
  const { logout } = useAuth()

  // when this component loads, log out the user
  useEffect(() => {
    // logout() clears the token from both React context state and localStorage
    logout()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // navigate the user to the home page after logging them out
  return (
    <>
      <Navigate to="/" />
    </>
  )
}

export default Logout
