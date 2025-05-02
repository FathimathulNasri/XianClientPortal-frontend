import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Make sure this file exists

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/auth/login', { email, password });

      // Save the token to localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate based on role
      res.data.existingUser.role === 'admin'
        ? navigate('/admin')
        : navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
