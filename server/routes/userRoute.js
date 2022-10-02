const multer = require('multer');
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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './client/public'); // Path of the uploaded image's folder
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`); // Renames each image filename using the current Date to make it unique
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Multer will only accept png, jpg, and jpeg images
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
		}
	}
});

router.post('/register', upload.single('profilePic'), registerUser); // upload.single() states that this route will only upload one image
router.post('/login', loginUser);
router.get('/:id', protect, getOneUser);
router.get('/', protect, getAllUsers);
router.put('/:id', protect, upload.single('profilePic'), updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
