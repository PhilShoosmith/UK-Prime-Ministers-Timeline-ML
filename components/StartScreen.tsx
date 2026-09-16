import React, { useMemo, useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { PrimeMinister, GameMode } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
  pms: PrimeMinister[];
  onShowInstructions: () => void;
  onReview: () => void;
  onShowPrivacy: () => void;
  onShowTerms: () => void;
  onShowHallOfFame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, pms, onShowInstructions, onReview, onShowPrivacy, onShowTerms, onShowHallOfFame }) => {
  const { t } = useLanguage();
  const [dailyFact, setDailyFact] = useState<{ pmName: string; fact: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (pms.length > 0) {
      // Use current date as seed for "daily" random fact
      const today = new Date().toDateString();
      let seed = 0;
      for (let i = 0; i < today.length; i++) {
        seed += today.charCodeAt(i);
      }
      
      const randomPmIndex = seed % pms.length;
      const pm = pms[randomPmIndex];
      
      // Extract a single sentence or point from their context
      let factText = pm.context;
      const sentences = pm.context.split(/(?<=[.!?])\s+/);
      if (sentences.length > 1) {
          // Try to pick an interesting sentence (avoiding first/last if possible)
          const factIndex = (seed % (sentences.length - 1)) + 1;
          factText = sentences[factIndex] || sentences[0];
      }
      
      setDailyFact({ pmName: pm.name, fact: factText });
    }
  }, [pms]);

  const handleRefreshFact = () => {
    if (pms.length === 0) return;
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);

    // Pick a different PM than the currently displayed one if possible
    let availablePms = pms;
    if (dailyFact && pms.length > 1) {
      availablePms = pms.filter(p => p.name !== dailyFact.pmName);
    }
    const randomPm = availablePms[Math.floor(Math.random() * availablePms.length)];
    
    let factText = randomPm.context;
    const sentences = randomPm.context.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    if (sentences.length > 1) {
      const factIndex = Math.floor(Math.random() * sentences.length);
      factText = sentences[factIndex] || sentences[0];
    }

    setDailyFact({ pmName: randomPm.name, fact: factText });
  };

  const allPortraits = pms
    .map(pm => ({
      id: pm.id,
      name: pm.name,
      url: pm.imageUrl,
    }))
    .filter(p => p.url);

  const animationDuration = allPortraits.length * 5;

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative overflow-y-auto overflow-x-hidden px-4">
      {/* Background Portrait Carousel */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageDropdown />
      </div>
      <div className="fixed inset-0 flex items-center opacity-20 scale-110 blur-sm pointer-events-none">
        <div 
          className="flex-shrink-0 flex items-center"
          style={{ animation: `scroll ${animationDuration}s linear infinite` }}
        >
          {[...allPortraits, ...allPortraits].map((portrait, index) => (
            <div key={`${portrait.id}-${index}`} className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0 mx-2">
              <img 
                src={portrait.url} 
                alt={portrait.name} 
                className="w-full h-full object-cover rounded-lg shadow-lg" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Top spacer to help center content vertically but allow scrolling if needed */}
      <div className="flex-grow"></div>

      {/* Main Content Card */}
      <div className="relative text-center p-8 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full mx-auto z-10 mt-20 mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 animate-fade-in-up mt-4">
          {t('start.title')}
        </h1>
        <p className="text-lg text-slate-300 mb-8 animate-fade-in-up animation-delay-200">
          {t('start.subtitle')}
        </p>
        <div className="grid grid-cols-2 gap-6 animate-fade-in-up animation-delay-400">
            {/* Left Column */}
            <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">{t('start.learn')}</h2>
                 <button
                    onClick={onShowInstructions}
                    className="w-full flex-1 px-5 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
                    aria-label="Show game instructions"
                    >
                    {t('start.howToPlay')}
                </button>
                <button
                    onClick={onReview}
                    className="w-full flex-1 px-5 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
                    >
                    {t('start.reviewAll')}
                </button>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">{t('start.play')}</h2>
                 <button
                  onClick={() => onStart('fact')}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex flex-col items-center leading-tight"
                >
                <span>{t('start.guessPM')}</span>
                </button>
                <button
                onClick={() => onStart('year')}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex flex-col items-center leading-tight"
                >
                <span>{t('start.guessYear')}</span>
                </button>
                 <button
                onClick={() => onStart('pm')}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex flex-col items-center leading-tight"
                >
                <span>{t('start.guessSuccessor')}</span>
                </button>
            </div>
        </div>
        
        {/* Hall of Fame Link */}
        <div className="mt-8 flex justify-center items-center animate-fade-in-up animation-delay-500">
          <button 
            onClick={onShowHallOfFame} 
            className="flex items-center justify-center gap-2 text-slate-300 hover:text-yellow-400 transition-colors duration-300 focus:outline-none text-lg font-semibold"
            title={t('hof.title')}
            aria-label={t('hof.title')}
          >
            <span>{t('hof.title')} &rarr;</span>
            <span className="text-2xl hover:scale-125 transition-transform">🥇</span>
          </button>
        </div>
      </div>

      {/* Daily Historical Fact Banner */}
      {dailyFact && (
        <div className="relative w-full max-w-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 shadow-xl z-20 animate-fade-in-up animation-delay-600 mx-auto mb-8">
          <div className="flex items-start gap-3 text-left">
            <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">📜</span>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-wider">{t('start.dailyFact')}</h3>
                <button
                  type="button"
                  onClick={handleRefreshFact}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-400 hover:text-yellow-400 hover:bg-slate-800/80 active:scale-95 rounded-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                  title={t('start.refreshFact')}
                  aria-label={t('start.refreshFact')}
                >
                  <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isRefreshing ? 'rotate-180 text-yellow-400' : ''}`} />
                  <span className="hidden sm:inline">{t('start.refreshFact')}</span>
                </button>
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{dailyFact.fact}" <span className="font-semibold text-slate-400 not-italic">— {dailyFact.pmName}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow"></div>

      {/* Footer Links at the bottom of the screen */}
      <div className="relative w-full flex justify-center items-center gap-4 text-xs text-slate-500 font-medium animate-fade-in-up animation-delay-600 z-20 pb-6">
        <button onClick={onShowPrivacy} className="hover:text-slate-300 transition-colors hover:underline">{t('start.privacy')}</button>
        <span>&bull;</span>
        <button onClick={onShowTerms} className="hover:text-slate-300 transition-colors hover:underline">{t('start.terms')}</button>
        <span>&bull;</span>
        <a 
          href="mailto:historicaltimelines4@gmail.com?subject=UK%20PMs%20Timeline%20Feedback&body=?" 
          className="hover:text-slate-300 transition-colors hover:underline"
        >
          {t('start.feedback')}
        </a>
      </div>
    </div>
  );
};

export default StartScreen;