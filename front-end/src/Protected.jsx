import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
// useAuth gives this component access to the shared auth context.
import { useAuth } from './AuthContext'

const Protected = props => {
  // Reading isLoggedIn and token from context instead of localStorage means
  // this component automatically re-renders whenever login or logout is called
  // anywhere in the app — no props need to be passed down from a parent.
  const { isLoggedIn, token, logout } = useAuth()
  console.log(`JWT token: ${token}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`${import.meta.env.VITE_BACKEND}/protected/`, {
        headers: { Authorization: `JWT ${token}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          'The server rejected the request for this protected resource... we probably do not have a valid JWT token.',
        )
        // Calling logout() sets the shared context token to null.  Because
        // isLoggedIn is derived from that token, this component re-renders and
        // the conditional below will show <Navigate> instead of the content.
        logout()
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoggedIn ? (
        <>
          <h2>
            Protected content
            {response.user && ` only for you, ${response.user.username}`}!
          </h2>
          {response.message ? <p>{response.message}</p> : <>loading...</>}
          <p>
            Only authenticated users are allowed to view this page! The server
            will reject requests for the data displayed on this page unless the
            request includes a valid JWT token.
          </p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </>
      ) : (
        <Navigate to="/login?error=protected" />
      )}
    </>
  )
}

export default Protected
