# CaterEase - Catering & Event Management Platform

A full-stack web application for managing catering services and event bookings. Built with **Express 5 + MongoDB** on the backend and **React 19 + Vite + Tailwind CSS 4** on the frontend.

## Features

- **User Roles** — Customer, Vendor, and Admin with role-based access
- **Event Management** — Browse, create, update, and delete events
- **Catering Packages** — Manage menus, pricing, and availability
- **Booking System** — Book events with computed pricing and status tracking
- **Authentication** — JWT-based login and registration
- **Admin Dashboard** — Statistics, user management, and booking oversight
- **Responsive UI** — Modern, mobile-friendly design with Tailwind CSS

## Tech Stack

| Layer          | Technology                                     |
| -------------- | ---------------------------------------------- |
| Backend        | Node.js, Express 5, Mongoose (MongoDB ODM)     |
| Authentication | JWT + bcryptjs                                 |
| Frontend       | React 19, React Router 7, Tailwind CSS 4       |
| Build Tool     | Vite 8                                         |
| Icons          | Lucide React                                   |

## Project Structure

```
Catering/
  backend/
    server.js              # Entry point
    src/
      app.js               # Express app config & route mounting
      config/db.js         # MongoDB connection
      controllers/         # Route handlers (auth, event, catering, booking, user, admin)
      middleware/          # Auth, admin, error, upload middleware
      models/              # Mongoose schemas (User, Event, Catering, Booking, MenuItem)
      routes/              # Express routers
      services/            # Email & payment services
      utils/               # JWT token & booking ID generators
  frontend/
    src/
      pages/               # Public, auth, events, catering, booking, customer, vendor, admin pages
      components/          # Reusable UI components
      context/             # Auth, Cart, Booking context providers
      services/            # API service layer
      routes/              # App routing with protected & admin guards
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env   # Configure MONGODB_URI, JWT_SECRET, PORT
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env   # Set VITE_API_BASE_URL to backend URL
npm install
npm run dev
```

## Scripts

### Backend

| Script   | Command              |
| -------- | -------------------- |
| `dev`    | `nodemon server.js`  |
| `start`  | `node server.js`     |

### Frontend

| Script    | Command          |
| --------- | ---------------- |
| `dev`     | `vite`           |
| `build`   | `vite build`     |
| `preview` | `vite preview`   |
| `lint`    | `oxlint`         |
