// src/pages/RegisterPage.js
import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import { register } from '../../services/authService';
import Layout from '../../components/public/common/Layout';

const RegisterPage = () => {
  const handleRegister = async (formData) => {
    try {
      await register(formData);
      alert('Registration successful');
      // Redirect to login page or set auth state here
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
  <Layout>
    <RegisterForm handleRegister={handleRegister} />
    </Layout>
  );
};

export default RegisterPage;
