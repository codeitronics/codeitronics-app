// src/services/authService.js
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URI;

export const login = async (credentials) => {
  const response = await axios.post(`${apiURL}/api/users/login`, credentials);

  // Store both token and username in localStorage
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('username', response.data.username);
  localStorage.setItem('role', response.data.role);
  localStorage.setItem('userinfo', response.data.userinfo);

  return response.data;
};

export const register = async (formData) => {
  return await axios.post(`${apiURL}/api/users/register`, formData);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
