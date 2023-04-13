const express = require("express") // CommonJS import style!

// a method that constains code to handle cookie-related routes
const cookieRouter = () => {
  // create a new router that we can customize
  const router = express.Router()

  // a route that sends a response including the Set-Cookie header.
  router.get("/set", (req, res) => {
    res
      .cookie("foo", "bar") // send a cookie in the response with the key 'foo' and value 'bar'
      .send({
        success: true,
        message: "Sent a cookie to the browser... hopefully it saved it.",
      })
  })

  // a route that looks for a Cookie header in the request and sends back whatever data was found in it.
  router.get("/get", (req, res) => {
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

  return router
}

// export the router
module.exports = cookieRouter
