import type { Activity } from '../types';

// Color palette (warm earth tones for activity intensity)
// Empty color uses CSS variable for theme support
export const COLORS = {
  empty: 'var(--square-empty)',  // CSS variable - automatically updates with theme
  level1: '#7D8B7E',  // Muted Sage - lowest activity
  level2: '#E8B87D',  // Soft Amber
  level3: '#D97757',  // Warm Terracotta - highest activity
};

export function getActivityScore(activity: Activity | null): number {
  if (!activity) return 0;

  let score = 0;

  // Training contribution: none=0, cardio=1, physical=2
  if (activity.training_type === 'cardio') score += 1;
  if (activity.training_type === 'physical') score += 2;

  // Diet contribution: bad/null=0, good=1
  if (activity.diet === 'good') score += 1;

  return score; // 0, 1, 2, or 3
}

export function getColorForActivity(activity: Activity | null): string {
  const score = getActivityScore(activity);

  switch (score) {
    case 0:
      return COLORS.empty;
    case 1:
      return COLORS.level1;
    case 2:
      return COLORS.level2;
    case 3:
      return COLORS.level3;
    default:
      return COLORS.empty;
  }
}

export function getColorForScore(score: number): string {
  switch (score) {
    case 0:
      return COLORS.empty;
    case 1:
      return COLORS.level1;
    case 2:
      return COLORS.level2;
    case 3:
      return COLORS.level3;
    default:
      return COLORS.empty;
  }
}
