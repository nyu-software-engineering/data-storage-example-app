// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const path = require("path")
const cookieParser = require("cookie-parser") // middleware useful for parsing cookies in requests
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// the following are used for authentication with JSON Web Tokens
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info
const jwt = require("jsonwebtoken")
const passport = require("passport")
app.use(passport.initialize()) // tell express to use passport middleware

// load up some mock user data in an array... this would normally come from a database
const users = require("./user_data.js")

// use this JWT strategy within passport for authentication handling
const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// set up some useful middleware
app.use(morgan("dev")) // log all incoming requests.  morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies

// the following cors setup is important when working with cookies on your local machine
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host

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

// a route that is protected... only authenticated users can access it.
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // our jwt passport config will send error responses to unauthenticated users will
    // so we only need to worry about sending data to properly authenticated users!
    res.json({
      success: true,
      message:
        "Congratulations: you have accessed this route because you have a valid JWT token!",
    })
  }
)

// a route to handle a login attempt
app.post("/login", function (req, res) {
  // brab the name and password that were submitted as POST body data
  const username = req.body.username
  const password = req.body.password
  console.log(`${username}, ${password}`)
  if (!username || !password) {
    // no username or password received in the POST body... send an error
    res
      .status(401)
      .json({ success: false, message: `no username or password supplied.` })
  }

  // usually this would be a database call, but here we look for a matching user in our mock data
  const user = users[_.findIndex(users, { username: username })]
  if (!user) {
    // no user found with this name... send an error
    res
      .status(401)
      .json({ success: false, message: `user not found: ${username}.` })
  }

  // assuming we found the user, check the password is correct
  // we would normally encrypt the password the user submitted to check it against an encrypted copy of the user's password we keep in the database... but here we just compare two plain text versions for simplicity
  if (req.body.password == user.password) {
    // the password the user entered matches the password in our "database" (mock data in this case)
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = { id: user.id } // some data we'll encode into the token
    const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
    res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
  } else {
    // the password did not match
    res.status(401).json({ success: false, message: "passwords did not match" })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
