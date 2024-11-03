import React, { useState } from 'react';
import { FileText, Download, Clock, Users, Eye } from 'lucide-react';
import PDFViewer from '../PDFViewer';

interface ResourceCardProps {
  title: string;
  type: string;
  downloadCount: number;
  duration: string;
  downloadUrl: string;
}

export default function ResourceCard({ title, type, downloadCount, duration, downloadUrl }: ResourceCardProps) {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {duration}
              </span>
              <span className="inline-flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {downloadCount} downloads
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPDF(!showPDF)}
              className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg"
            >
              <Eye className="h-4 w-4 mr-1" />
              {showPDF ? 'Hide' : 'View'}
            </button>
            <a
              href={downloadUrl}
              className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </a>
          </div>
        </div>
      </div>
      
      {showPDF && (
        <div className="p-4 border-t dark:border-gray-700">
          <PDFViewer url={downloadUrl} title={title} />
        </div>
      )}
    </div>
  );
}