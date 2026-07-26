# Habit Tracker Backend

## Overview

This repository contains the backend API for a habit tracker application built with Node.js, TypeScript, Express, and Prisma. It includes authentication, habit management, and check-in tracking.

## Architecture

- `src/app.ts` - Initializes the Express application, middleware, and base routes.
- `src/server.ts` - Starts the HTTP server and loads environment configuration.
- `src/app/config/env.ts` - Loads and validates required environment variables.
- `src/app/routes/index.ts` - Aggregates primary API routes under `/api/v1`.
- `src/app/middleware` - Contains global error handling and 404 not-found middleware.
- `src/app/modules` - Contains feature modules for auth, habit, and checkin.
- `src/app/shared` - Shared helper utilities like async error handling and response formatting.
- `src/app/utils` - Utility helpers for cookies, JWTs, and token management.
- `prisma/schema` - Prisma data model definitions for authentication, habits, check-ins, and enums.
- `prisma/migrations` - Database migration history.

## Folder Structure

```
habit-tracker-backend/
│
├─ prisma/
│  ├─ migrations/         # Generated Prisma migration SQL files
│  └─ schema/             # Prisma schema files (auth, habit, checkIn, enums, main schema)
│
├─ src/
│  ├─ app.ts              # Express application setup
│  ├─ server.ts           # Server startup and bootstrap logic
│  ├─ app/
│  │  ├─ config/          # Environment and application configuration
│  │  ├─ errorHelpers/    # Custom error class definitions
│  │  ├─ interfaces/      # Shared TypeScript interfaces
│  │  ├─ lib/             # Authentication and Prisma client helpers
│  │  ├─ middleware/      # Express middleware stack
│  │  ├─ modules/         # API modules by domain
│  │  │  ├─ auth/         # Auth routes, controllers, services
│  │  │  ├─ habit/        # Habit routes, controllers, services
│  │  │  └─ checkin/      # Check-in routes, controllers, services
│  │  ├─ routes/          # Route aggregation
│  │  ├─ shared/          # Shared helper utilities
│  │  └─ utils/           # Utility helpers for JWTs, cookies, tokens
│  └─ generated/          # Generated Prisma client types and models
```

## Key Routes

The API is mounted under `/api/v1`.

### Health

- `GET /` - API health check

### Auth Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me/:userId` - Get current user profile
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/all-users` - Get all users (admin only)
- `PATCH /api/v1/auth/update-status` - Update user status (admin only)

### Habits Endpoints

- `POST /api/v1/habits/` - Create a new habit
- `GET /api/v1/habits/users/:userId` - Get all habits for a user
- `GET /api/v1/habits/:habitId` - Get habit details by ID
- `PATCH /api/v1/habits/:habitId/update` - Update a habit
- `DELETE /api/v1/habits/:habitId` - Delete a habit
- `PATCH /api/v1/habits/:habitId/archive` - Archive a habit

### Check-in Endpoints

- `PATCH /api/v1/checkins/toggle/:habitId` - Toggle a habit check-in
- `GET /api/v1/checkins/home` - Get home view data for check-ins
- `GET /api/v1/checkins/:habitId/details` - Get details for a habit's check-ins

There is also a health route at `/` which returns a basic API status JSON.

## Environment Variables

The application requires the following environment variables to be set, typically in a `.env` file:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRES_IN`
- `REFRESH_TOKEN_EXPIRES_IN`
- `BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN`
- `BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE`
- `FRONTEND_URL`

## Scripts

- `npm run dev` - Start the server with `tsx watch` for local development.
- `npm run build` - Generate Prisma client and compile TypeScript.
- `npm start` - Run the compiled production server from `dist/server.js`.
- `npm run migrate` - Run Prisma migrations.
- `npm run generate` - Generate Prisma client.
- `npm run studio` - Open Prisma Studio.
- `npm run push` - Push Prisma schema to the database.
- `npm run pull` - Pull database schema into Prisma.
- `npm run lint` - Lint the `src` files with ESLint.

## Notes for Developers

- The backend uses Prisma with a PostgreSQL database.
- `@prisma/client` is generated from the schema definitions in `prisma/schema`.
- `better-auth` is used for authentication-related functionality.
- Shared middleware handles global errors and 404 responses.
- Follow the existing module pattern when adding new domains or features.

## Getting Started

1. Copy or create a `.env` file with the required environment variables.
2. Install dependencies with `npm install`.
3. Run `npm run dev` to start the development server.
4. Use Prisma commands to manage migrations and database state.

## Contact

If you need help or want to contribute, review the route modules in `src/app/modules` and follow the existing controller/service architecture.
