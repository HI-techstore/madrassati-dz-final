import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function SubjectsHeader() {
  const { t } = useTranslation();
  const { levelId, classId } = useParams();
  
  const getHeaderInfo = () => {
    if (!levelId || !classId) {
      return {
        title: t('subjects.title'),
        subtitle: t('subjects.subtitle')
      };
    }

    const level = levelId.charAt(0).toUpperCase() + levelId.slice(1);
    const className = classId.toUpperCase();
    
    return {
      title: t('subjects.header.title', { level, class: className }),
      subtitle: t('subjects.header.subtitle', { level, class: className })
    };
  };

  const { title, subtitle } = getHeaderInfo();
  
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}