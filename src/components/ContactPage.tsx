import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const faqs = ['access', 'free', 'contribute', 'updates'];

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('contact.contactInfo')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.email')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">contact@dzeducation.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.phone')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">+213 XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.address')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Algiers, Algeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t('contact.faq')}
                </h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faqKey) => (
                  <div key={faqKey} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {t(`faq.${faqKey}.question`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t(`faq.${faqKey}.answer`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t('contact.sendMessage')}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('contact.form.send')}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {t('contact.success')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {t('contact.error')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}