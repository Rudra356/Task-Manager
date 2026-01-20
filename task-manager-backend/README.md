#Task Management System – Backend

This is the backend service for the Task Management System built using Node.js, Express, MongoDB, and JWT authentication.

The backend is fully functional and has been tested locally as well as on the deployed environment using Postman.

## Features

- User Registration & Login
- JWT-based Authentication
- Secure password hashing using bcrypt
- Task CRUD operations (Create, Read, Update, Delete)
- User-specific task access
- RESTful API architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt
- CORS

## API Endpoints

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks (Protected)
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Environment Variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run Locally

```bash
npm install
npm start

##Server runs at

http://localhost:5000

##Deployment Status

The backend is successfully deployed and verified using Postman.
All APIs are reachable and working as expected on the hosted URL.

The backend service connects correctly to MongoDB Atlas and handles authentication and task operations without issues.

Author
Rudra Naskar

