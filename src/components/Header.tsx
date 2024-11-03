import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, Moon, Sun, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DZEducation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/sujet" 
              className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/sujet' ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              {t('common.sujet')}
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/contact' ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              {t('common.contact')}
            </Link>
            
            <LanguageSwitcher />
            
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link 
                to="/sujet" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/sujet' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.sujet')}
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/contact' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.contact')}
              </Link>
              
              <div className="flex items-center justify-between px-3 py-2">
                <LanguageSwitcher />
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}