// set the app NODE_ENV environment variable to 'test' in case the app is set up to alter its behavior in such case
// in our case, the morgan logging module is turned off when this is set to 'test'
process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

// import the server
const server = require("../app")

// a group of tests related to the /protected route
describe("Protected", () => {
  /**
   * test the GET /protected route
   */
  describe("GET /protected when not logged in", () => {
    // test a protected route when not logged in... passport auth should send back a 401 HTTP error
    it("it should return a 401 HTTP response code", done => {
      chai
        .request(server)
        .get("/protected")
        .end((err, res) => {
          res.should.have.status(401) // use 'should' to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the GET /protected route when logged in
   */
  describe("GET /protected when logged in", () => {
    // test a protected route when logged in... passport auth should allow it

    // let's first create a valid JWT token to use in the requests where we want to be logged in
    const jwt = require("jsonwebtoken")
    const User = require("../models/User")
    const user = new User({ username: "test", password: "test" })
    const token = user.generateJWT()

    it("it should return a 200 HTTP response code", done => {
      chai
        .request(server)
        .get("/protected")
        .set("Authorization", `JWT ${token}`) // set JWT authentication headers to simulate a logged-in user, using the token we created at top
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an object with specific properties", done => {
      chai
        .request(server)
        .get("/protected")
        .set("Authorization", `JWT ${token}`) // set JWT authentication headers to simulate a logged-in user, using the token we created at top
        .end((err, res) => {
          res.body.should.be.a("object") // our route sends back an object
          // res.body.should.have.property("success")
          // res.body.should.have.property("user")
          // res.body.should.have.property("message")
          res.body.should.have.keys("success", "user", "message") // a way to test the presence of an exact set of keys in the response object
          expect(res.body).to.have.deep.property("user.id", 1) // check for exact value of a nested value
          expect(res.body).to.have.deep.property("user.username") // check for existence of a nested value

          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})
