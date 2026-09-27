import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col animate-scale-in my-6" 
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            {t('inst.title')}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
          >
            &times;
          </button>
        </header>
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-teal-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
              {t('inst.fact.title')}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('inst.fact.desc')}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
              {t('inst.year.title')}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('inst.year.desc')}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">3</span>
              {t('inst.pm.title')}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('inst.pm.desc')}
            </p>
          </section>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400">
              <span className="text-amber-400 font-bold">{t('inst.proTip')}</span> {t('inst.proTipDesc')}
            </p>
          </div>

          {/* YouTube Video Walkthrough Embed */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-slate-300 mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"></span>
              <span>{t('inst.videoTitle')}</span>
            </h4>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/M3X2tiEUah4"
                title="UK Prime Ministers Timeline Tutorial"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <footer className="p-6 border-t border-slate-700 flex justify-center">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg"
          >
            {t('inst.gotIt')}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default InstructionsModal;