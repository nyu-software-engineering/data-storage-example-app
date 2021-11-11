import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
// import logo from './logo.svg';
import "./Login.css"

const Login = props => {
  // create state variables to hold username and password
  const [response, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("")

  // if the user's logged-in status changes, save the token we receive from the user
  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`)
      localStorage.setItem("token", response.token) // store the token into localStorage
    }
  }, [response])

  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      }
      // send the request to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/login`,
        requestData
      )
      // store the response data into the data state variable
      console.log(response.data)
      setResponse(response.data)
    } catch (err) {
      // request failed... user entered invalid credentials
      setErrorMessage(
        "You entered invalid credentials.  Try harder!  Check out the usernames in the server's user_data.js file."
      )
    }
  }

  // if the user is not logged in, show the login form
  if (!response.success)
    return (
      <div className="Login">
        <h1>Log in</h1>
        {errorMessage ? <p class="error">{errorMessage}</p> : ""}
        <section className="main-content">
          <form onSubmit={handleSubmit}>
            {
              //handle error condition
            }
            <label>Username: </label>
            <input type="text" name="username" placeholder="username" />
            <br />
            <br />
            <label>Password: </label>
            <input type="password" name="password" placeholder="password" />
            <br />
            <br />
            <input type="submit" value="Log In" />
          </form>
        </section>
      </div>
    )
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
  else return <Navigate to="/protected" />
}

export default Login
