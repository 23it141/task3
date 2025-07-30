# HabitHut 🔁🔥

**A simple MERN stack habit tracker where users can build positive routines with daily check-ins and streak tracking.**

## 🔧 Tech Stack

- **React** + TailwindCSS + react-calendar (Frontend)
- **Node.js** + Express (Backend)
- **MongoDB** + Mongoose (Database)

## ✨ Features

- Register/Login system
- Add/edit/delete habits
- Daily check-in system
- Weekly streak calculation
- Visual calendar using `react-calendar`

## 📦 Setup Instructions

### 1. Install backend dependencies
```bash
cd server
npm install
cp .env.example .env
# Fill in MongoDB URI and JWT_SECRET
npm run dev
```

### 2. Install frontend dependencies
```bash
cd ../client
npm install
npm run dev
```
