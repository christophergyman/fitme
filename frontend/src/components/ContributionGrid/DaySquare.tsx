import type { DayCell, Activity } from '../../types';
import { getColorForActivity } from '../../utils/colorUtils';
import { formatDisplayDate } from '../../utils/dateUtils';

interface DaySquareProps {
  day: DayCell;
  activity: Activity | null;
  onClick: (dateString: string) => void;
}

export function DaySquare({ day, activity, onClick }: DaySquareProps) {
  if (!day.isInYear) {
    return <div className="day-square day-square--hidden" />;
  }

  const color = getColorForActivity(activity);
  const tooltip = formatDisplayDate(day.dateString);

  return (
    <div
      className="day-square"
      style={{ backgroundColor: color }}
      title={tooltip}
      onClick={() => onClick(day.dateString)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(day.dateString);
        }
      }}
    />
  );
}
