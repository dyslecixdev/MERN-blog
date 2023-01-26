const multer = require('multer');
const path = require('path');
const express = require('express');

const router = express.Router();
const {
	createPost,
	getOnePost,
	getAllPosts,
	updatePost,
	deletePost
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'assets'));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`);
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
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

router.post('/', protect, upload.single('photo'), createPost);
router.get('/:id', getOnePost);
router.get('/', getAllPosts);
router.put('/:id', protect, upload.single('photo'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
