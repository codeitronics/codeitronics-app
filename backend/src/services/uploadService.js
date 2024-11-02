
// src/services/uploadService.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper function to generate file storage based on the provided folder path
const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, `../../../frontend/public/assets/${folder}`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

// Function to initialize multer for specific folder
const initMulter = (folder) => {
  return multer({ storage: createStorage(folder) });
};

module.exports = initMulter;
