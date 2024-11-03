import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ResourceCard from './ResourceCard';
import { resources } from '../../data/resources';
import { levelSubjects } from '../../data/subjects';
import SideMenu from '../SubjectsPage/SideMenu';

const quarters = [
  { id: 'q1', name: '1st Quarter', nameAr: 'الفصل الأول', nameFr: 'Premier Trimestre' },
  { id: 'q2', name: '2nd Quarter', nameAr: 'الفصل الثاني', nameFr: 'Deuxième Trimestre' },
  { id: 'q3', name: '3rd Quarter', nameAr: 'الفصل الثالث', nameFr: 'Troisième Trimestre' }
];

export default function SubjectResourcesPage() {
  const { levelId = '', classId = '', subjectId = '' } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('');
  const { t, i18n } = useTranslation();

  const currentSubjects = levelSubjects[`${levelId}/${classId}`] || [];
  const currentSubject = currentSubjects.find(s => s.id === subjectId);
  const currentResources = resources[`${levelId}/${classId}`]?.[subjectId] || [];

  const getLocalizedQuarterName = (quarter: typeof quarters[0]) => {
    switch (i18n.language) {
      case 'ar':
        return quarter.nameAr;
      case 'fr':
        return quarter.nameFr;
      default:
        return quarter.name;
    }
  };

  const filteredResources = currentResources.filter((resource: any) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuarter = !selectedQuarter || resource.quarter === selectedQuarter;
    return matchesSearch && matchesQuarter;
  });

  const getLocalizedName = () => {
    if (!currentSubject) return '';
    switch (i18n.language) {
      case 'ar':
        return currentSubject.nameAr;
      case 'fr':
        return currentSubject.nameFr;
      default:
        return currentSubject.name;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden md:block">
        <SideMenu />
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {getLocalizedName()}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Quarter Selection */}
              <div className="flex flex-wrap gap-2">
                {quarters.map((quarter) => (
                  <button
                    key={quarter.id}
                    onClick={() => setSelectedQuarter(quarter.id === selectedQuarter ? '' : quarter.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${quarter.id === selectedQuarter
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {getLocalizedQuarterName(quarter)}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('resources.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredResources.map((resource: any) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                levelId={levelId}
                classId={classId}
                subjectId={subjectId}
              />
            ))}

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? t('resources.noSearchResults') : t('resources.noResources')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}