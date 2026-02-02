# Mini Blog – Full Stack Application

A simple full-stack blog application built with **React**, **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Logout

### Blogs
- Create a blog post (authenticated users)
- List blogs with author name
- Pagination support

---

## 🧱 Tech Stack

### Frontend
- React
- Fetch API
- Zustand (state management)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

# Mini Blog – Full Stack Application

A simple full-stack blog application built with **React**, **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Logout

### Blogs
- Create a blog post (authenticated users)
- List blogs with author name
- Pagination support

---

## 🧱 Tech Stack

### Frontend
- React
- Fetch API
- Zustand (state management)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

mini-blog-fullstack/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── routes/
│ │ ├── db.js
│ │ └── index.js
│ ├── package.json
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
└── README.md

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside `backend/`:

PORT=5000
JWT_SECRET=supersecretkey
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_blog_db

---

## 🗄️ Database Setup

Create database and tables in PostgreSQL:

sql
CREATE DATABASE mini_blog_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

▶️ How to Run Locally

1️⃣ Start Backend

cd backend
npm install
npm run dev

Backend runs at:

http://localhost:5000

2️⃣ Start Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🧪 App Flow

Open http://localhost:3000

Register a user

Login

Create a blog

See blogs list

Logout

✅ Status

Backend: ✅ Working

Frontend: ✅ Working

Auth: ✅ Working

PostgreSQL: ✅ Connected

👤 Author

Abhi Mane
GitHub: https://github.com/Abhi09-htp
