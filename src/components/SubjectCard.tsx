import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  icon: LucideIcon;
  color: string;
  count: number;
  levelId: string;
  classId: string;
}

const colorMap = {
  indigo: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  blue: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-500/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  pink: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  emerald: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
  teal: 'bg-teal-500/20 text-teal-600 dark:text-teal-400',
  cyan: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  violet: 'bg-violet-500/20 text-violet-600 dark:text-violet-400',
  rose: 'bg-rose-500/20 text-rose-600 dark:text-rose-400',
  fuchsia: 'bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400'
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
      className="group bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg transition-colors ${colorMap[color as keyof typeof colorMap]}`}>
          <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {getLocalizedName()}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {count} {count === 1 ? 'resource' : 'resources'}
          </p>
        </div>
      </div>
    </div>
  );
}