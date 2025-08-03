# 🥗 Food Recipe Blog – MERN Stack App

A full-stack **Food Recipe Sharing Website** where users can register, log in securely, and share their favorite food recipes with the community.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure login and signup
- 📝 **Recipe Management** – Create, edit, view recipes
- 🎨 **Responsive UI** – Built with Tailwind CSS
- 🧠 **Modular Frontend** – Component-based React architecture
- 🛡️ **Protected Routes** – Token-based access control

---

## 🧱 Tech Stack

**MERN Stack:**

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
food-blog/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
│
├── .env
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/food-blog.git
cd food-blog
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Make sure your frontend is configured to call the backend API at `http://localhost:5000`.

---

## 🔐 Authentication Flow

1. Users sign up or log in via a modal form.
2. JWT token is returned and stored in `localStorage`.
3. Token is sent in headers for protected API routes.
4. Only authenticated users can add or edit recipes.

---

## 🖼️ UI Snapshots

**Home Page with Recipe List**

![Home Page1](image.png)
![Home Page2](image-1.png)

---

## 🧑‍💻 Author

**Vedant Deshmukh**

- GitHub: [@Vedantspit](https://github.com/Vedantspit)
- LinkedIn: [Vedant Deshmukh](https://www.linkedin.com/in/vedant-deshmukh-47b1a122a/)
