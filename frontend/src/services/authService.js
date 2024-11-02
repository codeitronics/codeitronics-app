// src/services/authService.js
import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('http://localhost:3000/api/users/login', credentials);

  // Store both token and username in localStorage
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('username', response.data.username);

  return response.data;
};

export const register = async (formData) => {
  return await axios.post('http://localhost:3000/api/users/register', formData);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
