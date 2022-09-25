const express = require('express');

const router = express.Router();
const {
	registerUser,
	loginUser,
	getOneUser,
	getAllUsers,
	updateUser,
	deleteUser
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getOneUser);
router.get('/', protect, getAllUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
