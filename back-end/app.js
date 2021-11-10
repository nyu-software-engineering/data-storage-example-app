// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const path = require("path")
const cookieParser = require("cookie-parser") // middleware useful for parsing cookies in requests

// set up some useful middleware
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
app.use(morgan("dev")) // log all incoming requests.  morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies

// the following cors setup is important when working with cookies on your local machine
app.use(cors({ origin: "http://localhost:3002", credentials: true })) // allow incoming requests only from a "trusted" host

// take some data from a post request and save it to a file
app.get("/save-to-file", (req, res) => {
  const name = req.body.name
  const message = req.body.message
  console.log(JSON.stringify(data, null, 2)) // debugging
  res.send("yes")
})

// a route that sends a response including the Set-Cookie header.
app.get("/set-cookie", (req, res) => {
  res
    .cookie("foo", "bar") // send a cookie in the response with the key 'foo' and value 'bar'
    .send({
      success: true,
      message: "Sent a cookie to the browser... hopefully it saved it.",
    })
})

// a route that looks for a Cookie header in the request and sends back whatever data was found in it.
app.get("/get-cookie", (req, res) => {
  const numCookies = Object.keys(req.cookies).length // how many cookies were passed to the server

  console.log(`Incoming cookie data: ${JSON.stringify(req.cookies, null, 0)}`)
  res.send({
    success: numCookies ? true : false,
    message: numCookies
      ? "thanks for sending cookies to the server :)"
      : "no cookies sent to server :(",
    cookieData: req.cookies,
  })
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
