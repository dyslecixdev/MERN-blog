const mongoose = require('mongoose');

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
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);
