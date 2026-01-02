import { useState, useEffect } from 'react';
import { ContributionGrid } from './components/ContributionGrid/ContributionGrid';
import { ActivityModal } from './components/ActivityModal/ActivityModal';
import { Legend } from './components/Legend/Legend';
import { useActivityData } from './hooks/useActivityData';
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('fitme-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('fitme-dark-mode', JSON.stringify(darkMode));
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const { activities, loading, error, updateActivity, deleteActivity, getActivity } = useActivityData(year);

  const handleDayClick = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="app">
      <header className="header">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <h1 className="title">FitMe</h1>
        <p className="subtitle">Track your fitness journey</p>
      </header>

      <main className="main">
        <div className="controls">
          <div className="year-info">
            <span className="activity-count">
              {activities.size} activities in {year}
            </span>
          </div>
          <select
            className="year-selector"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading activities...</div>
        ) : (
          <div className="grid-section">
            <ContributionGrid year={year} activities={activities} onDayClick={handleDayClick} />
            <div className="legend-wrapper">
              <Legend />
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>How it works</h3>
          <p>Click on any day to log your activity. Your score is calculated as:</p>
          <ul>
            <li><strong>Physical Training:</strong> +2 points</li>
            <li><strong>Cardio:</strong> +1 point</li>
            <li><strong>Good Diet:</strong> +1 point</li>
          </ul>
          <p>The more active you are, the more vibrant the orange!</p>
        </div>
      </main>

      {selectedDate && (
        <ActivityModal
          dateString={selectedDate}
          activity={getActivity(selectedDate)}
          onSave={updateActivity}
          onDelete={deleteActivity}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
