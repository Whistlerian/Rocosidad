
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { LogEntry } from '../types';

interface HistoryChartProps {
  exerciseLogs: LogEntry[];
  exerciseName: string;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ exerciseLogs, exerciseName }) => {
  const data = useMemo(() => {
    if (exerciseLogs.length === 0) return [];
    
    const groupedByDate: { [date: string]: { [set: number]: number } } = {};

    exerciseLogs.forEach(log => {
      if (!groupedByDate[log.date]) {
        groupedByDate[log.date] = {};
      }
      groupedByDate[log.date][log.setIndex] = log.weight;
    });

    const chartData = Object.keys(groupedByDate).sort().map(date => {
      const entry: { date: string, [key: string]: string | number } = { date: new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) };
      const sets = groupedByDate[date];
      for (const setIndex in sets) {
        entry[`Set ${parseInt(setIndex) + 1}`] = sets[setIndex];
      }
      return entry;
    });

    return chartData;
  }, [exerciseLogs]);

  const setKeys = useMemo(() => {
    if (data.length === 0) return [];
    const keys = new Set<string>();
    data.forEach(d => {
      Object.keys(d).forEach(key => {
        if (key !== 'date') {
          keys.add(key);
        }
      });
    });
    return Array.from(keys).sort();
  }, [data]);
  
  const colors = ['#F3F31A', '#34D399', '#60A5FA', '#F472B6', '#A78BFA'];

  if (data.length === 0) {
    return (
        <div className="text-center p-8">
            <h4 className="text-xl font-bold uppercase mb-2">{exerciseName}</h4>
            <p className="text-gray-400">No hay datos registrados para este ejercicio.</p>
        </div>
    );
  }

  return (
    <div>
        <h4 className="text-xl font-bold uppercase mb-4 text-center text-brand-yellow">{exerciseName} - Historial</h4>
        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={['dataMin - 5', 'auto']} label={{ value: 'kg', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #3A3A3A' }} />
            <Legend />
            {setKeys.map((key, index) => (
                <Line 
                    key={key} 
                    type="monotone" 
                    dataKey={key} 
                    stroke={colors[index % colors.length]} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            ))}
            </LineChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};

export default HistoryChart;
