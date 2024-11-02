// src/services/blogService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/blogs';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all blog posts
/*export const fetchAllBlogs = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};*/

// Get a blog post by ID
export const getBlogById = async (blogId) => {
  const response = await axios.get(`${API_URL}/${blogId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Other CRUD functions...

export const createBlogPost = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteBlogPost = async (blogId) => {
  const response = await axios.delete(`${API_URL}/${blogId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateBlogPost = async (blogId, formData) => {
  const response = await axios.put(`${API_URL}/update/${blogId}`, formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Fetch blog by URL slug
export const getBlogBySlug = async (urlSlug) => {
  const response = await axios.get(`${API_URL}/slug/${urlSlug}`);
  return response.data;
};

// Fetch all blog posts
export const fetchAllBlogs = async () => {
  const response = await axios.get(API_URL,);
  return response.data;
};