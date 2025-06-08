# 🥄 Spatula – Recipe App

Spatula is a modern recipe browsing app built with **React** and **Vite**. Users can search for recipes, filter by cuisine, view recipe details, and save favorites. The project uses the **Spoonacular API**.

---

## 📦 Dependencies (Installed Packages)

- **React** + **Vite**
- **SCSS** (modular styling)
- **Axios** (HTTP requests)
- **React Router DOM** (routing)
- **FontAwesome** & **React Icons**
- **LocalStorage** (favorites)
- **Spoonacular API**
- **Lucide React** (icon library)
- **Swiper** (carousel slider (veggie/trending section))
- **Sweetalert2** (toast alert - favorites)
- **Node.js** + **Express** backend for auth
- **bcryptjs**, **jsonwebtoken**, **CORS**

---

## 🔧 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/MarkoDj-2912/spatula.git
cd spatula
```

2. 📦 Install dependencies
   Install all client dependencies:

npm install

For each dependency manually here are the exact commands:

npm install react react-dom react-router-dom
npm install axios sass
npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
npm install react-icons
npm install lucide-react
npm install swiper

3. ⚙️ Environment Variables
   Create a .env file in the root directory and add your Spoonacular

API key:
VITE_SPOONACULAR_API_KEY=your_api_key_here

4. 🔐 Backend Setup (Auth API)
   This app uses a simple Node.js + Express backend for user registration and login, storing data in a users.json file.

📁 Backend Directory Structure
Create a folder called server with these files:

server/
├── server.js
└── controllers/
└── authController.js

🛠 Install backend dependencies
Navigate to server/ folder and install required packages:

cd server
npm init -y
npm install express bcryptjs jsonwebtoken cors

💾 Features Overview

\*Search recipes using Spoonacular API

\*Filter by category (Cuisine, Meat, Healthy Diet, etc.)

\*View recipe details with ingredients and instructions

\*Save favorites to localStorage

\*Register/login system with basic JWT auth (local file storage)

\*Responsive navigation with dropdowns

\*Modern SCSS UI with animations
