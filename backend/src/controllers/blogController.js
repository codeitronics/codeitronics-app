const Blog = require('../models/blogModel');
const path = require('path');
const fs = require('fs');

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

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, description, categories, tags, content, action } = req.body;
    const urlSlug = generateSlug(title);

    // Ensure the directory exists for images
    const blogDir = path.join(__dirname, `../../../frontend/public/assets/blog/${urlSlug}`);
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

    // Process feature image
    const featureImage = req.files && req.files['featureImage']
      ? `/assets/blog/${urlSlug}/${urlSlug}-image.jpg`
      : null;

    // Move feature image file if it exists
    if (featureImage) {
      const featureImagePath = path.join(blogDir, `${urlSlug}-image.jpg`);
      fs.renameSync(req.files['featureImage'][0].path, featureImagePath);
    }

    // Process content images
    const contentImages = req.files && req.files['contentImages']
      ? req.files['contentImages'].map((file, index) => {
          const contentImagePath = `/assets/blog/${urlSlug}/content-image-${index + 1}${path.extname(file.originalname)}`;
          fs.renameSync(file.path, path.join(blogDir, `content-image-${index + 1}${path.extname(file.originalname)}`));
          return contentImagePath;
        })
      : [];

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
      author: req.user.id,  // Assuming `req.user` is set by authentication middleware
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
   // console.log('#### req', req);
    const { id } = req.params;
    const { title, categories, tags, content, action, description } = req.body;
    const urlSlug = generateSlug(title);

    // Ensure directory exists for updated images
    const blogDir = path.join(__dirname, `../../../frontend/public/assets/blog/${urlSlug}`);
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

    // Process feature image update
    let featureImage;
    if (req.files && req.files['featureImage'] && req.files['featureImage'].length > 0) {
      featureImage = `/assets/blog/${urlSlug}/${urlSlug}-image.jpg`;
      const featureImagePath = path.join(blogDir, `${urlSlug}-image.jpg`);
      fs.renameSync(req.files['featureImage'][0].path, featureImagePath);
    } else {
      featureImage = req.body.featureImage || ''; // Use existing featureImage path if none uploaded
    }

    // Process content images update
    let contentImages;
    if (req.files && req.files['contentImages'] && req.files['contentImages'].length > 0) {
      contentImages = req.files['contentImages'].map((file, index) => {
        const contentImagePath = `/assets/blog/${urlSlug}/content-image-${index + 1}${path.extname(file.originalname)}`;
        fs.renameSync(file.path, path.join(blogDir, `content-image-${index + 1}${path.extname(file.originalname)}`));
        return contentImagePath;
      });
    } else {
      contentImages = req.body.contentImages || []; // Use existing contentImages if none uploaded
    }

    // Update the blog post
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
        authorName: 'CodeITronics',  // Static author name as specified
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
