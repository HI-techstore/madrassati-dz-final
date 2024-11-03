import React from 'react';

interface LevelTabsProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export default function LevelTabs({ selectedLevel, onLevelChange }: LevelTabsProps) {
  const levels = [
    { id: 'primary', name: 'Primary School' },
    { id: 'middle', name: 'Middle School' },
    { id: 'high', name: 'High School' }
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
              ${selectedLevel === level.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            {level.name}
          </button>
        ))}
      </nav>
    </div>
  );
}