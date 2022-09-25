const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// req.headers accesses headers in express, and it has an authorization object with a value of 'Bearer <random token string>'.
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// token is the random token string.
			token = req.headers.authorization.split(' ')[1];
			// Verifies the token with the secret key (the value of JWT_SECRET in the .env file).
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// req.user is a specific user document depending on how JSON web token was signed (check userController.js).
			// .select('-password').select('-confirmPassword') returns all of the user's data except their password and confirmPassword.
			req.user = await User.findById(decoded.userId)
				.select('-password')
				.select('-confirmPassword');
			// Calls the next piece of middleware.
			next();
		} catch (err) {
			console.log(err);
			res.status(401).json('Not authorized, wrong token');
			return;
		}
	}

	if (!token) res.status(401).json('Not authorized, no token');
});

module.exports = protect;
