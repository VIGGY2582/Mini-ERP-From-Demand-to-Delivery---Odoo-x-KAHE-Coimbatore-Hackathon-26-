# Mini ERP System - Foundation & Architecture Setup

A production-ready foundation for an enterprise-grade Mini ERP system. It features an Express + Prisma backend and a React + Vite + Bootstrap frontend, using a clean layered architecture (Routes -> Controllers -> Services -> Repositories) and robust API structures.

## Tech Stack

### Frontend
- **Framework**: React 19 (initialized via Vite)
- **Routing**: React Router DOM v6
- **State Management / Data Fetching**: TanStack React Query (v5)
- **Styling**: Bootstrap 5 & React Bootstrap
- **Icons**: React Icons
- **Forms & Validation**: React Hook Form & Zod
- **HTTP Client**: Axios

### Backend
- **Platform**: Node.js (ES Modules)
- **Framework**: Express.js
- **ORM**: Prisma ORM
- **Database**: PostgreSQL
- **Security**: CORS, Helmet, JWT, bcrypt, cookie-parser
- **Validation**: express-validator
- **Logging**: Winston
- **File Uploads**: Multer

---

## Folder Structure

```
mini-erp/
│
├── frontend/             # Frontend React codebase
│   ├── src/
│   │   ├── assets/       # Static assets (images, fonts)
│   │   ├── components/   # Shared UI components
│   │   ├── layouts/      # Layout containers (Dashboard, Auth, etc.)
│   │   ├── pages/        # Router page components
│   │   ├── routes/       # Route setup & guards (Protected, Public)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # Context providers
│   │   ├── services/     # API services & Axios instances
│   │   ├── utils/        # Utility helpers
│   │   ├── styles/       # CSS stylesheets
│   │   └── App.jsx       # App entry point
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Backend Node.js codebase
│   ├── config/           # App configurations (logger, DB client)
│   ├── controllers/      # Route logic & request handlers
│   ├── middleware/       # Custom middlewares (auth, errors, requests)
│   ├── models/           # Prisma DB schema & model definitions
│   ├── prisma/           # Prisma schema & migrations
│   ├── routes/           # API routes definition
│   ├── services/         # Core business logic rules
│   ├── repositories/     # Data access layer rules (Prisma transactions)
│   ├── utils/            # Helper functions
│   ├── validations/      # Express-validator schemas
│   ├── logs/             # Express/Winston system logs
│   ├── uploads/          # Multer storage uploads
│   ├── app.js            # Express app initialization
│   ├── server.js         # HTTP server entry point
│   └── package.json
│
├── docs/                 # API and architecture specs
├── .gitignore            # Workspace gitignore
├── README.md             # This document
└── package.json          # Root npm script runner
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v20.x or higher)
- **PostgreSQL** running locally or remotely

### 1. Root Dependencies Setup
From the workspace root, run the following to install all root dependencies (like `concurrently`):
```bash
npm install
```

### 2. Backend Configuration
Navigate to the `backend` folder, copy `.env.example` to `.env`, and update the database connection credentials:
```bash
cd backend
cp .env.example .env
```
Inside `.env`, configure the `DATABASE_URL` for PostgreSQL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mini_erp?schema=public"
```

Then install dependencies, initialize Prisma and generate the client:
```bash
npm install
npx prisma generate
```

### 3. Frontend Configuration
Navigate to the `frontend` folder and install dependencies:
```bash
cd ../frontend
npm install
```

---

## Running the Application

### Running Both Frontend & Backend Concurrently
You can launch both development servers concurrently from the root directory:
```bash
npm run dev
```
- **Backend Port**: `http://localhost:5000` (API endpoint prefix: `/api/v1`)
- **Frontend Port**: `http://localhost:3000`

---

## Future ERP Modules
The skeleton is prepared with router/controller/service/repository boundaries to support:
1. **Authentication** (JWT, roles mapping)
2. **Employee Management**
3. **Role & Permissions Management**
4. **Product Catalog & Categorization**
5. **Inventory & Warehouse Stock Control**
6. **Sales & Customers Management**
7. **Purchase & Vendors Management**
8. **Bill of Materials (BOM) & Manufacturing**
9. **Stock Ledger & Audit Logging**
10. **Reports & Dashboards**
