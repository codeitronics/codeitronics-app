const express = require('express');
const multer = require('multer');
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  createUser,
  updateUser,
  getUserById
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Configure multer for profile picture upload
const storage = multer.memoryStorage(); // Use memory storage for quick access in the controller
const upload = multer({ storage });

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', authMiddleware, roleMiddleware(['admin', 'super-admin']), getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'super-admin']), getUserById);
router.post('/', authMiddleware, roleMiddleware(['admin', 'super-admin']), upload.single('profilePicture'), createUser);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'super-admin']), upload.single('profilePicture'), updateUser);
router.put('/edit/:id', authMiddleware, roleMiddleware(['admin', 'super-admin']), upload.single('profilePicture'), updateUser);
router.put('/role/:id', authMiddleware, roleMiddleware(['super-admin']), updateUserRole);

module.exports = router;
