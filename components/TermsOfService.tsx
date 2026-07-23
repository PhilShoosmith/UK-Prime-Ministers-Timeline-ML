import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('terms.title')}</h1>
            <button
                onClick={onBack}
                className="text-slate-400 hover:text-white transition-colors text-2xl leading-none font-bold"
                aria-label="Close"
              >
                &times;
              </button>
        </div>
        <div className="p-8 overflow-y-auto text-slate-300 space-y-4">
          <p className="text-sm text-slate-500">{t('terms.lastUpdated')} {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('terms.h1')}</h2>
          <p>{t('terms.p1')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('terms.h2')}</h2>
          <p>{t('terms.p2')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('terms.h3')}</h2>
          <p>{t('terms.p3')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('terms.h4')}</h2>
          <p>{t('terms.p4')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('terms.h5')}</h2>
          <p>{t('terms.p5')}</p>
        </div>
        <div className="p-6 border-t border-slate-700 flex justify-end flex-shrink-0">
             <button
              onClick={onBack}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {t('terms.back')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;