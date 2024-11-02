// src/pages/UserPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../../../components/admin/UserForm';
import { getUserById, createUser, updateUser } from '../../../services/userService';
import AdminLayout from '../../../components/admin/AdminLayout';


const UserPage = () => {
  const { userId } = useParams(); // Get user ID from URL parameters (if editing)
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If editing, fetch user data
    if (userId) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(userId);
          setUserData(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (formData) => {
    try {
      if (userId) {
        console.log('### formData 2 = ',formData);
        await updateUser(userId, formData); // Update user if userId is present
      } else {
        await createUser(formData); // Create new user if no userId
      }
      navigate('/admin/users'); // Navigate to user list page after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <AdminLayout>
    <div className="max-w-3xl mx-auto py-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            {userId ? 'Edit User' : 'Create New User'}
          </h2>
          <UserForm initialData={userData} handleSubmit={handleSubmit} />
        </div>
    </AdminLayout>
    
  );
};

export default UserPage;
