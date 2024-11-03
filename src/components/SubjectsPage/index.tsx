import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubjects } from '../../hooks/useSubjects';

export default function SubjectsPage() {
  const { levelId = 'primary', classId = 'prep' } = useParams<{ levelId: string; classId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { loading, error } = useSubjects(levelId, classId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('errors.unexpectedError')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('errors.tryAgain')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t('common.backToHome')}
          </button>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('subjects.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('subjects.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {t('subjects.noSubjects')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('subjects.noSubjectsMessage')}
          </p>
        </div>
      </div>
    </div>
  );
}