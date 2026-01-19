
import React from 'react';
import { DumbbellIcon } from './Icons.jsx';

const Header = ({ programName }) => {
  return (
    <header className="bg-brand-dark p-4 border-b-2 border-brand-yellow sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DumbbellIcon className="h-8 w-8 text-brand-yellow" />
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            Rocosidad
          </h1>
        </div>
        <p className="hidden md:block text-sm text-gray-400 uppercase">{programName}</p>
      </div>
    </header>
  );
};

export default Header;
