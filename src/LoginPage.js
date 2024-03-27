import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the password is correct
    if (password === '12345678') {
      // Update the parent component (App.js) that the user is logged in
      onLogin();
      localStorage.setItem('userEmail', email);
      // Navigate to the next page
      navigate('/nextpage');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default LoginPage;
