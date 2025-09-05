import React, { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await axios.post('http://localhost:5000/api/auth/signup', {
      username,
      password,
      role: 'user'
    }, { withCredentials: true });
    alert('Signup successful');
  };

  return (
    <div className="container mt-4">
      <h3>Signup</h3>
      <input className="form-control" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="form-control mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={handleSignup}>Signup</button>
    </div>
  );
}
