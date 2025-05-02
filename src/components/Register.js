import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../css/register.css'; // Make sure this file exists

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('api/auth/register', { name,email, password });
    navigate('/login');
  };

  return (
    <div className="login-container">
    <h2 className="login-title">SignUp Your Account</h2>
    <form onSubmit={handleRegister}>
      <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;