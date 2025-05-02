import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Xian Client Portal</div>

      {isLoggedIn ? (
        <button onClick={handleLogout} className="nav-link">Logout</button>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
      {!isLoggedIn && (
        <Link to="/register" className="nav-link">Sign Up</Link>
      )}
    </nav>
  );
};

export default Navbar;
