import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const res = await register({ username, email, password });
    if (res.message) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">Registration successful! Redirecting...</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 w-full"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
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
          <button className="btn-primary w-full" type="submit">Register</button>
        </form>
        <div className="mt-2 text-sm">
          Already have an account? <a className="text-blue-600 underline" href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
