
import React, { useState, useMemo, useCallback } from 'react';
import { workoutProgram } from './data/workout';
import type { LogEntry, WorkoutDay } from './types';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import WorkoutView from './components/WorkoutView';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [logs, setLogs] = useLocalStorage<LogEntry[]>('gymLogs', []);
  const [selectedDay, setSelectedDay] = useState<string>(Object.keys(workoutProgram.weekly_schedule)[0]);

  const schedule = workoutProgram.weekly_schedule as Record<string, WorkoutDay>;

  const handleLogChange = useCallback((date: string, exercise: string, setIndex: number, weight: string) => {
    setLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(
        log => log.date === date && log.exercise === exercise && log.setIndex === setIndex
      );

      const weightValue = parseFloat(weight);
      if (isNaN(weightValue) || weightValue <= 0) {
        // If weight is invalid or empty, remove the log
        if (existingLogIndex !== -1) {
          return prevLogs.filter((_, index) => index !== existingLogIndex);
        }
        return prevLogs;
      }

      if (existingLogIndex !== -1) {
        // Update existing log
        const updatedLogs = [...prevLogs];
        updatedLogs[existingLogIndex] = { ...updatedLogs[existingLogIndex], weight: weightValue };
        return updatedLogs;
      } else {
        // Add new log
        return [...prevLogs, { date, exercise, setIndex, weight: weightValue }];
      }
    });
  }, [setLogs]);
  
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const dayKeys = useMemo(() => Object.keys(schedule), [schedule]);

  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col">
      <Header programName={workoutProgram.program_name} />
      <main className="flex-grow flex flex-col">
        <DaySelector
          days={dayKeys}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <div className="flex-grow p-4 md:p-6">
          <WorkoutView
            key={selectedDay}
            workoutDay={schedule[selectedDay]}
            logs={logs}
            onLogChange={handleLogChange}
            currentDate={today}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
