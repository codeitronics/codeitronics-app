// src/services/userService.js
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${apiURL}/api/users`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/api/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const response = await axios.put(
      `${apiURL}/api/users/role/${userId}`,
      { role },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiURL}/api/users`, userData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user information
export const updateUser = async (userId, updateData) => {
  try {
    console.log('### updateData 1 = ', updateData);
    const response = await axios.put(`${apiURL}/api/users/${userId}`, updateData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
