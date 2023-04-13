import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
// import logo from './logo.svg';
import "./Login.css"

const Signup = props => {
  let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters

  // create state variables to hold username and password
  const [response, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("")

  // if the user's logged-in status changes, save the token we receive from the server
  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`)
      localStorage.setItem("token", response.token) // store the token into localStorage
    }
  }, [response])

  // what to do when the user clicks the submit buton on the form
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      }
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/signup`,
        requestData
      )
      // store the response data into s the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`)
      setResponse(response.data)
    } catch (err) {
      // request failed... user entered invalid credentials
      setErrorMessage(
        "The username or password you entered are not valid.  Try harder! "
      )
    }
  }

  // if the user is not logged in, show the signup form
  if (!response.success)
    return (
      <div className="Signup">
        <h1>Sign up</h1>
        <p>Register an account to access protected content!</p>
        {errorMessage ? <p className="error">{errorMessage}</p> : ""}
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
            <input type="submit" value="Create account" />
          </form>
          <p>
            Already have an account? <Link to="/login">Log in</Link>!
          </p>
        </section>
      </div>
    )
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
  else return <Navigate to="/" />
}

export default Signup
