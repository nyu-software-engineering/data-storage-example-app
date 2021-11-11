import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const Protected = props => {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // let's assume the user is not logged in until proven otherwise

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`${process.env.REACT_APP_BACKEND}/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` },
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
  }, [])

  return (
    <>
      {isLoggedIn ? (
        <>
          <h2>Protected content!</h2>
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
