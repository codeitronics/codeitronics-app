// src/services/companyService.js
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URI;

export const fetchCompanyInfo = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${apiURL}/api/company`, {
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
  const response = await axios.put(`${apiURL}/api/company`, formData, config);
  return response.data;
};
