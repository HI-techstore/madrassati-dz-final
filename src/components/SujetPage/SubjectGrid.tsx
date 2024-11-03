import React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubjects } from '../../hooks/useSubjects';
import SubjectCard from '../SubjectCard';

interface SubjectGridProps {
  searchTerm: string;
}

export default function SubjectGrid({ searchTerm }: SubjectGridProps) {
  const { levelId = '', classId = '' } = useParams();
  const { t, i18n } = useTranslation();
  const { data: subjects, loading, error } = useSubjects(levelId, classId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Book className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          {t('errors.unexpectedError')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('errors.tryAgain')}
        </p>
      </div>
    );
  }

  const filteredSubjects = subjects.filter(subject => {
    const searchString = i18n.language === 'ar' ? subject.nameAr :
                        i18n.language === 'fr' ? subject.nameFr :
                        subject.name;
    return searchString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!levelId || !classId) {
    return (
      <div className="text-center py-12">
        <Book className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          {t('sujet.selectLevel')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('sujet.selectLevelMessage')}
        </p>
      </div>
    );
  }

  if (filteredSubjects.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          {searchTerm ? t('sujet.noResults') : t('sujet.noSubjects')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {searchTerm ? t('sujet.tryAdjusting') : t('sujet.selectLevel')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSubjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          {...subject}
          levelId={levelId}
          classId={classId}
        />
      ))}
    </div>
  );
}