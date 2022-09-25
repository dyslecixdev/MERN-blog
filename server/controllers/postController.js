const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// Creates a post
const createPost = asyncHandler(async (req, res) => {
	const {title, desc, categories, likeCount, photo} = req.body;

	if (!title || !desc) {
		res.status(400).json('Title and description are required');
		return;
	}

	const newPost = await Post.create({
		title,
		desc,
		categories,
		likeCount,
		photo: '',
		user: req.user.username // Sets the user as the logged in user
	});

	if (newPost) res.status(201).json(newPost);
	else res.status(400).json('Invalid post data');
});

// Get one post
const getOnePost = asyncHandler(async (req, res) => {
	const existingPost = await Post.findById(req.params.id);
	if (!existingPost) {
		res.status(404).json('Post not found');
		return;
	}

	res.status(200).json(existingPost);
});

// Get all posts with or without a query
const getAllPosts = asyncHandler(async (req, res) => {
	const user = req.query.user;
	const category = req.query.category;

	let existingPosts;
	if (user) existingPosts = await Post.find({user});
	else if (category)
		existingPosts = await Post.find({
			categories: {
				$in: [category]
			}
		});
	else existingPosts = await Post.find();

	res.status(200).json(existingPosts);
});

// Update a post
const updatePost = asyncHandler(async (req, res) => {
	const existingPost = await Post.findById(req.params.id);
	if (!existingPost) {
		res.status(404).json('Post not found');
		return;
	}

	let updatedPost;
	try {
		updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated post data');
	}

	if (req.user.username === existingPost.user || req.user.isAdmin)
		res.status(201).json(updatedPost);
	else res.status(401).json('Only an administrator or the logged in user can update their post');
});

// Delete a post
const deletePost = asyncHandler(async (req, res) => {
	const existingPost = await Post.findById(req.params.id);
	if (!existingPost) {
		res.status(404).json('Post not found');
		return;
	}

	if (req.user.username === existingPost.user || req.user.isAdmin) {
		await Post.findByIdAndDelete(existingPost);
		res.status(200).json('Deleted post');
	} else
		res.status(401).json('Only an administrator or the logged in user can delete their post');
});

module.exports = {createPost, getOnePost, getAllPosts, updatePost, deletePost};
