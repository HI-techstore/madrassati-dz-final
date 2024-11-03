import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SubjectCard from './SubjectCard';
import ResourceCard from './ResourceCard';
import { resources } from '../../data/resources';

interface ResourcesPageProps {
  subjects: Record<string, any>;
}

export default function ResourcesPage({ subjects }: ResourcesPageProps) {
  const { levelId = '', classId = '', subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  // Get subjects for the current level/class
  const currentSubjects = subjects[`${levelId}/${classId}`] || [];

  // Get resources if a subject is selected
  const currentResources = subjectId 
    ? resources[`${levelId}/${classId}`]?.[subjectId] || []
    : [];

  const filteredResources = currentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {subjectId ? t('resources.resourcesFor', { subject: subjectId }) : t('resources.selectSubject')}
        </h1>

        {/* Search */}
        <div className="relative max-w-xl">
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

      {/* Content */}
      {!subjectId ? (
        // Show subject cards if no subject is selected
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSubjects.map((subject: any) => (
            <SubjectCard
              key={subject.id}
              {...subject}
              levelId={levelId}
              classId={classId}
            />
          ))}
        </div>
      ) : (
        // Show resources if a subject is selected
        <div className="space-y-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              {...resource}
            />
          ))}

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {t('resources.noResourcesFound')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}