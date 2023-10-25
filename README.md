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
### Cloning the Code
1. Open your terminal and type git clone https://github.com/christiandeandemesa/MERN-blog.git
2. Cd into MERN-blog, then type git checkout 4609cd63cf3 to get commit before deployment.
3. To download the backend dependencies, stay in the root folder (MERN-blog) and type npm install.
4. To download the frontend dependencies, cd into the client folder and type npm install.

### Connecting to MongoDB
1. Create an account or login to [MongoDB Atlas](https://account.mongodb.com/account/login).
2. Click New Project, name your project, click Next, then Create Project.

![mongo-1](https://user-images.githubusercontent.com/85912934/214934048-4337c703-af47-4256-960c-b6043ac4550b.png)
![mongo-2](https://user-images.githubusercontent.com/85912934/214934087-982ae57b-8f36-40d2-bd7c-970161f9639f.png)
![mongo-3](https://user-images.githubusercontent.com/85912934/214934111-a393d093-dd2f-4de7-a9e5-8a9a685a15c2.png)

3. Click Build a Database, and choose the free option.

![mongo-4](https://user-images.githubusercontent.com/85912934/214934176-4c6d5942-3c14-413f-9f9d-96de5c32f14e.png)
![mongo-5](https://user-images.githubusercontent.com/85912934/214934182-f5a8cb4c-1235-4697-a951-54494b19e2e5.png)

4. Leave AWS as the Cloud Provider & Region, the region closest to where you are, and click Create Cluster.

![mongo-6](https://user-images.githubusercontent.com/85912934/214934268-7c7b1990-119a-4e74-8626-0686b9fdb2f9.png)

5. Type in a username and password, click Create User, leave it on My Local Environment, click Add My Current IP Address, then Finish and Close.

![mongo-7](https://user-images.githubusercontent.com/85912934/214934328-dc5ddf58-d9b0-4cfa-9f5b-47893806b33a.png)
![mongo-8](https://user-images.githubusercontent.com/85912934/214934354-dd442577-c84d-4021-9029-a3dddf284513.png)

6. Click Connect, Connect your application, then copy the connection string.

![mongo-9](https://user-images.githubusercontent.com/85912934/214934413-6af4411b-9ff0-4f86-a0ba-ff3461dd9e5e.png)
![mongo-10](https://user-images.githubusercontent.com/85912934/214934424-2bc5e182-874d-44e1-9b25-213a5504eaa8.png)
![mongo-11](https://user-images.githubusercontent.com/85912934/214934429-77723285-54db-4595-9477-0b9922ee72d5.png)

7. Create a .env in your root folder and add the following:
```
PORT = 5000
MONGO_URI = MongoDB connection string (Note: Don't forget to replace <password> with your password)
JWT_SECRET = Any Text Here
```
8. Open the terminal, and type npm run dev to run both the client and server.

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
- Attempting to upload your own image for your profile or post will cause an interal server error on the deployed website because of an unknown issue in userRoute.js and postRoute.js

### Multer Bug
https://user-images.githubusercontent.com/85912934/214688457-138a7867-083a-4504-900f-fad7293a2397.mp4

## Author
- Christian Demesa: https://github.com/christiandeandemesa
