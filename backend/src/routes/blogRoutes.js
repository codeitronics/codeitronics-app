// routes/blogRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/blogModel');

const {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  archiveBlogPost,
  toggleStatus,
  getAllBlogs,
  getBlogById,
} = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Helper function to generate URL slug from title
const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const title = req.body.title || req.query.title || 'temp';
    const slug = generateSlug(title);
    const dir = path.join(__dirname, `../../../frontend/public/assets/blog/${slug}`);

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'featureImage') {
      cb(null, `${generateSlug(req.body.title || req.query.title || 'temp')}${path.extname(file.originalname)}`);
    } else {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  },
});

const upload = multer({ storage });

// Routes for blog actions
router.get('/', getAllBlogs);
router.get('/:id', authMiddleware, getBlogById);
router.post(
  '/create',
  authMiddleware,
  upload.fields([{ name: 'featureImage', maxCount: 1 }, { name: 'contentImages', maxCount: 10 }]),
  createBlogPost
);
router.put(
  '/update/:id',
  authMiddleware,
  upload.fields([{ name: 'featureImage', maxCount: 1 }, { name: 'contentImages', maxCount: 10 }]),
  updateBlogPost
);
router.delete('/:id', authMiddleware, deleteBlogPost);
router.put('/archive/:id', authMiddleware, archiveBlogPost);
router.put('/toggle-status/:id', authMiddleware, toggleStatus);

// Route for uploading content images directly from the editor
router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const { filename } = req.file;
    const title = req.body.title || req.query.title || 'temp';
    const slug = generateSlug(title);
    const imagePath = `/assets/blog/${slug}/${filename}`;

    res.status(200).json({ imageUrl: imagePath });
  } catch (error) {
    console.error('Failed to upload blog image:', error);
    res.status(500).json({ error: 'Failed to upload blog image' });
  }
});

router.get('/slug/:urlSlug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ urlSlug: req.params.urlSlug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


