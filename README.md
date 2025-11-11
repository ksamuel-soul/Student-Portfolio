# 🎓 Student Portfolio Hub

The **Student Portfolio Hub** is a full-stack web platform that allows students to **showcase their academic, project, and achievement portfolios** interactively.  
It supports uploading profile pictures, adding projects dynamically, and maintaining an achievement record — all powered by the **MERN Stack (MongoDB, Express, React, Node.js)**.

---

## 🚀 Features

### 🧑‍💻 Frontend (React + Vite)
- Responsive portfolio interface (modern gradients + glassmorphism)
- Add, edit, and delete projects and achievements dynamically
- Profile picture upload functionality
- Category and search filters
- Real-time updates and modals for form inputs

### 🧩 Backend (Node.js + Express + MongoDB)
- RESTful API with **CRUD** operations
- **Multer** integration for image uploads
- JSON parsing and CORS configuration
- Mongoose models for structured validation

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite) + JavaScript + CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| File Uploads | Multer |
| Styling | Custom CSS (gradients, glassmorphism) |
| API Testing | Thunder Client / Postman |

---

## ⚙️ Installation Guide

Follow these steps carefully to set up and run both backend and frontend servers.

---

### 🧱 1️⃣ Clone the Project
```bash
git clone https://github.com/ksamuel-soul/Student-Portfolio.git
cd student-portfolio-hub-react-full


cd server
npm install
PORT=4000
MONGODB_URI=mongodb://localhost:27017/portfolio_hub
CLIENT_ORIGIN=http://localhost:5173


cd client-react
npm install
npm run dev
VITE v5.x  ready in 400ms
Local:  http://localhost:5173/
