import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">HabitHut</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        {!token && <Link to="/login" className="hover:underline">Login</Link>}
        {!token && <Link to="/register" className="hover:underline">Register</Link>}
        {token && <button className="hover:underline" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
