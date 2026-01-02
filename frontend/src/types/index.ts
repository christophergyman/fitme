export type TrainingType = 'physical' | 'cardio' | 'none';
export type DietType = 'good' | 'bad' | null;

export interface Activity {
  id: number;
  date: string;
  training_type: TrainingType;
  diet: DietType;
  created_at: string;
  updated_at: string;
}

export interface ActivityInput {
  training_type: TrainingType;
  diet: DietType;
}

export interface DayCell {
  date: Date;
  dateString: string;
  dayOfWeek: number;
  weekIndex: number;
  isInYear: boolean;
}
