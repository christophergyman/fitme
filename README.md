# FitMe

A personal fitness tracker with a GitHub-style contribution grid interface. Track your daily training activities and diet to visualize your fitness journey throughout the year.

## Features

- **GitHub-style Contribution Grid** - Visual representation of your fitness activities with color-coded intensity levels
- **Activity Tracking** - Log physical training, cardio workouts, and diet quality
- **Year Navigation** - Browse through your fitness history (last 5 years)
- **Dark/Light Theme** - Toggle between themes with persistence
- **Activity Scoring** - Automatic intensity calculation based on activities:
  - Physical Training: +2 points
  - Cardio: +1 point
  - Good Diet: +1 point

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- CSS (no external UI libraries)

### Backend
- Node.js / Express
- TypeScript
- SQLite (better-sqlite3)

### Infrastructure
- Docker & Docker Compose
- Nginx (production)

## Project Structure

```
fitme/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server entry point
│   │   ├── database/         # SQLite initialization
│   │   └── routes/           # API route handlers
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main application component
│   │   ├── components/       # React components
│   │   │   ├── ActivityModal/
│   │   │   ├── ContributionGrid/
│   │   │   └── Legend/
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # TypeScript interfaces
│   │   └── utils/            # Utility functions
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── data/                     # SQLite database storage
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker & Docker Compose (for containerized deployment)
  - macOS: Install via Homebrew with `brew install docker docker-compose colima` then start with `colima start`

### Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```
The API server runs at `http://localhost:3001`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
The development server runs at `http://localhost:5173`

### Production (Docker)

```bash
docker-compose up --build
```

Access the application at `http://localhost`

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `/data/fitme.db` | Path to SQLite database file |
| `PORT` | `3001` | API server port |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | API base URL (uses nginx proxy in production) |

## Data Persistence

The SQLite database is stored in the `./data` directory on your host machine via Docker volume mount:

```yaml
volumes:
  - ./data:/data
```

**Your data persists across:**
- Container restarts (`docker-compose restart`)
- Container rebuilds (`docker-compose up --build`)
- Host machine reboots

**Your data is lost if you:**
- Run `docker-compose down -v` (the `-v` flag removes volumes)
- Delete the `./data` directory manually

### Backup & Restore

**Backup:**
```bash
cp ./data/fitme.db ./data/fitme.db.backup
```

**Restore:**
```bash
cp ./data/fitme.db.backup ./data/fitme.db
docker-compose restart backend
```

## Port Mapping

| Service | Container Port | Host Port |
|---------|----------------|-----------|
| Frontend (nginx) | 80 | 80 |
| Backend (API) | 3001 | 3001 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Fetch activities by date range |
| GET | `/api/activities/:date` | Get activity for a specific date |
| PUT | `/api/activities/:date` | Create or update an activity |
| DELETE | `/api/activities/:date` | Delete an activity |
| GET | `/api/health` | Health check endpoint |

### Query Parameters

**GET /api/activities**

| Parameter | Type | Description |
|-----------|------|-------------|
| `start` | string | Start date (YYYY-MM-DD) |
| `end` | string | End date (YYYY-MM-DD) |

Example: `GET /api/activities?start=2024-01-01&end=2024-12-31`

### Activity Schema

```typescript
{
  date: string;           // YYYY-MM-DD format
  training_type: 'physical' | 'cardio' | 'none';
  diet: 'good' | 'bad' | null;
}
```

## Color Intensity Levels

| Score | Activities | Color |
|-------|------------|-------|
| 0 | None | Gray |
| 1 | Cardio OR Good Diet | Yellow |
| 2 | Physical OR Cardio + Diet | Orange |
| 3 | Physical + Good Diet | Red |

## Troubleshooting

### better-sqlite3 build errors in Docker

If you see `ERR_DLOPEN_FAILED` or native module errors, ensure:
1. The `.dockerignore` file excludes `node_modules` (prevents copying host binaries)
2. The Dockerfile includes build dependencies: `apk add --no-cache python3 make g++`

### Docker not found on macOS

Use Colima instead of Docker Desktop:
```bash
brew install docker docker-compose colima
colima start
```

### Database locked errors

Stop any running development servers before starting Docker:
```bash
# Kill local dev servers
pkill -f "npm run dev"

# Then start Docker
docker-compose up
```

### Frontend can't connect to API

In development, ensure both servers are running:
- Backend on `http://localhost:3001`
- Frontend on `http://localhost:5173`

In production (Docker), the nginx proxy handles routing `/api` requests to the backend.

## License

Personal project - not licensed for public use.
