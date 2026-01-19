
import React from 'react';
import type { WorkoutDay, LogEntry } from '../types';
import ExerciseCard from './ExerciseCard';

interface WorkoutViewProps {
  workoutDay: WorkoutDay;
  logs: LogEntry[];
  onLogChange: (date: string, exercise: string, setIndex: number, weight: string) => void;
  currentDate: string;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ workoutDay, logs, onLogChange, currentDate }) => {
  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-brand-light-gray">
          <h2 className="text-2xl font-black uppercase text-brand-yellow">{workoutDay.focus}</h2>
          {workoutDay.notes && <p className="text-gray-400 mt-1">{workoutDay.notes}</p>}
      </div>
      {workoutDay.workout.map((exercise, index) => (
        <ExerciseCard
          key={`${exercise.exercise}-${index}`}
          exercise={exercise}
          logs={logs}
          onLogChange={onLogChange}
          currentDate={currentDate}
        />
      ))}
    </div>
  );
};

export default WorkoutView;
