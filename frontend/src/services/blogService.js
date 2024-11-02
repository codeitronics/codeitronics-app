// src/services/blogService.js
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllBlogs = async () => {
  const response = await axios.get(`${apiURL}/api/blogs`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getBlogById = async (blogId) => {
  const response = await axios.get(`${apiURL}/api/blogs/${blogId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createBlogPost = async (formData) => {
  const response = await axios.post(`${apiURL}/api/blogs/create`, formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteBlogPost = async (blogId) => {
  const response = await axios.delete(`${apiURL}/api/blogs/${blogId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateBlogPost = async (blogId, formData) => {
  const response = await axios.put(`${apiURL}/api/blogs/update/${blogId}`, formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getBlogBySlug = async (urlSlug) => {
  const response = await axios.get(`${apiURL}/api/blogs/slug/${urlSlug}`);
  return response.data;
};
