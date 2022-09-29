const mongoose = require('mongoose');

// todo Ability to add comments

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		desc: {
			type: String,
			required: true
		},
		categories: {
			type: Array
		},
		likeCount: {
			type: Number,
			default: 0
		},
		photo: {
			type: String
		},
		user: {
			type: String,
			required: true
		},
		userAvatar: {
			type: String
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);
