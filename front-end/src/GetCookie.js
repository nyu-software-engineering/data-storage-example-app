import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const GetCookie = props => {
  // start a state varaible with a blank object... this will be replaced with the data sent by the server in the response body
  const [response, setResponse] = useState({}) // will hold a JSON object returned by the server

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // make a request to a route on the express server that sets a cookie in the browser
    axios(`${process.env.REACT_APP_BACKEND}/cookie/get`, {
      withCredentials: true,
    })
      .then(response => {
        // extract the data from the server response body
        setResponse(response.data)
      })
      .catch(err => {
        console.error(err) // the server returned an error...
      })
  }, []) // only run this side-effect function once!

  return (
    <>
      <h2>Get a Cookie</h2>
      <p>
        This component makes a request to a server route that looks for a
        <code>Cookies</code> header in the request.
      </p>
      {response.success ? (
        <>
          <p>
            Response body:
            <code>{JSON.stringify(response, null, 2)}</code>
          </p>
          <p>
            Pop open your Browser's Developer Tools, open the Network tab, and
            reload any page of the app - if you inspect the Request Headers, you
            will see that the client is sending a <code>Cookie</code> header
            with every subsequent request.
          </p>
        </>
      ) : (
        <p>
          No cookies have been received by the server. Try to{" "}
          <Link to="/set-cookie">set a cookie first</Link>
        </p>
      )}
    </>
  )
}

export default GetCookie
