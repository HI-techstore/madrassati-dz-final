import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

// Lazy load components
const HomePage = React.lazy(() => import('./components/HomePage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const SujetPage = React.lazy(() => import('./components/SujetPage'));
const SubjectResourcesPage = React.lazy(() => import('./components/ResourcesPage/SubjectResourcesPage'));
const AdminPage = React.lazy(() => import('./components/AdminPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/sujet" element={<SujetPage />} />
                <Route path="/subjects/level/:levelId/:classId" element={<SujetPage />} />
                <Route path="/subjects/level/:levelId/:classId/:subjectId" element={<SubjectResourcesPage />} />
                <Route path="/yefer" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}