// set the app NODE_ENV environment variable to 'test' in case the app is set up to alter its behavior in such case
// process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const should = chai.should() // the assertion library

// import the server
const server = require("../server")

// a group of tests related to the /protected route
describe("Protected", () => {
  beforeEach(done => {
    // here we can write any code we want run before each test starts
    // typically, this space is used to delete any artifacts leftover from previous tests
    // so we can start each test from a clean slate
    done() // tell the test fromework we're done with this setup and it will move on
  })

  /**
   * test the GET /protected route
   */
  describe("GET /protected", () => {
    // test a protected route when not logged in
    it("it should return a 401 response code", done => {
      chai
        .request(server)
        .get("/protected")
        .end((err, res) => {
          res.should.have.status(401) // use should to make BDD-style assertions
          res.body.should.be.a("object") // our route sends back a simple object with { success: false }
          res.response.body.should.have.property("success")
          done() // resolve the promise that these tests create
        })
    })
  })
  // More test...
})
