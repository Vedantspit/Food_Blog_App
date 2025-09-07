# 🥗 FoodShare Web – MERN Stack App

A full-stack **Food Recipe Sharing Website** where users can register, log in securely, share their favorite food recipes, manage their own recipes, and interact with a **chefbot AI assistant**.

---

## 🌐 Hosted Link

Check out the live app here: <a href="https://foodshare-blog.vercel.app/" target="_blank">FoodShare Web Live</a>

---

## 🚀 Features

- 📝 **Recipe Management** – Create, edit, view recipes
- ❤️ **Favorites & My Recipes** – Save your favorite recipes and manage your own recipes
- 🤖 **AI Chatbot Assistant** – Ask any recipe-related questions or get cooking suggestions
- 🔐 **JWT Authentication** – Secure login and signup
- 🛡️ **Protected Routes** – Token-based access control
- 🎨 **Responsive UI** – Built with Tailwind CSS, mobile & desktop compatible
- 🧠 **Modular Frontend** – Component-based React architecture

---

## 🧱 Tech Stack

**MERN Stack:**

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **AI Assistant:** OpenAI API for recipe chat functionality

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
OPENAI_API_KEY=your_openai_api_key
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

## 🖼️ UI Snapshots

**Home Page with Recipe List**

![Home Page1](home1.png)
![Home Page2](home2.png)

**Add Recipe**

![Add Recipe](addrecipe.png)

**AI Chatbot Assistant**

![Chatbot](llm.png)

---

## 🧑‍💻 Author

**Vedant Deshmukh**

- GitHub: <a href="https://github.com/Vedantspit" target="_blank">@Vedantspit</a>
- LinkedIn: <a href="https://www.linkedin.com/in/vedant-deshmukh-47b1a122a/" target="_blank">Vedant Deshmukh</a>
