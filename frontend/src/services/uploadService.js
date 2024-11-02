// src/services/uploadService.js
import axios from 'axios';

export const uploadMedia = async (file, folder = 'blog') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data.imageUrl; // Assuming response contains { imageUrl: 'path/to/image' }
};
