import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const Protected = props => {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`${process.env.REACT_APP_BACKEND}/protected/`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
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
