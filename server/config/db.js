const mongoose = require('mongoose');

// Uses the async-await keywords because the app shouldn't stall anytime it needs to connect to the database.
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`.black.bgGreen.italic);
	} catch (err) {
		console.log(err);
		// Ends the process with some failure in Node.js.
		process.exit(1);
	}
};

module.exports = connectDB;
