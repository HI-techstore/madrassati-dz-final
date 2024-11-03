import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, BookOpen, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const educationLevels = {
  primary: {
    icon: School,
    title: 'Enseignement Primaire',
    titleAr: 'التعليم الابتدائي',
    titleFr: 'Enseignement Primaire',
    color: 'from-cyan-500 to-cyan-600',
    hoverColor: 'hover:from-cyan-600 hover:to-cyan-700',
    classes: [
      { id: 'prep', name: 'Classe Préparatoire' },
      { id: '1ap', name: '1ère Année Primaire' },
      { id: '2ap', name: '2ème Année Primaire' },
      { id: '3ap', name: '3ème Année Primaire' },
      { id: '4ap', name: '4ème Année Primaire' },
      { id: '5ap', name: '5ème Année Primaire' },
      { id: 'cinq', name: 'Sujets et Solutions CINQ' }
    ]
  },
  middle: {
    icon: BookOpen,
    title: 'Enseignement Moyen',
    titleAr: 'التعليم المتوسط',
    titleFr: 'Enseignement Moyen',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    classes: [
      { id: '1am', name: '1ère Année Moyenne' },
      { id: '2am', name: '2ème Année Moyenne' },
      { id: '3am', name: '3ème Année Moyenne' },
      { id: '4am', name: '4ème Année Moyenne' },
      { id: 'bem', name: 'Sujets et Solutions BEM' }
    ]
  },
  secondary: {
    icon: GraduationCap,
    title: 'Enseignement Secondaire',
    titleAr: 'التعليم الثانوي',
    titleFr: 'Enseignement Secondaire',
    color: 'from-violet-500 to-violet-600',
    hoverColor: 'hover:from-violet-600 hover:to-violet-700',
    classes: [
      { id: '1as', name: '1ère Année Secondaire' },
      { id: '2as', name: '2ème Année Secondaire' },
      { id: '3as', name: '3ème Année Secondaire' },
      { id: 'bac', name: 'Sujets et Solutions BAC' }
    ]
  }
};

export default function YearCards() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleClassClick = (levelId: string, classId: string) => {
    navigate(`/subjects/level/${levelId}/${classId}`);
  };

  const getLocalizedTitle = (level: typeof educationLevels.primary) => {
    switch (i18n.language) {
      case 'ar':
        return level.titleAr;
      case 'fr':
        return level.titleFr;
      default:
        return level.title;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(educationLevels).map(([levelId, level]) => {
          const Icon = level.icon;
          return (
            <div
              key={levelId}
              className="relative h-[450px] group"
              onMouseEnter={() => setHoveredLevel(levelId)}
              onMouseLeave={() => setHoveredLevel(null)}
            >
              {/* Main Card */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${level.color} rounded-2xl p-8 shadow-xl 
                  transition-all duration-500 ease-in-out transform 
                  ${hoveredLevel === levelId ? 'scale-95 shadow-2xl' : 'scale-100'}
                  ${level.hoverColor}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {getLocalizedTitle(level)}
                  </h3>
                </div>
              </div>

              {/* Hover Menu */}
              <div 
                className={`absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-800/95 
                  rounded-2xl backdrop-blur-sm transform transition-all duration-500 ease-in-out
                  ${hoveredLevel === levelId ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
              >
                <div className="p-8">
                  <h4 className="text-xl font-semibold text-white mb-6">
                    {getLocalizedTitle(level)}
                  </h4>
                  <div className="space-y-3">
                    {level.classes.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => handleClassClick(levelId, cls.id)}
                        className="w-full text-left px-5 py-4 text-white hover:bg-white/10 
                          rounded-xl transition-all duration-300 text-sm font-medium
                          hover:translate-x-2 transform"
                      >
                        {cls.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}