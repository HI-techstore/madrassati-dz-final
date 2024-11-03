import React from 'react';
import SubjectCard from './SubjectCard';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Subject {
  name: string;
  nameEn: string;
  nameFr: string;
  icon: React.ReactNode;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  count?: number;
}

interface SubjectGridProps {
  subjects: Record<string, Subject>;
  onSubjectClick: (key: string) => void;
  searchTerm: string;
  selectedCategory: string;
}

export default function SubjectGrid({ subjects, onSubjectClick, searchTerm, selectedCategory }: SubjectGridProps) {
  const { t, i18n } = useTranslation();

  const getLocalizedName = (subject: Subject) => {
    switch (i18n.language) {
      case 'ar':
        return subject.name;
      case 'fr':
        return subject.nameFr;
      default:
        return subject.nameEn;
    }
  };

  const getLocalizedDescription = (subject: Subject) => {
    switch (i18n.language) {
      case 'ar':
        return subject.descriptionAr;
      case 'fr':
        return subject.descriptionFr;
      default:
        return subject.description;
    }
  };

  const filteredSubjects = Object.entries(subjects).filter(([_, subject]) => {
    const localizedName = getLocalizedName(subject);
    const localizedDescription = getLocalizedDescription(subject);
    
    const matchesSearch = 
      localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      localizedDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSubjects.map(([key, subject]) => (
        <SubjectCard
          key={key}
          subject={subject}
          onClick={() => onSubjectClick(key)}
        />
      ))}

      {filteredSubjects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {t('subjects.noResults')}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('subjects.tryAdjusting')}
          </p>
        </div>
      )}
    </div>
  );
}