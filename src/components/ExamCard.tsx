import React from 'react';
import { FileText, Download } from 'lucide-react';

interface ExamCardProps {
  title: string;
  year: string;
  subject: string;
  downloadUrl: string;
}

export default function ExamCard({ title, year, subject, downloadUrl }: ExamCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
              {year}
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {subject}
            </span>
          </div>
        </div>
        <a
          href={downloadUrl}
          className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </a>
      </div>
    </div>
  );
}