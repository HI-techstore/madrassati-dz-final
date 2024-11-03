import React, { useState } from 'react';
import { Lock, Plus, Save, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { addResource } from '../../data/resources';
import { addSubject } from '../../data/subjects';

const ADMIN_PASSWORD = 'Seek195879@&=';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  // Resource Form State
  const [resourceForm, setResourceForm] = useState({
    levelId: 'primary',
    classId: 'prep',
    subjectId: 'mathematics',
    title: '',
    type: 'Exam',
    downloadUrl: '',
    quarter: 'q1'
  });

  // Subject Form State
  const [subjectForm, setSubjectForm] = useState({
    id: '',
    name: '',
    nameAr: '',
    nameFr: '',
    color: 'indigo'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addResource(
        resourceForm.levelId,
        resourceForm.classId,
        resourceForm.subjectId,
        {
          title: resourceForm.title,
          type: resourceForm.type,
          downloadUrl: resourceForm.downloadUrl,
          quarter: resourceForm.quarter
        }
      );
      setResourceForm({
        ...resourceForm,
        title: '',
        downloadUrl: ''
      });
      alert('Resource added successfully!');
    } catch (err) {
      alert('Error adding resource');
    }
  };

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addSubject(subjectForm);
      setSubjectForm({
        id: '',
        name: '',
        nameAr: '',
        nameFr: '',
        color: 'indigo'
      });
      alert('Subject added successfully!');
    } catch (err) {
      alert('Error adding subject');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <Lock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Admin Access
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Resource Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add New Resource
            </h2>

            <form onSubmit={handleResourceSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level
                  </label>
                  <select
                    value={resourceForm.levelId}
                    onChange={(e) => setResourceForm(prev => ({ ...prev, levelId: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="middle">Middle</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Class
                  </label>
                  <select
                    value={resourceForm.classId}
                    onChange={(e) => setResourceForm(prev => ({ ...prev, classId: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="prep">Preparatory</option>
                    <option value="1ap">1st Year</option>
                    <option value="2ap">2nd Year</option>
                    <option value="3ap">3rd Year</option>
                    <option value="4ap">4th Year</option>
                    <option value="5ap">5th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select
                  value={resourceForm.subjectId}
                  onChange={(e) => setResourceForm(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="arabic">Arabic</option>
                  <option value="french">French</option>
                  <option value="science">Science</option>
                  <option value="islamic">Islamic Education</option>
                  <option value="civics">Civic Education</option>
                  <option value="art">Art</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quarter
                </label>
                <select
                  value={resourceForm.quarter}
                  onChange={(e) => setResourceForm(prev => ({ ...prev, quarter: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="q1">1st Quarter</option>
                  <option value="q2">2nd Quarter</option>
                  <option value="q3">3rd Quarter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Google Drive URL
                </label>
                <input
                  type="url"
                  value={resourceForm.downloadUrl}
                  onChange={(e) => setResourceForm(prev => ({ ...prev, downloadUrl: e.target.value }))}
                  placeholder="https://drive.google.com/uc?export=download&id=..."
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Resource
              </button>
            </form>
          </div>

          {/* Add Subject Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add New Subject
            </h2>

            <form onSubmit={handleSubjectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject ID
                </label>
                <input
                  type="text"
                  value={subjectForm.id}
                  onChange={(e) => setSubjectForm(prev => ({ ...prev, id: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name (English)
                </label>
                <input
                  type="text"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name (Arabic)
                </label>
                <input
                  type="text"
                  value={subjectForm.nameAr}
                  onChange={(e) => setSubjectForm(prev => ({ ...prev, nameAr: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name (French)
                </label>
                <input
                  type="text"
                  value={subjectForm.nameFr}
                  onChange={(e) => setSubjectForm(prev => ({ ...prev, nameFr: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Color
                </label>
                <select
                  value={subjectForm.color}
                  onChange={(e) => setSubjectForm(prev => ({ ...prev, color: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="indigo">Indigo</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Subject
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}