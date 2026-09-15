import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('privacy.title')}</h1>
             <button
                onClick={onBack}
                className="text-slate-400 hover:text-white transition-colors text-2xl leading-none font-bold"
                aria-label="Close"
              >
                &times;
              </button>
        </div>
        <div className="p-8 overflow-y-auto text-slate-300 space-y-4">
          <p className="text-sm text-slate-500">{t('privacy.lastUpdated')} {new Date().toLocaleDateString()}</p>
          <p>{t('privacy.p1')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('privacy.h1')}</h2>
          <p>
            {t('privacy.p2').split('**').map((part, i) => (
              i % 2 === 1 ? <span key={i} className="font-bold text-white">{part}</span> : part
            ))}
          </p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('privacy.h2')}</h2>
          <p>{t('privacy.p3')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('privacy.h3')}</h2>
          <p>{t('privacy.p4')}</p>
          
          <h2 className="text-lg font-bold text-white mt-4">{t('privacy.h4')}</h2>
          <p>{t('privacy.p5')}</p>

          <h2 className="text-lg font-bold text-white mt-4">{t('privacy.h5')}</h2>
          <p>
            {t('privacy.p6').split('historicaltimelines4@gmail.com').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="font-bold text-white">historicaltimelines4@gmail.com</span>}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className="p-6 border-t border-slate-700 flex justify-end flex-shrink-0">
             <button
              onClick={onBack}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {t('privacy.back')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;