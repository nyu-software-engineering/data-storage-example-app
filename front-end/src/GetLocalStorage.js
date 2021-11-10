import { Link } from "react-router-dom"
import { useState } from "react"

const GetLocalStorage = props => {
  const [data, setData] = useState({}) // a state variable to hold the data placed into localStorage

  const handleClick = e => {
    // retrieve the data from localStorage
    const serializedObj = localStorage.getItem("foo") // get the serialized JSON string version of the data from localStorage
    if (serializedObj) {
      const obj = JSON.parse(serializedObj) // create a proper object from the JSON string
      setData(obj)
    }
  }

  return (
    <>
      <h2>Get LocalStorage Data</h2>

      <button onClick={handleClick}>
        Click to retrieve some data from the browser's localStorage
      </button>
      {Object.keys(data).length ? (
        <>
          <p>The data retrieved from localStorage:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <p>
          Nothing retrieved yet. Click the button above to try, or{" "}
          <Link to="/set-local-storage">create some data in LocalStorage</Link>{" "}
          first.
        </p>
      )}
    </>
  )
}

export default GetLocalStorage
