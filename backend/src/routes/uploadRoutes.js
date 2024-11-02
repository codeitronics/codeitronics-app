// routes/uploadRoutes.js
const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to upload file to specified folder
router.post('/:folder', authMiddleware, uploadFile);

module.exports = router;
