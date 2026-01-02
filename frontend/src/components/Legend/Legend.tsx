import { getColorForScore } from '../../utils/colorUtils';
import './Legend.css';

export function Legend() {
  const levels = [0, 1, 2, 3];

  return (
    <div className="legend">
      <span className="legend-label">Less</span>
      <div className="legend-squares">
        {levels.map((level) => (
          <div
            key={level}
            className="legend-square"
            style={{ backgroundColor: getColorForScore(level) }}
            title={`Activity level ${level}`}
          />
        ))}
      </div>
      <span className="legend-label">More</span>
    </div>
  );
}
