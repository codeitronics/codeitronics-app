// src/controllers/uploadController.js
const initMulter = require('../services/uploadService');

// Controller function for file upload
exports.uploadFile = (req, res) => {
  const folder = req.params.folder || 'default';
  const upload = initMulter(folder).single('file');

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }
    
    const filePath = `/assets/${folder}/${req.file.filename}`;
    res.status(200).json({ filePath });
  });
};
