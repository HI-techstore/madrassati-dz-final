import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  MenuSquare,
  X,
  School,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

const menuStructure = {
  primary: {
    icon: School,
    titleEn: 'Primary Education',
    titleFr: 'Enseignement Primaire',
    titleAr: 'التعليم الابتدائي',
    classes: [
      { id: 'prep', nameEn: 'Preparatory Class', nameFr: 'Classe Préparatoire', nameAr: 'القسم التحضيري' },
      { id: '1ap', nameEn: '1st Year', nameFr: '1ère Année', nameAr: 'السنة الأولى' },
      { id: '2ap', nameEn: '2nd Year', nameFr: '2ème Année', nameAr: 'السنة الثانية' },
      { id: '3ap', nameEn: '3rd Year', nameFr: '3ème Année', nameAr: 'السنة الثالثة' },
      { id: '4ap', nameEn: '4th Year', nameFr: '4ème Année', nameAr: 'السنة الرابعة' },
      { id: '5ap', nameEn: '5th Year', nameFr: '5ème Année', nameAr: 'السنة الخامسة' }
    ]
  },
  middle: {
    icon: BookOpen,
    titleEn: 'Middle School',
    titleFr: 'Enseignement Moyen',
    titleAr: 'التعليم المتوسط',
    classes: [
      { id: '1am', nameEn: '1st Year', nameFr: '1ère Année', nameAr: 'السنة الأولى' },
      { id: '2am', nameEn: '2nd Year', nameFr: '2ème Année', nameAr: 'السنة الثانية' },
      { id: '3am', nameEn: '3rd Year', nameFr: '3ème Année', nameAr: 'السنة الثالثة' },
      { id: '4am', nameEn: '4th Year', nameFr: '4ème Année', nameAr: 'السنة الرابعة' }
    ]
  },
  secondary: {
    icon: GraduationCap,
    titleEn: 'Secondary School',
    titleFr: 'Enseignement Secondaire',
    titleAr: 'التعليم الثانوي',
    classes: [
      { id: '1as', nameEn: '1st Year', nameFr: '1ère Année', nameAr: 'السنة الأولى' },
      { id: '2as', nameEn: '2nd Year', nameFr: '2ème Année', nameAr: 'السنة الثانية' },
      { id: '3as', nameEn: '3rd Year', nameFr: '3ème Année', nameAr: 'السنة الثالثة' }
    ]
  }
};

export default function SideMenu() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  const toggleExpanded = (levelId: string) => {
    setExpandedItems(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const getLocalizedTitle = (level: typeof menuStructure.primary) => {
    switch (i18n.language) {
      case 'ar':
        return level.titleAr;
      case 'fr':
        return level.titleFr;
      default:
        return level.titleEn;
    }
  };

  const getLocalizedClassName = (cls: typeof menuStructure.primary.classes[0]) => {
    switch (i18n.language) {
      case 'ar':
        return cls.nameAr;
      case 'fr':
        return cls.nameFr;
      default:
        return cls.nameEn;
    }
  };

  const handleClassClick = (levelId: string, classId: string) => {
    navigate(`/subjects/level/${levelId}/${classId}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-colors duration-200
          ${isDark 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-gray-900 hover:bg-gray-100'}`}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MenuSquare className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-72 min-h-screen border-r transition-colors duration-200
        ${isDark 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'}`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <MenuContent />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 transform transition-all duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDark 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'} shadow-xl`}
      >
        <div className="p-4 h-full overflow-y-auto pt-20">
          <MenuContent />
        </div>
      </div>
    </>
  );

  function MenuContent() {
    return (
      <div className="space-y-4">
        {Object.entries(menuStructure).map(([levelId, level]) => {
          const Icon = level.icon;
          const isExpanded = expandedItems.includes(levelId);
          
          return (
            <div key={levelId} className="space-y-2">
              <button
                onClick={() => toggleExpanded(levelId)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200
                  ${isDark 
                    ? 'text-gray-100 hover:bg-gray-700/50' 
                    : 'text-gray-900 hover:bg-gray-100'}`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                  <span>{getLocalizedTitle(level)}</span>
                </div>
                {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>

              {isExpanded && (
                <div className="ml-4 space-y-1">
                  {level.classes.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => handleClassClick(levelId, cls.id)}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors duration-200
                        ${isDark 
                          ? 'text-gray-300 hover:bg-gray-700/50' 
                          : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {getLocalizedClassName(cls)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}