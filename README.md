📘 Mini Blogging Platform (Full Stack)

A full-stack mini blogging platform where users can sign up, log in, and publish blogs.
All blogs are publicly readable, while editing and deletion are restricted to the author.

🔗 Live Demo

Frontend (Netlify):
👉 https://magenta-croquembouche-be4681.netlify.app/

Backend API (Render):
👉 https://mini-blog-backend-n92n.onrender.com/

🧰 Tech Stack
Frontend

React (Create React App)

Zustand (state management)

Custom useApi hook

Fetch API

Backend

Node.js

Express.js

PostgreSQL

JWT Authentication

bcrypt (password hashing)

Deployment

Frontend: Netlify

Backend: Render

Database: Render PostgreSQL

✨ Features
✅ Authentication

User registration (Email + Password)

User login (Email + Password)

JWT-based authentication

Logged-in user state managed with Zustand

✅ Blog Management

Create new blog (Title + Content)

View all blogs (public)

Pagination support

Edit and delete blogs only by the author

Backend enforces authorization checks

✅ State & Data Handling

Global blog and auth state using Zustand

Custom useApi hook handles:

API requests (GET, POST, PUT, DELETE)

Loading states

Error handling

Store updates

✅ Database

PostgreSQL database

Users and blogs stored with proper relations

Passwords hashed using bcrypt

mini-blog-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── db.js
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

⚙️ Local Setup

1️⃣ Clone the repository
git clone https://github.com/Abhi09-htp/mini-blog-fullstack.git
cd mini-blog-fullstack

2️⃣ Backend setup
cd backend
npm install

Create a .env file in backend/:
PORT=5000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_secret_key

Start backend:
npm start

Backend runs on:
http://localhost:5000

3️⃣ Frontend setup
cd ../frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

🔐 Security Notes

Passwords are securely hashed using bcrypt

JWT tokens are used for authentication

Protected routes are enforced on the backend

Sensitive environment variables are excluded via .gitignore

📌 Task Requirement Mapping

| Requirement             | Status |
| ----------------------- | ------ |
| User signup & login     | ✅      |
| Auth state via Zustand  | ✅      |
| Blog CRUD operations    | ✅      |
| Author-only edit/delete | ✅      |
| Pagination              | ✅      |
| Custom API hook         | ✅      |
| Secure password hashing | ✅      |
| Deployment              | ✅      |

📤 Submission Links

GitHub Repository:
https://github.com/Abhi09-htp/mini-blog-fullstack

Live Application:
https://magenta-croquembouche-be4681.netlify.app/

👤 Author

Abhishek Mane
https://github.com/Abhi09-htp
