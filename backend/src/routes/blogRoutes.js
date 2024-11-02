// routes/blogRoutes.js
const express = require('express');
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

// Routes for blog actions
router.get('/', getAllBlogs);
router.get('/:id', authMiddleware, getBlogById);

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

// Fetch blog by URL slug
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
