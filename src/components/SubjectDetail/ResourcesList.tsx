import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PDFViewer from '../PDFViewer';
import { useTranslation } from 'react-i18next';
import { resources } from '../../data/resources';

interface Resource {
  id: number;
  title: string;
  year: string;
  downloadCount: number;
  url: string;
}

interface ResourcesListProps {
  searchTerm: string;
}

export default function ResourcesList({ searchTerm }: ResourcesListProps) {
  const { levelId = 'primary', classId = 'preparatory', subjectId = 'mathematics' } = useParams();
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const { t } = useTranslation();

  const levelResources = resources[`${levelId}/${classId}` as keyof typeof resources] || {};
  const subjectResources = levelResources[subjectId as keyof typeof levelResources] || [];
  
  const filteredResources = subjectResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredResources.map((resource) => (
        <div key={resource.id} className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                {resource.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                {resource.year}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{resource.downloadCount} downloads</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                {selectedResource === resource.id ? t('resources.hidePreview') : t('resources.preview')}
              </button>
              <a
                href={resource.url}
                download
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                {t('resources.download')}
              </a>
            </div>
          </div>
          
          {/* PDF Viewer */}
          {selectedResource === resource.id && (
            <div className="border-t border-gray-700 p-4">
              <PDFViewer url={resource.url} title={resource.title} />
            </div>
          )}
        </div>
      ))}

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            {t('resources.noResourcesFound')}
          </p>
        </div>
      )}
    </div>
  );
}