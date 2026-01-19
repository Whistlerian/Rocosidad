
export interface Exercise {
  exercise: string;
  incline_degrees?: string;
  sets: number;
  reps: string | number;
  rir?: string | number;
  notes?: string;
  optional?: boolean;
}

export interface WorkoutDay {
  type: string;
  focus: string;
  workout: Exercise[];
  optional?: boolean;
  notes?: string;
}

export interface WeeklySchedule {
  [day: string]: WorkoutDay;
}

export interface WorkoutProgram {
  program_name: string;
  goal: string;
  weekly_schedule: WeeklySchedule;
}

export interface LogEntry {
  date: string; // YYYY-MM-DD
  exercise: string;
  setIndex: number;
  weight: number;
}
