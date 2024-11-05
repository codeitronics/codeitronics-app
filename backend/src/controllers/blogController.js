const Blog = require('../models/blogModel');

// Helper function to generate URL slug from title
const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Fetch all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Fetch a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Failed to fetch blog by ID:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Fetch a single blog post by Slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { urlSlug } = req.params;
    const blog = await Blog.findOne({ urlSlug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Failed to fetch blog by slug:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, description, categories, tags, content, action, featureImage, contentImages } = req.body;
    const urlSlug = generateSlug(title);

    const newBlog = new Blog({
      title,
      description,
      categories,
      tags,
      content,
      featureImage,
      contentImages,
      url: urlSlug,
      urlSlug,
      status: action,
      author: req.user.id,
      authorName: 'CodeITronics',
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

// Update an existing blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, categories, tags, content, action, description, featureImage, contentImages } = req.body;
    const urlSlug = generateSlug(title);

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        categories,
        tags,
        content,
        featureImage,
        contentImages,
        url: urlSlug,
        status: action,
        description,
        updatedAt: Date.now(),
        authorName: 'CodeITronics',
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Failed to update blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};

// Archive a blog post
exports.archiveBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const archivedBlog = await Blog.findByIdAndUpdate(id, { isArchived: true }, { new: true });

    if (!archivedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post archived successfully', blog: archivedBlog });
  } catch (error) {
    console.error('Failed to archive blog post:', error);
    res.status(500).json({ error: 'Failed to archive blog post' });
  }
};

// Toggle Draft/Publish status
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.status = blog.status === 'draft' ? 'published' : 'draft';
    await blog.save();

    res.status(200).json({ message: `Blog post status set to ${blog.status}`, blog });
  } catch (error) {
    console.error('Failed to toggle blog status:', error);
    res.status(500).json({ error: 'Failed to toggle blog status' });
  }
};
