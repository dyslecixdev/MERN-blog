const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

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

app.use('/static', express.static('./server/assets')); // Replaces the route to the folder holding the images (routes files) with '/static'

app.use('/users', require('./routes/userRoute'));
app.use('/posts', require('./routes/postRoute'));

app.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));
