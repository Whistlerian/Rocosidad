
import React from 'react';
import ExerciseCard from './ExerciseCard.jsx';

const WorkoutView = ({ workoutDay, logs, onLogChange, currentDate }) => {
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
