import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubjectCard from '../SubjectsPage/SubjectCard';

interface LevelPageProps {
  subjects: Record<string, any>;
}

export default function LevelPage({ subjects }: LevelPageProps) {
  const { levelId, classId } = useParams();
  const { t, i18n } = useTranslation();

  // Filter subjects based on the current level and class
  const relevantSubjects = Object.entries(subjects).filter(([_, subject]) => {
    // Add your filtering logic here based on levelId and classId
    return true; // For now, show all subjects
  });

  const getLevelTitle = () => {
    switch (levelId) {
      case 'primary':
        return i18n.language === 'ar' ? 'التعليم الابتدائي' : 
               i18n.language === 'fr' ? 'Enseignement Primaire' : 
               'Primary Education';
      case 'middle':
        return i18n.language === 'ar' ? 'التعليم المتوسط' : 
               i18n.language === 'fr' ? 'Enseignement Moyen' : 
               'Middle School';
      case 'secondary':
        return i18n.language === 'ar' ? 'التعليم الثانوي' : 
               i18n.language === 'fr' ? 'Enseignement Secondaire' : 
               'Secondary Education';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getLevelTitle()}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relevantSubjects.map(([key, subject]) => (
            <SubjectCard
              key={key}
              subject={subject}
              onClick={() => {}} // Add navigation logic
            />
          ))}
        </div>
      </div>
    </div>
  );
}