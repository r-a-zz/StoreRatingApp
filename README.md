# Roxiler Store Ratings App

A full-stack web application for store ratings with role-based access.

## Tech Stack

- **Backend:** Express.js, PostgreSQL (Sequelize ORM)
- **Frontend:** React.js

## Features

- User authentication (JWT)
- Roles: System Administrator, Normal User, Store Owner
- CRUD for users and stores
- Rating system (1-5 stars)
- Dashboards for admin and store owner
- Form validation
- Sorting/filtering on tables
- Password update
- Search functionality

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL installed and running

### Database Setup

1. Create a PostgreSQL database named `roxiler_db` (using pgAdmin, psql, or your preferred tool)

### Backend Setup

1. Navigate to `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Copy the environment template: `cp ../.env.example .env`
4. Edit `.env` file with your PostgreSQL credentials and a secure JWT secret
5. Start server: `npm start` (runs on port 5000)

### Frontend Setup

1. Navigate to `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start React app: `npm run dev` (runs on port 5173)

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=roxiler_db
POSTGRES_USER=your_database_user
POSTGRES_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret_here
```

### Demo Credentials

After starting the backend, demo users are automatically created:

- **Admin:** email: `admin@example.com`, password: `Admin@123`
- **User:** email: `demo@example.com`, password: `DemoUser@123`
- **Owner:** email: `owner@example.com`, password: `Owner@123`

Use these to test different roles.

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open http://localhost:5173 in your browser
4. Login with demo credentials or create new accounts
5. Explore the dashboards and features based on your role

## API Documentation

The backend provides RESTful APIs for all operations. Key endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/stores` - Get all stores (with search/sort)
- `POST /api/ratings` - Submit rating
- `GET /api/users` - Admin: Get all users
- `POST /api/users` - Admin: Create user
- `POST /api/stores` - Admin/Owner: Create store

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Input validation on both client and server
- Sensitive data excluded from version control (.env files)
POSTGRES_DB=MyProjectDB
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_here
```

**Security Note:** Never commit `.env` files to version control. The `.env` file is already added to `.gitignore`.

## Demo User

For quick testing, a demo user is automatically seeded on server start:

- **Email:** demo@example.com
- **Password:** DemoPass123!
- **Role:** Normal User

Use this to log in and test features like viewing stores, submitting ratings, etc.

## Usage

1. Start backend and frontend as above.
2. Open `http://localhost:3000` in your browser.
3. Sign up or use the demo user to log in.
4. Explore dashboards, stores, ratings based on your role.

## Project Status

All requirements implemented:

- Authentication, roles, CRUD, ratings, dashboards, validation, sorting/filtering, password update, search
- Database migrated to PostgreSQL
- See `.github/copilot-instructions.md` for workflow and customization steps
