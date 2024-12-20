// set the app NODE_ENV environment variable to 'test' in case the app is set up to alter its behavior in such case
// in our case, the morgan logging module is turned off when this is set to 'test'
process.env.NODE_ENV = 'test'

// include the testing dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

// import the server
const server = require('../server')
const User = require('../models/User')

// a group of tests related to the /protected route
describe('Login', () => {
  // clean up by destroying the server when done
  after(() => {
    server.close()
  })

  /**
   * test the POST /login route
   */
  const formData = { username: 'bla', password: 'wrong' } // mock form data with incorrect credentials
  describe('POST /auth/login with incorrect username/password', () => {
    it('it should return a 401 HTTP response code', done => {
      chai
        .request(server.app)
        .post('/auth/login')
        .type('form')
        .send(formData)
        .end((err, res) => {
          res.should.have.status(401) // use 'should' to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  describe('POST /auth/login with correct username/password', () => {
    // establish a pseudo-random test username
    let mockUserCredentials = {
      username: `foo-${Math.random()}`, // randomish username
      password: 'bar',
    }
    let mockUser

    // create test user before tests
    beforeEach(done => {
      mockUser = new User(mockUserCredentials).save().then(() => done())
    })

    // delete test user after tests
    afterEach(done => {
      // delete the test user
      User.remove({ _id: mockUser._id }).then(() => done())
    })

    const formData = mockUserCredentials // mock form data with correct credentials for test user

    it('it should return a 200 HTTP response code', done => {
      chai
        .request(server.app)
        .post('/auth/login')
        .type('form')
        .send(formData)
        .end((err, res) => {
          res.should.have.status(200) // use 'should' to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})
