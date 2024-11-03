import { Calculator, BookOpen, Palette, Languages, Book, Flag, Music2, Beaker, Globe2, Computer, Heart, Dumbbell } from 'lucide-react';
import type { Subject } from '../types';

const defaultSubjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    nameAr: 'الرياضيات',
    nameFr: 'Mathématiques',
    icon: Calculator,
    color: 'indigo',
    count: 25
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nameAr: 'اللغة العربية',
    nameFr: 'Arabe',
    icon: Languages,
    color: 'green',
    count: 30
  },
  {
    id: 'french',
    name: 'French',
    nameAr: 'اللغة الفرنسية',
    nameFr: 'Français',
    icon: Languages,
    color: 'blue',
    count: 28
  },
  {
    id: 'science',
    name: 'Science',
    nameAr: 'العلوم',
    nameFr: 'Sciences',
    icon: Beaker,
    color: 'emerald',
    count: 22
  },
  {
    id: 'physics',
    name: 'Physics',
    nameAr: 'الفيزياء',
    nameFr: 'Physique',
    icon: Beaker,
    color: 'purple',
    count: 20
  },
  {
    id: 'history',
    name: 'History',
    nameAr: 'التاريخ',
    nameFr: 'Histoire',
    icon: Globe2,
    color: 'amber',
    count: 15
  },
  {
    id: 'geography',
    name: 'Geography',
    nameAr: 'الجغرافيا',
    nameFr: 'Géographie',
    icon: Globe2,
    color: 'teal',
    count: 15
  },
  {
    id: 'civics',
    name: 'Civic Education',
    nameAr: 'التربية المدنية',
    nameFr: 'Éducation Civique',
    icon: Flag,
    color: 'cyan',
    count: 18
  },
  {
    id: 'islamic',
    name: 'Islamic Education',
    nameAr: 'التربية الإسلامية',
    nameFr: 'Éducation Islamique',
    icon: Heart,
    color: 'rose',
    count: 20
  },
  {
    id: 'art',
    name: 'Art',
    nameAr: 'الفن التشكيلي',
    nameFr: 'Arts Plastiques',
    icon: Palette,
    color: 'fuchsia',
    count: 12
  },
  {
    id: 'music',
    name: 'Music',
    nameAr: 'الموسيقى',
    nameFr: 'Musique',
    icon: Music2,
    color: 'violet',
    count: 10
  },
  {
    id: 'pe',
    name: 'Physical Education',
    nameAr: 'التربية البدنية',
    nameFr: 'Éducation Physique',
    icon: Dumbbell,
    color: 'pink',
    count: 15
  }
];

// Initialize subjects from localStorage or use defaults
const getInitialSubjects = (): Subject[] => {
  const savedSubjects = localStorage.getItem('subjects');
  if (savedSubjects) {
    const parsed = JSON.parse(savedSubjects);
    // Map icons back to subjects since they can't be serialized
    return parsed.map((subject: any) => {
      const defaultSubject = defaultSubjects.find(s => s.id === subject.id);
      return {
        ...subject,
        icon: defaultSubject?.icon || Book
      };
    });
  }
  // If no saved subjects, store defaults and return them
  localStorage.setItem('subjects', JSON.stringify(defaultSubjects.map(({ icon, ...rest }) => rest)));
  return defaultSubjects;
};

let subjects = getInitialSubjects();

// Save subjects to localStorage
const persistSubjects = (updatedSubjects: Subject[]) => {
  // Create a copy without the icon function for serialization
  const forStorage = updatedSubjects.map(({ icon, ...rest }) => rest);
  localStorage.setItem('subjects', JSON.stringify(forStorage));
  subjects = updatedSubjects;
};

export const getSubjects = () => subjects;

export const addSubject = (subject: Omit<Subject, 'icon' | 'count'>) => {
  const newSubject: Subject = {
    ...subject,
    icon: Book,
    count: 0
  };
  const updatedSubjects = [...subjects, newSubject];
  persistSubjects(updatedSubjects);
  return newSubject;
};

export const deleteSubject = (id: string) => {
  const updatedSubjects = subjects.filter(subject => subject.id !== id);
  persistSubjects(updatedSubjects);
};

export const levelSubjects: Record<string, Subject[]> = {
  'primary/prep': subjects,
  'primary/1ap': subjects,
  'primary/2ap': subjects,
  'primary/3ap': subjects,
  'primary/4ap': subjects,
  'primary/5ap': subjects,
  'primary/cinq': subjects,
  'middle/1am': subjects,
  'middle/2am': subjects,
  'middle/3am': subjects,
  'middle/4am': subjects,
  'middle/bem': subjects,
  'secondary/1as': subjects,
  'secondary/2as': subjects,
  'secondary/3as': subjects,
  'secondary/bac': subjects
};