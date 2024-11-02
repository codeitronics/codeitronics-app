import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, handleSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profilePicture: '',
    role: 'user',
    password: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  });
  const [isEditMode, setIsEditMode] = useState(!initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        socialLinks: {
          ...formData.socialLinks,
          ...initialData.socialLinks,
        },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('### formData 1 = ',formData);
    handleSubmit(formData);
    setIsEditMode(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      {!isEditMode && (
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-blue-600 hover:underline"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="font-bold text-sm text-gray-900">First Name</label>
            {isEditMode ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-bold text-sm text-gray-900">Last Name</label>
            {isEditMode ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.lastName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="font-bold text-sm text-gray-900">Username</label>
            {isEditMode ? (
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-bold text-sm text-gray-900">Email</label>
            {isEditMode ? (
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-bold text-sm text-gray-900">Phone</label>
            {isEditMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="font-bold text-sm text-gray-900">Address</label>
            {isEditMode ? (
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.address}</p>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="font-bold text-sm text-gray-900">Bio</label>
            {isEditMode ? (
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                rows="3"
                placeholder="Brief user bio"
              ></textarea>
            ) : (
              <p className="mt-2 text-gray-700">{formData.bio}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="font-bold text-sm text-gray-900">Profile Picture</label>
            {isEditMode ? (
              <>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-sm text-gray-900 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {formData.profilePicture && (
                  <img
                    src={typeof formData.profilePicture === 'string' ? formData.profilePicture : URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="mt-4 h-24 rounded-lg"
                  />
                )}
              </>
            ) : (
              formData.profilePicture && (
                <img src={formData.profilePicture} alt="Profile" className="mt-4 h-24 rounded-lg" />
              )
            )}
          </div>

          {/* Role */}
          <div>
            <label className="font-bold text-sm text-gray-900">Role</label>
            {isEditMode ? (
              <select
                name="role"
                value={formData.role || 'user'}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            ) : (
              <p className="mt-2 text-gray-700 capitalize">{formData.role}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
            {Object.keys(formData.socialLinks).map((platform) => (
              <div key={platform}>
                <label className="font-bold text-sm text-gray-900 capitalize">{platform}</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name={platform}
                    value={formData.socialLinks[platform] || ''}
                    onChange={handleSocialLinkChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  />
                ) : (
                  <p className="mt-2 text-blue-600 underline">
                    <a href={formData.socialLinks[platform]} target="_blank" rel="noopener noreferrer">
                      {formData.socialLinks[platform]}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Password (only for new user) */}
          {!initialData && (
            <div className="md:col-span-2">
              <label className="font-bold text-sm text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditMode && (
          <button
            type="submit"
            className="w-full mt-6 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            {initialData ? 'Update User' : 'Create User'}
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
