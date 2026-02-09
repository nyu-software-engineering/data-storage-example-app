import { useState, useEffect } from 'react'

const SetLocalStorage = props => {
  const [data, setData] = useState('') // a state variable that will be used to show the data in LocalStorage

  // when this component first renders, show any data in LocalStorage
  useEffect(() => {
    setData(localStorage.getItem('foo')) // put any LocalStorage data into a state variable so the interface shows it
  }, [])

  // what to do when the user clicks to put some data in LocalStorage
  const handleCreate = e => {
    // create an object with some data in it
    const obj = {
      hello: 'world',
      message:
        'This is some structured data that we will store in localStorage as a string',
    }

    // save an object as a string into the browser's localStorage
    const serializedObj = JSON.stringify(obj, null, 0) // a JSON string representation of the object
    localStorage.setItem('foo', serializedObj) // store it with the key, foo
    setData(localStorage.getItem('foo')) // put the data into a state variable so the interface shows it
  }

  // what to do when the user clicks to delete the data in LocalStorage
  const handleDelete = e => {
    localStorage.removeItem('foo')
    setData(localStorage.getItem('foo'))
  }

  return (
    <>
      <h2>Set LocalStorage Data</h2>

      <button onClick={handleCreate}>
        Click to save some data to the browser's localStorage
      </button>
      {data ? (
        <>
          <p>
            Data saved to LocalStorage: <code>{data}</code>
            <button onClick={handleDelete}>Delete</button>
          </p>
        </>
      ) : (
        <p>Nothing saved yet.</p>
      )}
    </>
  )
}

export default SetLocalStorage
