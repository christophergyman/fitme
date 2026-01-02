interface MonthLabel {
  label: string;
  weekIndex: number;
}

interface MonthLabelsProps {
  months: MonthLabel[];
}

export function MonthLabels({ months }: MonthLabelsProps) {
  return (
    <div className="month-labels">
      {months.map((month, index) => (
        <span
          key={index}
          className="month-label"
          style={{ gridColumnStart: month.weekIndex + 2 }}
        >
          {month.label}
        </span>
      ))}
    </div>
  );
}
