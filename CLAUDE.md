# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitMe is a personal fitness tracker with a GitHub-style contribution grid. Users log daily fitness activities (training type, diet) and visualize progress in a color-coded grid where intensity reflects activity score.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Node.js, Express, better-sqlite3
- **Infrastructure:** Docker, nginx

## Development Commands

```bash
# Install dependencies (from project root)
cd backend && npm install && cd ../frontend && npm install

# Run both servers (recommended)
./run.sh
# Backend runs on port 3001, frontend on port 5173

# Or run separately:
cd backend && npm run dev    # tsx watch
cd frontend && npm run dev   # vite dev server

# Build
cd backend && npm run build   # TypeScript to dist/
cd frontend && npm run build  # tsc + vite build

# Lint (frontend only)
cd frontend && npm run lint

# Docker deployment
docker-compose up --build
```

## Architecture

### Frontend (`frontend/`)
- `src/App.tsx` - Main component with year selector and dark mode toggle
- `src/components/ContributionGrid/` - GitHub-style activity grid
- `src/components/ActivityModal/` - Modal for editing daily activities
- `src/components/ActivityOverview/` - SVG stats chart
- `src/hooks/useActivityData.ts` - API communication and state management
- `src/utils/colorUtils.ts` - Activity score calculation and color mapping
- `src/utils/dateUtils.ts` - Calendar grid generation

### Backend (`backend/`)
- `src/index.ts` - Express server setup
- `src/routes/activities.ts` - CRUD endpoints for activities
- `src/database/init.ts` - SQLite schema and connection

### API Endpoints

All under `/api/activities`:
- `GET /api/activities?start=YYYY-MM-DD&end=YYYY-MM-DD` - List activities in range
- `GET /api/activities/:date` - Get single activity
- `PUT /api/activities/:date` - Create/update activity
- `DELETE /api/activities/:date` - Delete activity
- `GET /api/health` - Health check

### Data Model

```typescript
type TrainingType = 'physical' | 'cardio' | 'none';
type DietType = 'good' | 'bad' | null;

interface Activity {
  id: number;
  date: string;          // YYYY-MM-DD
  training_type: TrainingType;
  diet: DietType;
  created_at: string;
  updated_at: string;
}
```

### Activity Score System

Grid color intensity based on cumulative score (0-3):
- Physical training: +2 points
- Cardio: +1 point
- Good diet: +1 point

Score maps to colors: 0=empty, 1=yellow (#f9c74f), 2=orange (#f8961e), 3=red (#f94144)

## Environment Variables

- `PORT` - Backend server port (default: 3001)
- `DATABASE_PATH` - SQLite database path (default: ./data/fitme.db)
