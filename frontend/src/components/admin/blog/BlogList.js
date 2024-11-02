// src/components/admin/BlogList.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white bg-clip-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Blog List</h3>
              <p className="text-slate-500">Manage all blog posts</p>
            </div>
          </div>
        </div>

        <div className="overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Title
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Category
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Created Date
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Status
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="p-4 border-b border-slate-200 text-sm font-medium text-slate-700">
                    {blog.title}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm text-slate-500">
                    {blog.category}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm text-slate-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm">
                    <span
                      className={`px-2 py-1 rounded-md font-bold text-xs uppercase ${
                        blog.status === 'Published'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onEdit(blog._id)}
                        className="text-blue-500 hover:underline text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <Link
                        to={`/admin/blog/view/${blog._id}`}
                        className="text-indigo-500 hover:underline text-xs font-semibold"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => onDelete(blog._id)}
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

export default BlogList;
