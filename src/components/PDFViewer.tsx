import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, Share2, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Use a reliable CDN for the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Format Google Drive URL if needed
  const getPdfUrl = (inputUrl: string) => {
    try {
      const url = new URL(inputUrl);
      if (url.hostname === 'drive.google.com') {
        const id = url.searchParams.get('id');
        if (id) {
          return `https://drive.google.com/uc?export=download&id=${id}`;
        }
      }
      return inputUrl;
    } catch {
      return inputUrl;
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPageNumber(1);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setLoading(false);
    setError(t('pdf.loadError', 'Unable to load PDF. Please try downloading directly.'));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: t('pdf.shareText', { title }),
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('pdf.linkCopied', 'Link copied to clipboard!'));
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const formattedUrl = getPdfUrl(url);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4 p-2 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleShare}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={t('pdf.share', 'Share')}
          >
            <Share2 className="h-5 w-5" />
          </button>
          <a
            href={formattedUrl}
            download
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={t('pdf.download', 'Download')}
          >
            <Download className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative min-h-[500px] overflow-x-auto">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-50">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <a
              href={formattedUrl}
              download
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('pdf.downloadDirectly', 'Download PDF')}
            </a>
          </div>
        ) : (
          <Document
            file={formattedUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex justify-center"
            error={
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
                <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
                <p className="text-red-500 dark:text-red-400 mb-4">
                  {t('pdf.loadError', 'Unable to load PDF. Please try downloading directly.')}
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg max-w-full h-auto"
              scale={scale}
              loading={null}
            />
          </Document>
        )}
      </div>

      {numPages > 0 && !error && (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title={t('pdf.zoomOut', 'Zoom out')}
            >
              -
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(s => Math.min(s + 0.1, 2))}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title={t('pdf.zoomIn', 'Zoom in')}
            >
              +
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
              disabled={pageNumber <= 1}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {t('pdf.pageCount', 'Page {{current}} of {{total}}', { current: pageNumber, total: numPages })}
            </span>
            <button
              onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
              disabled={pageNumber >= numPages}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}