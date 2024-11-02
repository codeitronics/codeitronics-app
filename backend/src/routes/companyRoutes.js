// src/routes/companyRoutes.js
const express = require('express');
const { getCompanyInfo, updateCompanyInfo } = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../../frontend/public/assets/company/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for logo and images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Route to get company information
router.get('/', authMiddleware, getCompanyInfo);

// Route to update company information with logo and images
router.put(
  '/',
  authMiddleware,
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
  updateCompanyInfo
);

module.exports = router;
