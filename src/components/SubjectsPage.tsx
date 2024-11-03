import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import SideMenu from './SubjectsPage/SideMenu';

interface Subject {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface SubjectsPageProps {
  subjects: Record<string, Subject>;
}

export default function SubjectsPage({ subjects }: SubjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Core', 'Science', 'Languages', 'Humanities', 'Arts'];

  const handleClassSelect = (levelId: string, classId: string) => {
    navigate(`/subjects/level/${levelId}/${classId}`);
  };

  const filteredSubjects = Object.entries(subjects).filter(([key, subject]) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen">
      <SideMenu onSelectClass={handleClassSelect} />
      
      <div className="flex-1 p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Academic Subjects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover comprehensive resources across various disciplines to support your academic journey
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            <SlidersHorizontal className="h-5 w-5 text-gray-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  ${selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map(([key, subject]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/subjects/${key}`)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    {subject.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {subject.description}
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                <div className="w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                  Explore Resources →
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No subjects found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}