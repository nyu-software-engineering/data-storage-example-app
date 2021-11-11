const { useEffect } = require("react")
const { Navigate } = require("react-router-dom")

const Logout = props => {
  // when this component loads, log out the user
  useEffect(() => {
    localStorage.removeItem("token")
  }, [])

  // navigate the user to the home page after logging them out
  return (
    <>
      <Navigate to="/" />
    </>
  )
}

export default Logout
