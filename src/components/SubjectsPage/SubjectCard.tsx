import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Subject } from '../../types';

interface SubjectCardProps extends Subject {
  levelId: string;
  classId: string;
}

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/20 text-indigo-400',
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-green-500/20 text-green-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  purple: 'bg-purple-500/20 text-purple-400'
};

export default function SubjectCard({
  id,
  name,
  nameAr,
  nameFr,
  icon: Icon,
  color,
  count,
  levelId,
  classId
}: SubjectCardProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const getLocalizedName = () => {
    switch (i18n.language) {
      case 'ar':
        return nameAr;
      case 'fr':
        return nameFr;
      default:
        return name;
    }
  };

  const handleClick = () => {
    navigate(`/subjects/level/${levelId}/${classId}/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.indigo}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {getLocalizedName()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {count} resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}