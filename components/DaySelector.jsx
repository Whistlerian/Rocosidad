
import React from 'react';

const DaySelector = ({ days, selectedDay, onSelectDay }) => {
  return (
    <div className="bg-brand-dark sticky top-[74px] z-10">
      <nav className="flex space-x-1 sm:space-x-2 justify-center p-2 overflow-x-auto">
        {days.map(day => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`px-3 py-2 text-sm sm:text-base font-bold uppercase rounded-md transition-colors duration-200 whitespace-nowrap ${
              selectedDay === day
                ? 'bg-brand-yellow text-black'
                : 'bg-brand-gray text-gray-300 hover:bg-brand-light-gray'
            }`}
          >
            {day.replace('_', ' ')}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DaySelector;
