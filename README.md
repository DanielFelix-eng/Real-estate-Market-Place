# 🏠 JardiniHomes

A full-stack real estate marketplace where users can browse, list, and manage rental and sale properties — built with the MERN stack and deployed on Render.

**🔗 Live Demo:** [jardini-homes.onrender.com](https://jardini-homes.onrender.com)  
**📁 GitHub:** [github.com/your-username/jardini-homes](/https://github.com/DanielFel/jardini-homes) <!-- replace with actual repo URL -->

---

## 📸 Screenshots

| Search Page | Homepage Listings | Create Property |
|---|---|---|
| Property grid with filter UI | Carousel of newest listings | Multi-step listing form |

---

## ✨ Features

- **Property Listings** — Browse rental and sale properties with images, price, beds/baths, and furnishing status
- **Discount Offers** — Listings support a discounted price shown with strikethrough on the original
- **Search & Filter** — Search properties by name/location with live results
- **Create & Manage Listings** — Authenticated users can publish new properties with photo uploads
- **User Profiles** — Update name, email, avatar, and password from a single dashboard
- **Account Deletion** — Password-confirmed account removal
- **Show My Listings** — View all properties published by the logged-in user
- **Dark Mode UI** — Full dark theme with a coral accent (`#FF385C`) across the app
- **JWT Authentication** — Secure token-based auth with protected routes

---

## 🛠 Tech Stack

### Frontend
- **React** (Vite)
- **TailwindCSS** — utility-first styling
- **Zustand** — global auth state
- **Axios** — HTTP client with interceptors
- **React Router v6** — client-side routing

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — database and ODM
- **JWT** — authentication middleware (`req.user`)
- **bcryptjs** — password hashing

### Storage & Services
- **Appwrite Storage** — property image uploads
- **Resend** — transactional email (custom domain via Dynadot)

### Deployment
- **Render** — full-stack deployment (Express serves the Vite build as static files)

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster (or local MongoDB)
- Appwrite project with a storage bucket

### 1. Clone the repo

```bash
git clone https://github.com/your-username/jardini-homes.git
cd jardini-homes
```

### 2. Install dependencies

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_BUCKET_ID=your_bucket_id
APPWRITE_API_KEY=your_api_key

RESEND_API_KEY=your_resend_api_key
```

### 4. Run locally

```bash
# In root — start backend
npm run dev

# In /frontend — start Vite dev server
npm run dev
```

The backend runs on `http://localhost:5000` and Vite proxies API calls to it.

### 5. Build for production

```bash
cd frontend
npm run build
```

The Express server serves the `frontend/dist` folder in production.

---

## 📁 Project Structure

```
jardini-homes/
├── backend/
│   ├── controllers/
│   ├── middleware/       # JWT auth (verifyToken)
│   ├── models/           # User, Property schemas
│   ├── routes/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, PropertyCard, etc.
│   │   ├── pages/        # Home, Search, Profile, CreateProperty
│   │   ├── store/        # Zustand auth store
│   │   └── main.jsx
│   └── vite.config.js
├── .env
└── package.json
```

---

## 🔐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register new user |
| POST | `/api/auth/signin` | — | Login, returns JWT |
| GET | `/api/users/profile` | ✅ | Get current user |
| PUT | `/api/users/update/:id` | ✅ | Update profile |
| DELETE | `/api/users/delete/:id` | ✅ | Delete account |
| GET | `/api/properties` | — | Get all listings |
| GET | `/api/properties/search` | — | Search/filter listings |
| GET | `/api/properties/:id` | — | Get single listing |
| POST | `/api/properties/create` | ✅ | Create new listing |
| PUT | `/api/properties/update/:id` | ✅ | Update listing |
| DELETE | `/api/properties/delete/:id` | ✅ | Delete listing |

---

## 🌐 Deployment on Render

1. Push your repo to GitHub
2. Create a new **Web Service** on Render, pointing to the repo root
3. Set **Build Command:** `npm install && cd frontend && npm install && npm run build`
4. Set **Start Command:** `node backend/index.js`
5. Add all environment variables in the Render dashboard
6. Deploy — Render serves everything from a single instance

---

## 📄 License

MIT © [Jardini Felix](https://github.com/your-username)
