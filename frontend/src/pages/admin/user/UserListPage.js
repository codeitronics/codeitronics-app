// src/pages/admin/UserListPage.js
import React, { useEffect, useState } from 'react';
import UserList from '../../../components/admin/UserList';
import { fetchUsers, updateUserRole } from '../../../services/userService';
import AdminLayout from '../../../components/admin/AdminLayout';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (newRole === 'delete') {
      if (!window.confirm('Are you sure you want to delete this user?')) return;
      try {
        //await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    } else {
      try {
        await updateUserRole(userId, newRole);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        alert('User role updated successfully');
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Failed to update user role');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <UserList users={users} handleRoleChange={handleRoleChange} />
      </div>
    </AdminLayout>
  );
};

export default UserListPage;
