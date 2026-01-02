import { useMemo } from 'react';
import type { Activity, DayCell } from '../../types';
import { generateYearGrid, getMonthLabels } from '../../utils/dateUtils';
import { DaySquare } from './DaySquare';
import { MonthLabels } from './MonthLabels';
import './ContributionGrid.css';

interface ContributionGridProps {
  year: number;
  activities: Map<string, Activity>;
  onDayClick: (dateString: string) => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function ContributionGrid({ year, activities, onDayClick }: ContributionGridProps) {
  const weeks = useMemo(() => generateYearGrid(year), [year]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  return (
    <div className="contribution-grid">
      <MonthLabels months={monthLabels} />
      <div className="grid-wrapper">
        <div className="day-labels">
          {DAY_LABELS.map((label, index) => (
            <span key={label} className={`day-label ${index % 2 === 0 ? 'day-label--visible' : ''}`}>
              {index % 2 === 1 ? label : ''}
            </span>
          ))}
        </div>
        <div className="grid-container">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week-column">
              {week.map((day: DayCell) => (
                <DaySquare
                  key={day.dateString}
                  day={day}
                  activity={activities.get(day.dateString) || null}
                  onClick={onDayClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
