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

// a group of tests related to the /logout route
describe("Set cookie", () => {
  /**
   * test the GET /set-cookie route
   */
  const cookieData = "foo=bar" // mock cookie data
  describe("GET /cookie/set", () => {
    it("it should return a 200 HTTP response code", done => {
      chai
        .request(server)
        .get("/cookie/set")
        .end((err, res) => {
          res.should.have.status(200) // use 'should' to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an object with specific properties", done => {
      // logging out is really not a server-side issue when using JWT authentication
      // nevertheless, including this for example
      chai
        .request(server)
        .get("/cookie/set")
        .end((err, res) => {
          res.body.should.be.a("object") // our route sends back an object
          res.body.should.have.keys("success", "message") // a way to test the presence of an exact set of keys in the response object
          res.body.should.have.property("success", true) // a way to check the exact value of a property of the response object
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
    it("it should return a Set-Cookie header", done => {
      // logging out is really not a server-side issue when using JWT authentication
      // nevertheless, including this for example
      chai
        .request(server)
        .get("/cookie/set")
        .end((err, res) => {
          const [expectedKey, expectedValue] = cookieData.split("=") // get the expected cookie key/value pair
          expect(res).to.have.cookie(expectedKey, expectedValue) // check for expected cookie header key/value pair
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})
