# Mini Blog – Full Stack Application

A simple full-stack blogging platform built as a technical assessment project.  
Implements user authentication, blog CRUD operations, and authorization with a clean separation of frontend and backend.
---

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt (password hashing)

### Frontend
- React
- Zustand (state management)
- Custom `useApi` hook for API calls
- Fetch API

---

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Secure password hashing
- Logout support

### Blogs
- Create blog (authenticated users)
- View all blogs (public, paginated)
- Edit blog (author only)
- Delete blog (author only)
- Pagination with page metadata

### Authorization
- Backend enforces author-only edit/delete
- Frontend hides edit/delete actions for non-authors

---

## Project Structure
mini-blog-fullstack/
│
├── backend/
│ ├── routes/
│ ├── middleware/
│ ├── controllers/
│ ├── db/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── store/
│ │ └── App.jsx
│
└── README.md

---

## Backend Setup

bash
cd backend
npm install

Create .env file:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/mini_blog_db
JWT_SECRET=your_secret_key


Run backend:

npm start


Backend runs on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

API Endpoints
Auth

POST /auth/register

POST /auth/login

Blogs

GET /blogs?page=1

POST /blogs (auth required)

PUT /blogs/:id (author only)

DELETE /blogs/:id (author only)

Security Notes

Passwords are hashed using bcrypt

JWT is verified on protected routes

Backend does not trust frontend for authorization

Author checks enforced server-side

Assessment Notes

No UI libraries used intentionally (focus on logic)

Clean separation of concerns

Fully functional CRUD with authorization

Ready for review and extension

Author

Abhishek Ashok Mane
https://github.com/Abhi09-htp
