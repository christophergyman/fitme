import { useMemo } from 'react';
import type { Activity } from '../../types';
import './ActivityOverview.css';

interface ActivityOverviewProps {
  activities: Map<string, Activity>;
  year: number;
}

export function ActivityOverview({ activities, year }: ActivityOverviewProps) {
  const stats = useMemo(() => {
    let physical = 0;
    let cardio = 0;
    let goodDiet = 0;
    let restDays = 0;

    activities.forEach((activity) => {
      if (activity.training_type === 'physical') physical++;
      if (activity.training_type === 'cardio') cardio++;
      if (activity.training_type === 'none') restDays++;
      if (activity.diet === 'good') goodDiet++;
    });

    return { physical, cardio, goodDiet, restDays };
  }, [activities]);

  const total = stats.physical + stats.cardio + stats.goodDiet + stats.restDays;

  // Calculate percentages (avoid division by zero)
  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const percentages = {
    physical: getPercentage(stats.physical),
    cardio: getPercentage(stats.cardio),
    goodDiet: getPercentage(stats.goodDiet),
    restDays: getPercentage(stats.restDays),
  };

  // SVG dimensions
  const size = 200;
  const center = size / 2;
  const maxLength = 70; // Max bar length from center
  const barWidth = 8;

  // Calculate bar lengths based on percentage
  const getBarLength = (percentage: number) => {
    return (percentage / 100) * maxLength;
  };

  return (
    <div className="activity-overview">
      <h3 className="activity-overview-title">Activity overview</h3>
      <div className="activity-overview-content">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="activity-overview-chart"
          aria-label={`Activity breakdown for ${year}`}
        >
          {/* Axis lines (light gray guides) */}
          <line
            x1={center}
            y1={center - maxLength}
            x2={center}
            y2={center + maxLength}
            className="axis-line"
          />
          <line
            x1={center - maxLength}
            y1={center}
            x2={center + maxLength}
            y2={center}
            className="axis-line"
          />

          {/* Physical Training - Top */}
          <rect
            x={center - barWidth / 2}
            y={center - getBarLength(percentages.physical)}
            width={barWidth}
            height={getBarLength(percentages.physical)}
            className="bar bar-physical"
            rx={2}
          />

          {/* Good Diet - Right */}
          <rect
            x={center}
            y={center - barWidth / 2}
            width={getBarLength(percentages.goodDiet)}
            height={barWidth}
            className="bar bar-diet"
            rx={2}
          />

          {/* Rest Days - Bottom */}
          <rect
            x={center - barWidth / 2}
            y={center}
            width={barWidth}
            height={getBarLength(percentages.restDays)}
            className="bar bar-rest"
            rx={2}
          />

          {/* Cardio - Left */}
          <rect
            x={center - getBarLength(percentages.cardio)}
            y={center - barWidth / 2}
            width={getBarLength(percentages.cardio)}
            height={barWidth}
            className="bar bar-cardio"
            rx={2}
          />

          {/* Center dot */}
          <circle cx={center} cy={center} r={4} className="center-dot" />
        </svg>

        {/* Labels */}
        <div className="activity-overview-labels">
          <span className="label label-top">Physical</span>
          <span className="label label-right">Good Diet</span>
          <span className="label label-bottom">Rest Days</span>
          <span className="label label-left">Cardio</span>
        </div>

        {/* Stats list */}
        <div className="activity-overview-stats">
          <div className="stat-item">
            <span className="stat-dot stat-dot-physical"></span>
            <span className="stat-label">Physical</span>
            <span className="stat-value">{percentages.physical}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-dot stat-dot-cardio"></span>
            <span className="stat-label">Cardio</span>
            <span className="stat-value">{percentages.cardio}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-dot stat-dot-diet"></span>
            <span className="stat-label">Good Diet</span>
            <span className="stat-value">{percentages.goodDiet}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-dot stat-dot-rest"></span>
            <span className="stat-label">Rest Days</span>
            <span className="stat-value">{percentages.restDays}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
