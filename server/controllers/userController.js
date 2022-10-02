const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Post = require('../models/postModel');

// Creates a token for the user
const generateToken = userId => {
	return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

// Registers a user
const registerUser = asyncHandler(async (req, res) => {
	const {username, email, password, confirmPassword, isAdmin} = req.body;

	const userExists = await User.findOne({email});
	if (userExists) {
		res.status(409).json('User already exists');
		return;
	}

	if (!username || !email || !password || !confirmPassword) {
		res.status(400).json('Username, email, password, and confirm password are required');
		return;
	}

	if (password.length < 8 || password.length > 20) {
		res.status(400).json('Password must be between 8 and 20 characters');
		return;
	}
	if (password !== confirmPassword) {
		res.status(400).json('Password and confirm password must match');
		return;
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// If an image was uploaded in Register.jsx, sets its path toward the public folder in the client folder
	let filePath;
	if (req.file) filePath = `./${req.file.filename}`;
	else filePath = 'DefaultProfile';

	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
		confirmPassword: hashedPassword,
		profilePic: filePath,
		isAdmin
	});

	if (newUser) {
		res.status(201).json({
			id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			profilePic: newUser.profilePic,
			isAdmin: newUser.isAdmin,
			token: generateToken(newUser.id)
		});
	} else res.status(400).json('Invalid user data');
});

// Logs in a user
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	const existingUser = await User.findOne({email});
	if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
		res.status(200).json({
			id: existingUser.id,
			username: existingUser.username,
			email: existingUser.email,
			profilePic: existingUser.profilePic,
			isAdmin: existingUser.isAdmin,
			token: generateToken(existingUser.id)
		});
	} else res.status(400).json('Login failed');
});

// Gets one user
const getOneUser = asyncHandler(async (req, res) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) {
		res.status(404).json('User not found');
		return;
	}

	if (req.user.id === req.params.id || req.user.isAdmin)
		res.status(200).json({
			id: existingUser.id,
			username: existingUser.username,
			email: existingUser.email,
			profilePic: existingUser.profilePic,
			isAdmin: existingUser.isAdmin,
			token: existingUser.token
		});
	else
		res.status(401).json(
			'Only an administrator or the logged in user can get their own information'
		);
});

// Gets all the users
const getAllUsers = asyncHandler(async (req, res) => {
	const existingUsers = await User.find();
	if (!existingUsers) {
		res.status(404).json('Users not found');
		return;
	}

	if (req.user.isAdmin) res.status(200).json(existingUsers);
	else res.status(403).json("Only an administrator can get all the users' information");
});

// Updates user
const updateUser = asyncHandler(async (req, res) => {
	const {password, confirmPassword} = req.body;

	const existingUser = await User.findById(req.params.id);
	if (!existingUser) {
		res.status(404).json('User not found');
		return;
	}

	if (password) {
		if (password.length < 8 || password.length > 20) {
			res.status(400).json('Password must be between 8 and 20 characters');
			return;
		}
		if (password !== confirmPassword) {
			res.status(400).json('Password and confirm password must match');
			return;
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.password = hashedPassword; // Using password instead of req.body.password will not change the password since it is set using req.body below
		req.body.confirmPassword = hashedPassword;
	}

	let updatedUser;
	try {
		updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated user data');
	}

	if (req.user.id === req.params.id || req.user.isAdmin)
		res.status(201).json({
			id: updatedUser.id,
			username: updatedUser.username,
			email: updatedUser.email,
			profilePic: updatedUser.profilePic,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(existingUser.id)
		});
	else res.status(401).json('Only an administrator or the logged in user can update themself');
});

// Deletes user and their posts
const deleteUser = asyncHandler(async (req, res) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) {
		res.status(404).json('User not found');
		return;
	}

	if (req.user.id === req.params.id || req.user.isAdmin) {
		await Post.deleteMany({user: existingUser.username});
		await User.findByIdAndDelete(existingUser);
		res.status(200).json('Deleted user and their posts');
	} else res.status(401).json('Only an administrator or the logged in user can delete themself');
});

module.exports = {registerUser, loginUser, getOneUser, getAllUsers, updateUser, deleteUser};
