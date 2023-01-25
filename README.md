# MERN Blog
A public music-themed blog where users can write, view, filter, edit, and delete posts. 

![mern-blog](https://user-images.githubusercontent.com/85912934/214684972-22495c29-a9b3-4698-812e-a59803322cce.png)

The backend was built with javascript, node.js, express, mongodb atlas,   
bcryptjs to encrypt and decrypt the users' password, colors to make certain console logs pop out, 
cors tells the browser that the app at its origin has access to resources at another origin, 
dotenv to keep certain information secret, express-async-handler to handle async express route exceptions, 
jsonwebtoken to give each user a unique token, multer to upload files, and prop-types to declare the type of props for eslint.

The developer version's backend, which can be cloned in the below section, also features prettier to make the code easier to read, eslint (Airbnb and 
Prettier configurations) to find problems in the code, nodemon to restart the app when a server change is made, and concurrently to run both the client and server simultaneously.

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, react-redux, redux-persist, and reduxjs/toolkit to manage the logged in user's state, and react-router-dom to handle the app's web routing.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-blog.git
2. Cd into MERN-blog, then type git checkout 4609cd63cf3 to get commit before deployment.
2. To download the backend dependencies, stay in the root folder (MERN-blog) and type: npm install
3. To download the frontend dependencies, cd into the client folder and type: npm install
4. Cd .. back to the MERN-blog folder, and run this project by typing: npm run dev

## Features
- User can register and log in to their account.
- Logged in user can view, edit, and delete their profile (Note: deleting your profile will also delete your posts).
- Logged in user can write, edit, and delete their post(s).
- User can filter all the posts using the categories list.
- Responsive web design for all portrait and landscape devices.
- Browser support for Edge/Internet Explorer.

## Upcoming Features
- Apply Google Fonts styling.
- Cross browser support for Chrome, Firefox, Opera, and Safari.
- User will have the ability to type a category or user in a search field to filter all the posts.
- User will have a select box to filter all the posts by oldest or newest date.
- User will be able to like or unlike posts.
- Logged in user will be able to view the like count of any of their posts.
- Logged in user will be able to leave comments on posts.
- Logged in user will be able to view the comments of any of their posts.

## Bugs
- Attempting to upload your own image for your profile or post will cause an interal server error on the deployed website because multer is saving the uploaded images in a server/assets folder.

### Multer Bug
https://user-images.githubusercontent.com/85912934/214688457-138a7867-083a-4504-900f-fad7293a2397.mp4

## [MERN Blog Demo](https://mern-blog-frontend-ejna.onrender.com/)

## Author
- Christian Demesa: https://github.com/christiandeandemesa
