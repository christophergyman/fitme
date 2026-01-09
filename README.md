# FitMe

Personal fitness tracker with a GitHub-style contribution grid. Log daily fitness activities and visualize your progress over time.

![FitMe](assets/screenshot-light.png)

## Features

- GitHub-style contribution grid for activity visualization
- Track training type (physical, cardio) and diet quality
- Color-coded intensity based on activity score
- Year-by-year progress view
- Dark mode support

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Node.js, Express, SQLite (better-sqlite3)
- **Infrastructure:** Docker, nginx

## Prerequisites

- Node.js 18+
- npm 9+
- Docker (optional, for containerized deployment)

## Dependencies

### Backend

| Package | Version | Description |
|---------|---------|-------------|
| express | ^4.21.2 | Web framework |
| better-sqlite3 | ^11.7.0 | SQLite database driver |
| cors | ^2.8.5 | Cross-origin resource sharing |

### Frontend

| Package | Version | Description |
|---------|---------|-------------|
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | React DOM renderer |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/chezu/fitme.git
cd fitme

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run both servers
./run.sh
```

The backend runs on `http://localhost:3001` and frontend on `http://localhost:5173`.

### Docker Deployment

```bash
docker-compose up --build
```

## Development

```bash
# Run backend only
cd backend && npm run dev

# Run frontend only
cd frontend && npm run dev

# Build for production
cd backend && npm run build
cd frontend && npm run build

# Lint frontend
cd frontend && npm run lint
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities?start=YYYY-MM-DD&end=YYYY-MM-DD` | List activities in date range |
| GET | `/api/activities/:date` | Get activity for specific date |
| PUT | `/api/activities/:date` | Create or update activity |
| DELETE | `/api/activities/:date` | Delete activity |
| GET | `/api/health` | Health check |

## Activity Scoring

Grid color intensity is based on cumulative score (0-3):

| Activity | Points |
|----------|--------|
| Physical training | +2 |
| Cardio | +1 |
| Good diet | +1 |

Score to color mapping: 0 = empty, 1 = yellow, 2 = orange, 3 = red

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Backend server port |
| `DATABASE_PATH` | ./data/fitme.db | SQLite database path |

## Project Structure

```
fitme/
├── backend/
│   └── src/
│       ├── index.ts          # Express server setup
│       ├── routes/           # API route handlers
│       └── database/         # SQLite schema and connection
├── frontend/
│   └── src/
│       ├── App.tsx           # Main component
│       ├── components/       # React components
│       ├── hooks/            # Custom hooks
│       └── utils/            # Helper functions
├── docker-compose.yml
└── run.sh
```

## License

Personal project - not licensed for public use.
