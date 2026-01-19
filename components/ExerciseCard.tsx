
import React, { useState, useMemo, useCallback } from 'react';
import type { Exercise, LogEntry } from '../types';
import HistoryChart from './HistoryChart';
import { ChartIcon, InfoIcon, SparklesIcon } from './Icons';
import { GoogleGenAI } from '@google/genai';

interface ExerciseCardProps {
  exercise: Exercise;
  logs: LogEntry[];
  onLogChange: (date: string, exercise: string, setIndex: number, weight: string) => void;
  currentDate: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, logs, onLogChange, currentDate }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showAiTip, setShowAiTip] = useState(false);
  const [aiTip, setAiTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [error, setError] = useState('');

  const exerciseLogs = useMemo(() => logs.filter(log => log.exercise === exercise.exercise), [logs, exercise.exercise]);

  const todayLogs = useMemo(() => {
    return exerciseLogs.filter(log => log.date === currentDate);
  }, [exerciseLogs, currentDate]);

  const lastWeekLogs = useMemo(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekDateStr = lastWeek.toISOString().split('T')[0];

    const relevantLogs = exerciseLogs.filter(log => log.date < currentDate && log.date >= lastWeekDateStr);
    
    const latestDate = relevantLogs.reduce((max, log) => log.date > max ? log.date : max, '');
    if(!latestDate) return [];

    return relevantLogs.filter(log => log.date === latestDate);

  }, [exerciseLogs, currentDate]);

  const handleGetAiTip = useCallback(async () => {
    if (!process.env.API_KEY) {
        setError('API Key no configurada. No se pueden obtener consejos.');
        setShowAiTip(true);
        return;
    }
    setShowAiTip(true);
    setIsLoadingTip(true);
    setError('');
    setAiTip('');

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Dame un consejo de experto para mejorar la técnica o la conexión mente-músculo en el ejercicio: ${exercise.exercise}. Sé breve, directo y motivador, en español.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        setAiTip(response.text);

    } catch (e) {
        console.error(e);
        setError('No se pudo obtener el consejo. Inténtalo de nuevo.');
    } finally {
        setIsLoadingTip(false);
    }
  }, [exercise.exercise]);


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
        <div className="flex">
            <button
              onClick={handleGetAiTip}
              className="p-2 text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="Obtener consejo de IA"
            >
              <SparklesIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="Mostrar historial"
            >
              <ChartIcon className="w-6 h-6" />
            </button>
        </div>
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
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showAiTip && (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setShowAiTip(false)}
        >
            <div
                className="bg-brand-gray p-6 rounded-lg max-w-md w-11/12"
                onClick={e => e.stopPropagation()}
            >
                <h4 className="text-xl font-bold uppercase mb-4 text-center text-brand-yellow">Consejo IA para {exercise.exercise}</h4>
                {isLoadingTip && <div className="flex justify-center items-center h-24"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div></div>}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {aiTip && <p className="text-white text-center whitespace-pre-wrap">{aiTip}</p>}
                <button
                    onClick={() => setShowAiTip(false)}
                    className="mt-6 w-full bg-brand-yellow text-black font-bold py-2 px-4 rounded-md uppercase"
                >
                    Entendido
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
