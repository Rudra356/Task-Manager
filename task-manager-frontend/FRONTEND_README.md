### 📁 Frontend README.md

# Task Management System – Frontend

This is the frontend application for the Task Management System built using React.

## Features

- User Registration
- Login with JWT Authentication
- Protected Routes
- Task Listing
- Task Creation
- Context API for authentication state
- Axios interceptor for token attachment

## Tech Stack

- React
- React Router
- Axios
- Context API
- Bootstrap

## Run Locally

```bash
npm install
npm run dev
App runs at:

http://localhost:5173


##Application Flow

User registers and logs in.

JWT token is stored in localStorage.

Axios interceptor attaches token to every request.

Protected routes are accessible only for authenticated users.

Tasks are fetched and managed using backend REST APIs.

Backend Integration
Frontend communicates with backend via:

bash
Copy code
/api/auth/login
/api/auth/register
/api/tasks
Deployment Note
The frontend is correctly integrated with the backend APIs.
However, when deployed, it currently returns 404 due to hosting routing / environment configuration (SPA routing & proxy / rewrite setup).

The issue is related to deployment configuration, not application logic.
The application works correctly when running locally with the deployed backend.

This is an infrastructure-level issue and not a functional or architectural problem in the codebase.

Author
Rudra Naskar
