import React, { useState } from 'react';
import { FileText, Download, Share2, Eye, Clock, Users } from 'lucide-react';
import PDFViewer from './PDFViewer';
import { useTranslation } from 'react-i18next';
import { incrementDownloadCount } from '../data/resources';

interface ResourceCardProps {
  id: number;
  title: string;
  type: string;
  downloadCount: number;
  duration: string;
  downloadUrl: string;
  levelId: string;
  classId: string;
  subjectId: string;
}

export default function ResourceCard({
  id,
  title,
  type,
  downloadCount,
  duration,
  downloadUrl,
  levelId,
  classId,
  subjectId
}: ResourceCardProps) {
  const [showPDF, setShowPDF] = useState(false);
  const { t } = useTranslation();

  const handleDownload = () => {
    incrementDownloadCount(levelId, classId, subjectId, id);
    window.open(downloadUrl, '_blank');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: `Check out this resource: ${title}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
              <span className="text-sm text-purple-400">{type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {downloadCount} downloads
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowPDF(!showPDF)}
            className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group tooltip"
            aria-label={showPDF ? t('resources.hidePreview') : t('resources.preview')}
          >
            <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="tooltip-text">{showPDF ? t('resources.hidePreview') : t('resources.preview')}</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group tooltip"
            aria-label={t('resources.download')}
          >
            <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="tooltip-text">{t('resources.download')}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group tooltip"
            aria-label={t('resources.share')}
          >
            <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="tooltip-text">{t('resources.share')}</span>
          </button>
        </div>
      </div>

      {showPDF && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <PDFViewer url={downloadUrl} title={title} />
        </div>
      )}
    </div>
  );
}