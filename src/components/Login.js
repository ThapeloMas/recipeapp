import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(
          `http://localhost:5000/users?email=${email}&password=${password}`
        );
        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem(
            "user",
            JSON.stringify({ id: user.id, email: user.email })
          );
          navigate("/home");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
