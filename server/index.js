const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

// storage defines where the file is being sent (i.e. destination), and the name of the file (i.e. filename)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	}
});
const upload = multer({storage});

const app = express();

// express.json() parses incoming JSON object requests and places the data in req.body.
app.use(express.json());
// express.urlencoded parses incoming urlencoded payload requests (e.g. strings or arrays).
// {extended: false} signifies the req.body object will only contain strings.
app.use(express.urlencoded({extended: false}));
// cors allows the express server to respond to preflight requests.
// A preflight request is sent before an actual request to see which actual requests the express server accepts.
// {credentials: true} allows all requests from the origins.
app.use(cors({credentials: true, origins: 'http://localhost:5000'}));
// Used with multer's storage's destination
app.use('/images', express.static(path.join(__dirname, '/images')));

// Uses a POST request on each file upload
app.post('/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded');
});

app.use('/users', require('./routes/userRoute'));
app.use('/posts', require('./routes/postRoute')); // bug

app.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));
