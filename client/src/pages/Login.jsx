import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login({ email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="mb-4 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
        <div className="mt-2 text-sm">
          Don't have an account? <a className="text-blue-600 underline" href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
