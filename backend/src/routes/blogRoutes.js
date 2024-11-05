const express = require('express');
const {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  archiveBlogPost,
  toggleStatus,
  getAllBlogs,
  getBlogById,
  getBlogBySlug, // Import the new controller function
} = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for blog actions
router.get('/', getAllBlogs);
router.get('/:id', authMiddleware, getBlogById);
router.get('/slug/:urlSlug', getBlogBySlug); // Use the new getBlogBySlug function

// Create a new blog post
router.post('/create', authMiddleware, createBlogPost);

// Update an existing blog post
router.put('/update/:id', authMiddleware, updateBlogPost);

// Delete a blog post
router.delete('/:id', authMiddleware, deleteBlogPost);

// Archive a blog post
router.put('/archive/:id', authMiddleware, archiveBlogPost);

// Toggle Draft/Publish status
router.put('/toggle-status/:id', authMiddleware, toggleStatus);

module.exports = router;
