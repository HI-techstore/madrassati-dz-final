import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import YearNavigation from './YearNavigation';
import LevelTabs from './LevelTabs';
import ResourceCard from './ResourceCard';
import { Book, Search } from 'lucide-react';

interface Subject {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface SubjectDetailPageProps {
  subject?: Subject;
}

export default function SubjectDetailPage({ subject }: SubjectDetailPageProps) {
  const [selectedYear, setSelectedYear] = useState('1');
  const [selectedLevel, setSelectedLevel] = useState('high');
  const [searchTerm, setSearchTerm] = useState('');
  const { levelId, classId } = useParams();

  // Mock data for resources with sample PDF URLs
  const resources = {
    primary: {
      prep: [
        {
          id: 1,
          title: 'Classe Préparatoire - Premier Trimestre',
          type: 'Exam',
          downloadCount: 1234,
          duration: '1 hour',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          id: 2,
          title: 'Classe Préparatoire - Deuxième Trimestre',
          type: 'Exam',
          downloadCount: 890,
          duration: '1 hour',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ],
      '1': [
        {
          id: 3,
          title: '1ère Année - Premier Trimestre',
          type: 'Exam',
          downloadCount: 1234,
          duration: '1 hour',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ],
      '2': [
        {
          id: 4,
          title: '2ème Année - Devoir',
          type: 'Test',
          downloadCount: 856,
          duration: '1 hour',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ]
    },
    middle: {
      '1': [
        {
          id: 5,
          title: '1ère Année Moyenne - Composition',
          type: 'Exam',
          downloadCount: 789,
          duration: '2 hours',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ],
      '4': [
        {
          id: 6,
          title: '4ème Année Moyenne - BEM Blanc',
          type: 'Exam',
          downloadCount: 1432,
          duration: '2 hours',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ]
    },
    high: {
      '1': [
        {
          id: 7,
          title: '1ère AS - Devoir Surveillé',
          type: 'Test',
          downloadCount: 890,
          duration: '2 hours',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ],
      'bac': [
        {
          id: 8,
          title: 'BAC Blanc',
          type: 'Exam',
          downloadCount: 3567,
          duration: '3 hours',
          downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
      ]
    }
  };

  // Get resources based on route params or selected state
  const currentResources = levelId && classId 
    ? resources[levelId as keyof typeof resources]?.[classId] || []
    : resources[selectedLevel]?.[selectedYear] || [];

  const filteredResources = currentResources.filter(resource =>
    searchTerm === '' || resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageTitle = levelId && classId 
    ? `Resources for ${classId === 'prep' ? 'Preparatory Class' : `${classId} Year`}`
    : subject?.name || 'Resources';

  const pageDescription = levelId && classId
    ? `Browse educational materials for ${classId === 'prep' ? 'preparatory class' : `${classId} year`} students`
    : subject?.description || 'Browse educational materials';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subject Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg mr-4">
              {subject?.icon || <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {pageTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {pageDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              type={resource.type}
              downloadCount={resource.downloadCount}
              duration={resource.duration}
              downloadUrl={resource.downloadUrl}
            />
          ))}

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Book className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}