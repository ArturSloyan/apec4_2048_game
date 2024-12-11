import React, { useState } from 'react';
import './Login.css';

async function postLogin(username, password) {
  console.log("func post login");
  return await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const response = await postLogin(username, password);
    
    if (response.ok) {
      console.log('Login successful');
      // Handle success (e.g., redirect user, show a success message, etc.)
    } else {
      console.error('Login failed');
      // Handle errors appropriately (e.g., show error message)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}