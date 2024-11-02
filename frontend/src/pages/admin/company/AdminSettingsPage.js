// src/pages/admin/AdminSettingsPage.js
import React, { useEffect, useState } from 'react';
import { fetchCompanyInfo, updateCompanyInfo } from '../../../services/companyService';
import CompanyForm from '../../../components/admin/CompanyForm';
import AdminLayout from '../../../components/admin/AdminLayout';


const AdminSettingsPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const data = await fetchCompanyInfo();
        setFormData(data || {}); // Initialize as empty if null
      } catch (error) {
        console.error('Failed to load company info:', error);
        setFormData({});
      } finally {
        setLoading(false);
      }
    };
    loadCompanyInfo();
  }, []);

  const handleFormSubmit = async (updatedData) => {
    try {
      const updatedInfo = await updateCompanyInfo(updatedData);
      setFormData(updatedInfo);
      alert('Company information updated successfully');
    } catch (error) {
      console.error('Failed to update company info:', error);
      alert('Error updating company information');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Settings</h1>
      <CompanyForm initialData={formData} onSubmit={handleFormSubmit} />
    </div>
    </AdminLayout>
    
  );
};

export default AdminSettingsPage;
