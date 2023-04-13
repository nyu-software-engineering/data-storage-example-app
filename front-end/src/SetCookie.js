import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie" // a useful module for handling cookies in the browser

const SetCookie = props => {
  // start a state varaible with a blank object... this will be replaced with the data sent by the server in the response body
  const [response, setResponse] = useState({}) // will hold a JSON object returned by the server
  const [cookieData, setCookieData] = useState({}) // will hold any cookies set in the browser

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // make a request to a route on the express server that sets a cookie in the browser
    axios(`${process.env.REACT_APP_BACKEND}/cookie/set`, {
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

  // any time the response state variable changes value, we retrieve the cookie and place it into its own state variable so it appears in the JSX of the component
  useEffect(() => {
    // copy the cookie data into a state variable (so react auto-inserts it into the JSX)
    setCookieData(Cookies.get())
  }, [response])

  return (
    <>
      <h2>Set a Cookie</h2>
      <p>
        This component makes a request to a server route that sends a
        <code>Set-Cookie</code> header in its response.
      </p>
      {response.success ? (
        <>
          <p>
            Response received from the server:
            <code>{JSON.stringify(response, null, 2)}</code>
          </p>
          <p>
            Cookie data now stored in the browser:
            <code>{JSON.stringify(cookieData, null, 2)}</code>. These cookies
            will be sent from the browser to the server with every subsequent
            request.
          </p>
          <p>
            <Link to="/get-cookie">
              Try sending another request to the server with the cookie in the
              request headers.
            </Link>
            !
          </p>
          <p>
            To debug, pop open your Browser's Developer Tools, open the Network
            tab, and reload any page of the app - if you inspect the Request
            Headers, you will see that the client is sending a{" "}
            <code>Cookie</code> header with every subsequent request.
          </p>
        </>
      ) : (
        <p>`Waiting for the server response...`</p>
      )}
    </>
  )
}

export default SetCookie
