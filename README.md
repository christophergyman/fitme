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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Fetch activities by date range |
| GET | `/api/activities/:date` | Get activity for a specific date |
| PUT | `/api/activities/:date` | Create or update an activity |
| DELETE | `/api/activities/:date` | Delete an activity |
| GET | `/api/health` | Health check endpoint |

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

## License

Personal project - not licensed for public use.
