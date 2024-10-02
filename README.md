# Rx Resource

This fullstack medicine cabinet app enables users to:

- search for "prescriptions"
- hit api to return random data
- see the prescriptions in a "prescription card"
- save prescriptions to their medicine cabinet
- view their medicine cabinet

## Tech Stack

- TypeScript
- React
- Vite
- Express.js
- tRPC
- Postgres
- Tailwind CSS
- DaisyUI
- Turborepo

### Structure and Organization

- `@repo/web`: Vite, React, TanStack Router and tRPC Client
- `@repo/api`: Express.js, Prisma? and tRPC Server
- `@repo/eslint-config`: `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: `tailwind.config` used throughout the repo

## Setup

To get started, clone the repository and install the dependencies:

```
pnpm install
```

Then, copy the `.env.example` file to `.env` in the web/ folder and fill in the necessary environment variables. For local development, the defaul value will work. If you want to deploy the app, you will need to specify where the backend is hosted.

```
cp ./apps/web/.env.example ./apps/web/.env
```

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To run all apps and packages in development mode, run the following command:

```
pnpm dev
```
