// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/public/home/HomePage';
import BlogList from './pages/public/blog/BlogListPage';
import BlogDetail from './pages/public/blog/BlogDetailPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import UserListPage from './pages/admin/user/UserListPage';
import DashboardPage from './pages/admin/DashboardPage';
import BlogViewPage from './pages/admin/blog/BlogViewPage';
import BlogCreatePage from './pages/admin/blog/BlogCreatePage';
import BlogListPage from './pages/admin/blog/BlogListPage';
import EditBlogPage from './pages/admin/blog/EditBlogPage';
import UserPage from './pages/admin/user/UserPage'; // Import the UserPage component
import AdminSettingsPage from './pages/admin/company/AdminSettingsPage';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:urlSlug" element={<BlogDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Admin Pages */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<UserListPage />} /> {/* User List Page */}
          <Route path="/admin/users/new" element={<UserPage />} /> {/* Create New User */}
          <Route path="/admin/users/edit/:userId" element={<UserPage />} /> {/* Edit User */}

          <Route path="/admin/blogs" element={<BlogListPage />} />
          <Route path="/admin/blog/view/:id" element={<BlogViewPage />} />
        <Route path="/admin/blog/create" element={<BlogCreatePage />} />
        <Route path="/admin/blog/edit/:id" element={<EditBlogPage />} />

        <Route path="/admin/company-settings" element={<AdminSettingsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
