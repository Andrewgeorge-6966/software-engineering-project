# CampusCare

CampusCare is a full-stack campus maintenance platform for reporting facility problems and coordinating their resolution. The project combines an Expo/React Native mobile application with an Express API, Prisma ORM, PostgreSQL, and Supabase Storage.

Community members can submit issues and verify completed work, workers can manage assigned tasks and upload completion evidence, facility managers can triage and assign reports, and administrators can manage users and categories.

> **Project status:** academic full-stack prototype. The main issue-management workflow is implemented, but the development-only debug and password-reset flows should be hardened before a production deployment.

## Highlights

- Role-based experiences for community members, workers, facility managers, and administrators
- JWT authentication, account verification, and role-based API authorization
- Issue reporting with category, location, priority, and photo support
- Assignment, in-progress, completion, rejection, rework, and resolution workflows
- Completion-photo history and requester verification
- In-app notifications for important workflow events
- Points and worker leaderboards
- Manager and administrator analytics
- User activation, verification, role, password, and category administration

## Architecture

```text
Expo / React Native app
        |
        | REST API + JWT
        v
Node.js / Express API
        |
        +---- Prisma ORM ---- PostgreSQL (Supabase)
        |
        +---- Supabase Storage (issue and completion photos)
```

```text
CampusCare/
├── mobile/                 # Expo Router mobile application
│   ├── app/                # Role-based screens and navigation
│   └── src/                # API clients, UI components, state, and utilities
├── src/
│   ├── controllers/        # Authentication and workflow handlers
│   ├── middleware/         # Authentication, RBAC, rate limiting, and uploads
│   ├── routes/             # Express route definitions
│   ├── services/           # Notifications, categories, points, and assignments
│   └── utils/              # Shared backend utilities
├── prisma/                 # Prisma schema and current database migration
├── scripts/                # Backend audits and workflow verification scripts
├── API.md                  # Detailed REST API reference
├── DOCUMENTATION.md        # Extended schema and project documentation
└── index.js                # API entry point
```

## Technology Stack

| Layer | Technologies |
|---|---|
| Mobile | React Native 0.81, Expo 54, Expo Router 6, TypeScript, Axios |
| API | Node.js, Express 5, JavaScript, JWT, bcrypt, Multer |
| Data | PostgreSQL, Prisma 5 |
| Cloud services | Supabase database and object storage |
| Quality checks | ESLint, TypeScript, backend audit and workflow scripts |

## Getting Started

### Prerequisites

- Node.js 20 LTS and npm
- A PostgreSQL database (the project was developed with Supabase)
- A Supabase project and Storage bucket if photo uploads are required
- Expo Go, an iOS simulator, or an Android emulator for the mobile client

### 1. Install the API dependencies

```bash
git clone <your-repository-url>
cd CampusCare
npm install
```

### 2. Configure the API

Copy the safe template and replace each placeholder with your own development values:

```bash
cp .env.example .env
```

Required values are documented in [`.env.example`](./.env.example). Never commit the resulting `.env` file.

### 3. Prepare the database

Generate the Prisma client and synchronize an empty development database with the current schema:

```bash
npx prisma generate
npx prisma db push
```

The checked-in migration aligns a pre-existing project database and is retained for that environment; it is not a complete bootstrap migration for a new database.

### 4. Start the API

```bash
npm start
```

The API defaults to `http://localhost:3000`. Confirm it is available at `http://localhost:3000/health`.

### 5. Install and configure the mobile app

```bash
cd mobile
npm install
cp .env.example .env
```

Set `EXPO_PUBLIC_API_BASE_URL` to:

- `http://localhost:3000` for the iOS simulator or web client;
- `http://10.0.2.2:3000` for the standard Android emulator; or
- `http://<your-computer-lan-ip>:3000` for Expo Go on a physical device.

Expo public variables are embedded in the client bundle. Use only the Supabase anonymous key here—never a service-role key or another private credential.

### 6. Run the mobile app

```bash
npm start
```

From the Expo terminal, open the app in Expo Go, an emulator/simulator, or the web client.

## Available Checks

Run these commands from the repository root:

```bash
npm run backend:audit
npm run mobile:lint
npm run mobile:typecheck
npm run verify:all
```

`npm test` runs the implemented issue-flow verification script. The API workflow scripts require an accessible test database and should not be pointed at production data.

## API Documentation

The REST endpoints are documented in [API.md](./API.md). Major route groups include:

- `/api/auth` — registration, login, logout, OTP, and password reset
- `/api/issues` — issue creation, retrieval, comments, status, and worker actions
- `/api/manager` — assignment, review, analytics, and worker management
- `/api/admin` — user, category, and administrator analytics operations
- `/api/notifications` — notification retrieval and read state
- `/api/users` — leaderboards and administrator user operations

## Security and Production Notes

- Secrets are loaded from ignored environment files; the repository contains placeholder templates only.
- Passwords are hashed with bcrypt and protected routes use JWT and role checks.
- Registration and login endpoints use rate limiting.
- The current password-reset flow returns a reset token to the client for development. Replace it with a verified email-delivery flow before deployment.
- The debug route and permissive development CORS configuration must be disabled or restricted before exposing the API publicly.
- The in-memory token revocation store is suitable only for a single development process; use a shared persistent store in a scaled deployment.
- Validate storage policies and use least-privilege Supabase credentials before deployment.

## Further Documentation

- [Detailed API reference](./API.md)
- [Extended project documentation](./DOCUMENTATION.md)
- [Prisma data model](./prisma/schema.prisma)

## License

No open-source license has been selected yet. All rights are reserved unless a license is added by the project owner.
