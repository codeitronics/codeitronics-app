// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
      `${API_URL}/role/${userId}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
    const response = await axios.post(API_URL, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
    console.log('### updateData 1 = ',updateData);
    const response = await axios.put(`${API_URL}/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
