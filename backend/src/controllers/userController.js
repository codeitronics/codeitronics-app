const User = require('../models/User');
const jwt = require('jsonwebtoken');
const saveProfilePicture = require('../utils/saveProfilePicture'); // Import the helper function

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, phone, address, bio, socialLinks } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const profilePicture = req.file ? saveProfilePicture(req.file, username) : '';
    const user = new User({ firstName, lastName, username, email, password, phone, address, bio, socialLinks, profilePicture });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login user and generate token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['user', 'admin', 'super-admin'].includes(role)) return res.status(400).json({ message: 'Invalid role specified' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Failed to update user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

// Create a new user (Admin only)
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, phone, address, bio, role, socialLinks } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const profilePicture = req.file ? saveProfilePicture(req.file, username) : '';
    const user = new User({ firstName, lastName, username, email, password, phone, address, bio, role, socialLinks, profilePicture });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username, phone, address, bio, role, socialLinks } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.bio = bio || user.bio;
    user.role = role || user.role;
    user.socialLinks = socialLinks || user.socialLinks;

    // Update profile picture if provided
    console.log('### req.file = ',req.file);
    if (req.file) {
      user.profilePicture = saveProfilePicture(req.file, id);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password'); // Exclude password from the response
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};
