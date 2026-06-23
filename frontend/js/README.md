# 🌐 ConnectHub - Mini Social Media Platform

A modern mini social media platform developed as part of the **CodeAlpha Full Stack Development Internship**.

ConnectHub allows users to register, log in, create posts, interact through likes and comments, follow other users, and manage their profiles in a clean and responsive web interface.

---

## 📸 Preview

> Add screenshots here after uploading them.

* Login Page
* Register Page
* Home Feed
* Profile Page
* Create Post
* Comments & Likes

---

# ✨ Features

### 👤 User Authentication

* User Registration
* User Login
* JWT Authentication

### 📝 Posts

* Create New Posts
* View All Posts
* Recent Posts on Profile

### ❤️ Like System

* Like Posts
* Unlike Posts

### 💬 Comments

* Add Comments
* View Comments

### 👥 Follow System

* Follow Users
* Unfollow Users

### 👤 User Profile

* Profile Information
* Followers Count
* Following Count
* Posts Count
* Recent Posts

### 🎨 User Interface

* Responsive Design
* Modern Navigation Bar
* Toast Notifications
* Empty State Messages
* Professional Layout

---

# 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Tools

* VS Code
* Postman
* Git & GitHub

---

# 📂 Project Structure

```
ConnectHub/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── profile.html
│
└── README.md
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/muzammilsarfraz/ConnectHub.git
```

## 2. Navigate to Backend

```bash
cd backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/connecthub
JWT_SECRET=your_secret_key
```

## 5. Start the Backend

```bash
npm run dev
```

## 6. Launch the Frontend

Open the `frontend` folder with **Live Server**.

---

# 📌 API Endpoints

## User

* POST `/api/users/register`
* POST `/api/users/login`
* PUT `/api/users/:id/follow`
* PUT `/api/users/:id/unfollow`

## Posts

* GET `/api/posts`
* POST `/api/posts`
* PUT `/api/posts/:id/like`
* PUT `/api/posts/:id/unlike`

## Comments

* POST `/api/comments`
* GET `/api/comments/:postId`

---

# 🌟 Future Improvements

* Edit Profile
* Upload Profile Picture
* Image Posts
* Search Users
* Notifications
* Dark Mode

---

# 👨‍💻 Developer

**Muhammad Muzammil Sarfraz**

BS Information Technology Student

University of Education, Lahore – Faisalabad Campus

---

# 📜 License

This project was developed for educational purposes as part of the **CodeAlpha Full Stack Development Internship**.
