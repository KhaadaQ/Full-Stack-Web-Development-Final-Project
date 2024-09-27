import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to our app</h1>
      <p>Login or register if you still don't have an account</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage