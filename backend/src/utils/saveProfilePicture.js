// utils/saveProfilePicture.js
const path = require('path');
const fs = require('fs');

// Helper function to save profile picture
const saveProfilePicture = (file, userId) => {
  console.log(`### userId = ${userId}`);
  console.log(`### file = ${file}`);

  const uploadDir = path.resolve(__dirname, '../../../frontend/public/assets/users', userId);

  // Check if the folder exists, if not, create it
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, file.originalname);
  console.log(`### filePath = ${filePath}`);
  fs.writeFileSync(filePath, file.buffer);

  // Return relative path for frontend access
  return `../../../frontend/public/assets/users/${userId}/${file.originalname}`;
};

module.exports = saveProfilePicture;
