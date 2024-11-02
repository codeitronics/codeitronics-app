// src/components/admin/CompanyForm.js
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const CompanyForm = ({ initialData, onSubmit }) => {
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(!initialData); // Start in edit mode if no initial data
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    tagline: initialData?.tagline || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    address: initialData?.address || '',
    logo: initialData?.logo || null,
    images: initialData?.images || [],
    timezone: initialData?.timezone || '',
    language: initialData?.language || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    socialLinks: initialData?.socialLinks || {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'images' ? Array.from(files) : files[0]
    }));
  };

  const handleEditorChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsEditMode(false); // Exit edit mode after saving
  };

  return (
    <div className="relative">
      {!isEditMode && (
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-blue-600 hover:underline"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
      )}
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">Company Profile</h2>
          <p className="mt-1 text-sm text-gray-600">
            {isEditMode ? 'Update company details that will be displayed publicly.' : 'Company information'}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Company Name */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">Company Name</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="Enter company name"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.name}</p>
              )}
            </div>

            {/* Tagline */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">Tagline</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="Enter tagline"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.tagline}</p>
              )}
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">Description</label>
              {isEditMode ? (
                <JoditEditor
                  ref={editor}
                  value={formData.description}
                  tabIndex={1}
                  onBlur={(newContent) => handleEditorChange('description', newContent)}
                />
              ) : (
                <p className="mt-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData.description }} ></p>
              )}
            </div>

            {/* Short Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">Short Description</label>
              {isEditMode ? (
                <JoditEditor
                  ref={editor}
                  value={formData.shortDescription}
                  tabIndex={1}
                  onBlur={(newContent) => handleEditorChange('shortDescription', newContent)}
                />
              ) : (
                <p className="mt-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData.shortDescription }} ></p>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-900">Address</label>
              {isEditMode ? (
                <JoditEditor
                  ref={editor}
                  value={formData.address}
                  tabIndex={1}
                  onBlur={(newContent) => handleEditorChange('address', newContent)}
                />
              ) : (
                <p className="mt-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData.address }} ></p>

              )}
            </div>

            {/* Logo */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">Logo</label>
              {isEditMode ? (
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              ) : (
                formData.logo && <img src={formData.logo} alt="Company Logo" className="mt-2 h-16" />
              )}
            </div>

            {/* Additional Images */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">Additional Images</label>
              {isEditMode ? (
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              ) : (
                formData.images.map((image, index) => (
                  <img key={index} src={image} alt="Company" className="mt-2 h-16 inline-block mr-2" />
                ))
              )}
            </div>

            {/* Other Fields like timezone, language, phone, email */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-900">Timezone</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="e.g., UTC+5:30"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.timezone}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-900">Language</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="e.g., English"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.language}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-900">Phone</label>
              {isEditMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="Company phone"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.phone}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-900">Email</label>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="Company email"
                />
              ) : (
                <p className="mt-2 text-gray-700">{formData.email}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">Social Links</label>
              <div className="mt-2 grid grid-cols-1 gap-y-4 sm:grid-cols-4 sm:gap-x-4">
                {Object.keys(formData.socialLinks).map((platform) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-900 capitalize">
                      {platform}
                    </label>
                    {isEditMode ? (
                      <input
                        type="text"
                        name={`socialLinks.${platform}`}
                        value={formData.socialLinks[platform]}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            socialLinks: { ...prevData.socialLinks, [platform]: e.target.value }
                          }))
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        placeholder={`${platform} URL`}
                      />
                    ) : (
                      <p className="mt-2 text-gray-700">{formData.socialLinks[platform]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        {isEditMode && (
          <div className="mt-6 flex justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold text-gray-900" onClick={() => setIsEditMode(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CompanyForm;
