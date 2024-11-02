// src/controllers/companyController.js
const Company = require('../models/Company');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../../frontend/public/assets/company');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

exports.uploadCompanyFiles = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 5 }]);

exports.getCompanyInfo = async (req, res) => {
  try {
    const company = await Company.findOne();
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    const updateData = req.body;

    // If files were uploaded, save their paths
    if (req.files.logo) {
      updateData.logo = `../../../frontend/public/assets/company/${req.files.logo[0].filename}`;
    }
    if (req.files.images) {
      updateData.images = req.files.images.map(file => `../../../frontend/public/assets/company/${file.filename}`);
    }

    const company = await Company.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true, // Create if not exists
    });
    
    res.status(200).json({ message: 'Company information updated successfully', company });
  } catch (error) {
    console.error('Error updating company info:', error);
    res.status(500).json({ message: 'Failed to update company information' });
  }
};
