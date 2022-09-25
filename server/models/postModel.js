const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		desc: {
			type: String,
			required: true,
			unique: true
		},
		categories: {
			type: Array
		},
		photo: {
			type: String
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);
