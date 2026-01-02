import type { DayCell } from '../types';

export function generateYearGrid(year: number): DayCell[][] {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Adjust start to first day of the week containing Jan 1
  const firstDayOfWeek = startDate.getDay();
  const gridStart = new Date(startDate);
  gridStart.setDate(gridStart.getDate() - firstDayOfWeek);

  const weeks: DayCell[][] = [];
  const currentDate = new Date(gridStart);
  let weekIndex = 0;

  // Generate weeks until we've covered the entire year
  while (currentDate <= endDate || currentDate.getDay() !== 0) {
    const week: DayCell[] = [];

    for (let day = 0; day < 7; day++) {
      const isInYear = currentDate.getFullYear() === year;

      week.push({
        date: new Date(currentDate),
        dateString: formatDateString(currentDate),
        dayOfWeek: day,
        weekIndex: weekIndex,
        isInYear: isInYear,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);
    weekIndex++;

    // Safety check to avoid infinite loop
    if (weekIndex > 54) break;
  }

  return weeks;
}

export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getMonthLabels(weeks: DayCell[][]): { label: string; weekIndex: number }[] {
  const months: { label: string; weekIndex: number }[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    // Check the first day of the week that's in the target year
    const firstDayInYear = week.find((day) => day.isInYear);
    if (firstDayInYear) {
      const month = firstDayInYear.date.getMonth();
      if (month !== lastMonth) {
        months.push({ label: monthNames[month], weekIndex });
        lastMonth = month;
      }
    }
  });

  return months;
}
