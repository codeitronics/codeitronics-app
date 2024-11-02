// src/services/companyService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/company';

export const fetchCompanyInfo = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateCompanyInfo = async (formData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_URL, formData, config);
  return response.data;
};
