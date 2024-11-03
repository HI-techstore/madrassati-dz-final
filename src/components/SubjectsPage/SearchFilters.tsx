import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}: SearchFiltersProps) {
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('subjects.categories.all') },
    { id: 'core', label: t('subjects.categories.core') },
    { id: 'science', label: t('subjects.categories.science') },
    { id: 'languages', label: t('subjects.categories.languages') },
    { id: 'humanities', label: t('subjects.categories.humanities') },
    { id: 'arts', label: t('subjects.categories.arts') }
  ];

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('subjects.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
        <SlidersHorizontal className="h-5 w-5 text-gray-400 flex-shrink-0" />
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}