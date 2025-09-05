import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password
    }, { withCredentials: true });
    onLogin(res.data.role);
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      <input className="form-control" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="form-control mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success mt-2" onClick={handleLogin}>Login</button>
    </div>
  );
}
