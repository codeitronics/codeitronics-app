// src/components/admin/UserList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, handleRoleChange }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white bg-clip-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">User List</h3>
              <p className="text-slate-500">Manage all registered users</p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => navigate('/admin/users/new')}
            >
              Create New User
            </button>
          </div>
        </div>

        <div className="overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Username
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Email
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Role
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 border-b border-slate-200 text-sm font-medium text-slate-700">
                    {user.username}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm text-slate-500">
                    {user.email}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm">
                    <select
                      className="p-2 border border-gray-300 rounded"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                        className="text-green-500 hover:underline text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, 'delete')}
                        className="text-red-500 hover:underline text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
