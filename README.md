# MERN Blog
A public music-themed blog where users can write, view, filter, edit, and delete posts. 

![mern-blog](https://user-images.githubusercontent.com/85912934/197315791-e4cc3d8e-b60d-4f5d-a066-b55983da0196.png)

The backend was built with JavaScript, Node.js, Express, MongoDB, Prettier to make the code easier to read, Eslint (Airbnb and 
Prettier configurations) to find problems in the code, nodemon to restart the app when a server change is made, concurrently to run both the client and server simultaneously, 
bcryptjs to encrypt and decrypt the users' password, colors to make certain console logs pop out, 
cors tells the browser that the app at its origin (e.g. localhost:5000) has access to resources at another origin (e.g. localhost:3000), 
dotenv to keep certain information secret, express-async-handler to handle async express route exceptions, 
jsonwebtoken to give each user a unique token, and multer to upload files.

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, react-redux, redux-persist, and reduxjs/toolkit to manage the logged in user's state, 
and react-router-dom to handle the app's web routing.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-blog.git
2. To download the backend dependencies, cd into the mern-blog folder and type: npm install
3. To download the frontend dependencies, cd into the client folder and type: npm install
4. Cd .. back to the mern-blog folder, and run this project by typing: npm run dev

## Features
- User can register and log in to their account.
- Logged in user can view, edit, and delete their profile (Note: deleting your profile will also delete your posts).
- Logged in user can write, edit, and delete their post(s).
- User can filter all the posts using the categories list.
- Responsive web design for all portrait and landscape devices.
- Browser support for Edge/Internet Explorer.

## Upcoming Features
- Cross browser support for Chrome, Firefox, Opera, and Safari.
- User will have the ability to type a user in a search field to filter all the posts.
- User will have another list to filter all the posts by oldest or newest date.
- User will be able to like or unlike posts.
- Logged in user will be able to view the like count of any of their posts.

## Demos
### Register a User
https://user-images.githubusercontent.com/85912934/197315840-751a3c57-84d9-4783-b15b-69e99652a9ec.mp4

### Login a User
https://user-images.githubusercontent.com/85912934/197315846-5c359932-4015-4dac-9ee1-26a8c4610275.mp4

### Write a Post
https://user-images.githubusercontent.com/85912934/197315858-9c451e80-f4ea-4635-8658-541d6c9ecc14.mp4

### Edit and Delete a Post
https://user-images.githubusercontent.com/85912934/197315878-99cfef79-b633-4824-918b-31311f7af1bb.mp4

### Blocking access to certain Users
https://user-images.githubusercontent.com/85912934/197315911-77ef53c2-410b-4937-a47d-a1acfb6657e6.mp4

### Edit and Delete a User
https://user-images.githubusercontent.com/85912934/197315935-ea4fdc05-c854-4d6a-87c7-b75176adc871.mp4

### Filter Posts
https://user-images.githubusercontent.com/85912934/197315939-de6480e9-72c6-46da-9f02-8c9bbb5d6ecc.mp4

## Author
- Christian Demesa: https://github.com/christiandeandemesa
