import React, { useState } from 'react';
import { api } from '../services/api';

export default function AuthForm({ onLogin }) {
  const [mode, setMode] = useState('login'); // or 'signup'
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const path = mode === 'login' ? '/auth/login' : '/auth/signup';
    const payload = mode === 'login'
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    try {
      const res = await api.post(path, payload);
      if (mode === 'login') {
        onLogin(res.data.role);
      } else {
        alert('Signup successful! Please log in.');
        setMode('login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '320px' }}>
        <h5 className="card-title text-center mb-3">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              className="form-control mb-2"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            className="form-control mb-2"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-3">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button className="btn btn-link p-0" onClick={() => setMode('signup')}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have one?{' '}
              <button className="btn btn-link p-0" onClick={() => setMode('login')}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
