import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import SideMenu from '../SubjectsPage/SideMenu';
import SubjectGrid from './SubjectGrid';

export default function SujetPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Side Menu */}
      <div className="hidden md:block">
        <SideMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('sujet.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t('sujet.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Subject Grid */}
          <SubjectGrid searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}