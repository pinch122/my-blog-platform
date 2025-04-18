# Blogging Platform

## Overview
This project is a full-stack blogging platform where users can create, read, update, and delete blog posts. It includes user authentication, profile management, and a seamless interface for interacting with blog content. The platform uses Express.js for the backend and MongoDB for data storage, with JWT authentication to protect user routes.

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Profile Management**: Users can update their profile information, including bio and profile picture.
- **CRUD Operations for Posts**: Users can create, read, edit, and delete blog posts.
- **Frontend**: Dynamic blog feed, post creation, and editing pages.
- **Protected Routes**: Token-based authentication to protect routes and data.
- **Responsive Design**: The platform is responsive and optimized for mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Libraries/Tools**: 
  - Bcryptjs (for password hashing)
  - Mongoose (MongoDB ORM)
  - Multer (for handling file uploads)
  - Postman (for API testing)

## Installation

### Prerequisites

- **Node.js** and **npm** installed on your system
- **MongoDB** (either locally or via a cloud service like MongoDB Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/blogging-platform.git
   cd blogging-platform
