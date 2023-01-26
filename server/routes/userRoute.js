const multer = require('multer');
const path = require('path');
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
		// path.join finds a path from the __dirname to assets with .. signifying any links folder pathing in between.
		cb(null, path.join(__dirname, '..', 'assets')); // Path of the uploaded image's folder
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

const profilePicUpload = upload.single('profilePic');

router.post('/register', function (req, res) {
	profilePicUpload(req, res, function (err) {
		if (err instanceof multer.MulterError) new Error(`Multer Error: ${err}`);
		else if (err) new Error(`Not a Multer Error: ${err}`);
		else registerUser;
	});
}); // upload.single() states that this route will only upload one image

router.post('/register', function testMulter() {
	upload.single('profilePic');
});

router.post('/login', loginUser);
router.get('/:id', protect, getOneUser);
router.get('/', protect, getAllUsers);
router.put('/:id', protect, upload.single('profilePic'), updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
