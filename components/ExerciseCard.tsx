
import React, { useState, useMemo } from 'react';
import type { Exercise, LogEntry } from '../types';
import HistoryChart from './HistoryChart';
import { ChartIcon, InfoIcon } from './Icons';

interface ExerciseCardProps {
  exercise: Exercise;
  logs: LogEntry[];
  onLogChange: (date: string, exercise: string, setIndex: number, weight: string) => void;
  currentDate: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, logs, onLogChange, currentDate }) => {
  const [showHistory, setShowHistory] = useState(false);

  const exerciseLogs = useMemo(() => logs.filter(log => log.exercise === exercise.exercise), [logs, exercise.exercise]);

  const todayLogs = useMemo(() => {
    return exerciseLogs.filter(log => log.date === currentDate);
  }, [exerciseLogs, currentDate]);

  const lastWeekLogs = useMemo(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekDateStr = lastWeek.toISOString().split('T')[0];

    const relevantLogs = exerciseLogs.filter(log => log.date < currentDate && log.date >= lastWeekDateStr);
    
    // Find the latest session in the past
    const latestDate = relevantLogs.reduce((max, log) => log.date > max ? log.date : max, '');
    if(!latestDate) return [];

    return relevantLogs.filter(log => log.date === latestDate);

  }, [exerciseLogs, currentDate]);

  return (
    <div className="bg-brand-gray border border-brand-light-gray rounded-lg p-4 shadow-lg transition-all duration-300 hover:border-brand-yellow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold uppercase text-white">{exercise.exercise}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
            <span>{exercise.sets} SETS</span>
            <span>{exercise.reps} REPS</span>
            {exercise.rir && <span>RIR {exercise.rir}</span>}
          </div>
          {exercise.notes && 
            <div className="flex items-start gap-1.5 mt-2 text-xs text-gray-400">
                <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{exercise.notes}</p>
            </div>
          }
        </div>
        <button
          onClick={() => setShowHistory(true)}
          className="p-2 text-gray-400 hover:text-brand-yellow transition-colors"
          aria-label="Show history"
        >
          <ChartIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 text-sm">
         {Array.from({ length: exercise.sets }).map((_, i) => {
            const currentLog = todayLogs.find(log => log.setIndex === i);
            const lastLog = lastWeekLogs.find(log => log.setIndex === i);

            return (
              <div key={i} className="flex flex-col gap-1">
                <label htmlFor={`${exercise.exercise}-set-${i}`} className="font-bold text-gray-300 text-center">
                  SET {i + 1}
                </label>
                <input
                  type="number"
                  id={`${exercise.exercise}-set-${i}`}
                  placeholder={lastLog ? `${lastLog.weight} kg` : 'kg'}
                  defaultValue={currentLog ? currentLog.weight : ''}
                  onChange={(e) => onLogChange(currentDate, exercise.exercise, i, e.target.value)}
                  className="w-full bg-brand-dark border-2 border-brand-light-gray rounded-md text-center p-2 text-white focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow appearance-none"
                  style={{ MozAppearance: 'textfield' }}
                />
              </div>
            );
        })}
      </div>

      {showHistory && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setShowHistory(false)}
        >
          <div 
            className="bg-brand-gray p-4 md:p-6 rounded-lg max-w-3xl w-11/12 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <HistoryChart exerciseLogs={exerciseLogs} exerciseName={exercise.exercise} />
             <button
              onClick={() => setShowHistory(false)}
              className="mt-4 w-full bg-brand-yellow text-black font-bold py-2 px-4 rounded-md uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
