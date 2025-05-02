import axios from 'axios';

export default axios.create({
  baseURL: 'https://xianclientportal-backend.onrender.com/api',
  withCredentials: true,
});

