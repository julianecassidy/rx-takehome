# Rx Resource

This fullstack medicine cabinet app enables users to:

- signup or login to an account
- search for "prescriptions"
- hit api to return random data
- see the prescriptions in a "prescription card"
- save prescriptions to their medicine cabinet
- view their medicine cabinet

### Login Info
If the database is seeded with the included seed file, you can log in with:
 - test@test.com
 - password

### Known Bugs and Features to Be Implemented
- logout (if you would like to log out currently, you'll need to clear localStorage and refresh)
- schema updates: Ideally medId and userId on the Rx model will have a unique together constraint and associated error handling.
- error handling in general: Using the app outside of expected actions will not go well. Try a refresh if you get stuck somewhere.
- password hashing and improved authentication/authorization
- protecting routes from non-logged-in users

## Tech Stack

- TypeScript
- React
- Vite
- Zustand
- TanStack Router
- Express.js
- tRPC
- Postgres
- Tailwind CSS
- DaisyUI
- Turborepo

### Structure and Organization

- `@repo/web`: Vite, React, TanStack Router, Zustand, and tRPC Client
- `@repo/api`: Express.js, Prisma, and tRPC Server
- `@repo/eslint-config`: `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: `tailwind.config` used throughout the repo

## Setup

To get started, clone the repository and install the dependencies:

```
pnpm install
```

Then, copy the `.env.example` file to `.env` in the web/ folder and the api/ folder and
fill in the necessary environment variables.

### web/
For local development, the default values in will work. If you want to deploy the
app, you will need to specify where the backend is
hosted.

```
cp ./apps/web/.env.example ./apps/web/.env
```
### api/
For the api/ you will need to update the database with your local db credentials.

```
cp ./apps/api/.env.example ./apps/api/.env
```

### Database migrations
Migrate the database to create tables in local db.

```
cd apps/api
pnpm prisma migrate dev --name init
```

### Database seeding
Seed the database with the included seed file to get medications, users, and initial user prescriptions.

```
cd apps/api
pnpm prisma db seed
```

### Develop

To run all apps and packages in development mode, run the following command:

```
pnpm dev
```

The app is configured to run on 3000 for the backend and 5173 for the frontend, unless environmental variables are set.

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

