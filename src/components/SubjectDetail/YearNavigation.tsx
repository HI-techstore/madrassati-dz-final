import React from 'react';

interface YearNavigationProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  level: string;
}

export default function YearNavigation({ selectedYear, onYearChange, level }: YearNavigationProps) {
  const schoolYears = {
    primary: [
      { id: '1', name: '1ère Année' },
      { id: '2', name: '2ème Année' },
      { id: '3', name: '3ème Année' },
      { id: '4', name: '4ème Année' },
      { id: '5', name: '5ème Année' }
    ],
    middle: [
      { id: '1', name: '1ère Année Moyenne' },
      { id: '2', name: '2ème Année Moyenne' },
      { id: '3', name: '3ème Année Moyenne' },
      { id: '4', name: '4ème Année Moyenne' }
    ],
    high: [
      { id: '1', name: '1ère Année Secondaire' },
      { id: '2', name: '2ème Année Secondaire' },
      { id: '3', name: '3ème Année Secondaire' },
      { id: 'bac', name: 'BAC' }
    ]
  }[level] || [];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {schoolYears.map((year) => (
        <button
          key={year.id}
          onClick={() => onYearChange(year.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
            ${selectedYear === year.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          {year.name}
        </button>
      ))}
    </div>
  );
}