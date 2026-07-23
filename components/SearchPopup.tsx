import React, { useState, useEffect } from 'react';
import { POLITICAL_ERAS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export interface SearchFilters {
  name: string;
  startYear: string;
  endYear: string;
  era: string;
}

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose, onApplyFilters, initialFilters }) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => setFilters(initialFilters), 0);
    }
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = { name: '', startYear: '', endYear: '', era: '' };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-popup-title"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 id="search-popup-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t('search.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <div className="p-6 space-y-6">
          {/* Search by Name */}
          <div>
            <label htmlFor="search-name" className="block text-sm font-medium text-slate-300 mb-2">{t('search.name')}</label>
            <input
              type="text"
              id="search-name"
              name="name"
              placeholder={t('search.namePlaceholder')}
              value={filters.name}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Search by Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t('search.termYear')}</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="startYear"
                placeholder={t('search.from')}
                value={filters.startYear}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-400">–</span>
              <input
                type="number"
                name="endYear"
                placeholder={t('search.to')}
                value={filters.endYear}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search by Period */}
          <div>
            <label htmlFor="search-era" className="block text-sm font-medium text-slate-300 mb-2">{t('search.period')}</label>
            <select
              id="search-era"
              name="era"
              value={filters.era}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('search.allPeriods')}</option>
              {POLITICAL_ERAS.map(era => (
                <option key={era.name} value={era.name}>{era.name}</option>
              ))}
            </select>
          </div>
        </div>
        <footer className="p-4 flex justify-between items-center border-t border-slate-700">
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-slate-500/50"
          >
            {t('search.clear')}
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {t('search.apply')}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SearchPopup;
