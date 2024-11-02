// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { login } from '../../services/authService';
import Layout from '../../components/public/common/Layout';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const { rememberMe, ...loginData } = credentials;
      const response = await login(loginData);

      // Store token and username
      if (rememberMe) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
      }

      alert('Login successful');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Layout>
      <LoginForm handleLogin={handleLogin} />
    </Layout>
  );
};

export default LoginPage;
