import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RotateCw, Volume2, VolumeX } from 'lucide-react';
import { PrimeMinister, GameMode } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

import { allPrimeMinisters } from '../services/gameService';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
  pms: PrimeMinister[];
  onShowInstructions: () => void;
  onReview: () => void;
  onShowPrivacy: () => void;
  onShowTerms: () => void;
  onShowHallOfFame: () => void;
}

const getLocalizedFact = (pm: PrimeMinister, lang: string): string => {
  const canonical = allPrimeMinisters.find(p => p.id === pm.id) || pm;
  if (lang === 'fr' && (canonical.contextFr || pm.contextFr)) return (canonical.contextFr || pm.contextFr)!;
  if (lang === 'ja' && (canonical.contextJa || pm.contextJa)) return (canonical.contextJa || pm.contextJa)!;
  if (lang === 'es' && (canonical.contextEs || pm.contextEs)) return (canonical.contextEs || pm.contextEs)!;
  if (lang === 'zh' && (canonical.contextZh || pm.contextZh)) return (canonical.contextZh || pm.contextZh)!;
  if (lang === 'ar' && (canonical.contextAr || pm.contextAr)) return (canonical.contextAr || pm.contextAr)!;
  if (lang === 'hi' && (canonical.contextHi || pm.contextHi)) return (canonical.contextHi || pm.contextHi)!;
  return canonical.context || pm.context;
};

const StartScreen: React.FC<StartScreenProps> = ({ onStart, pms, onShowInstructions, onReview, onShowPrivacy, onShowTerms, onShowHallOfFame }) => {
  const { t, language } = useLanguage();
  const [refreshedPmId, setRefreshedPmId] = useState<number | null>(null);

  const defaultDailyPmId = useMemo(() => {
    const list = pms && pms.length > 0 ? pms : allPrimeMinisters;
    if (!list || list.length === 0) return null;
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    const randomPmIndex = seed % list.length;
    return list[randomPmIndex]?.id ?? list[0]?.id;
  }, [pms]);

  const activeDailyPmId = refreshedPmId ?? defaultDailyPmId;

  const currentDailyPm = useMemo(() => {
    const list = pms && pms.length > 0 ? pms : allPrimeMinisters;
    if (!list || list.length === 0 || activeDailyPmId == null) return null;
    return list.find(p => p.id === activeDailyPmId) || list[0];
  }, [pms, activeDailyPmId]);

  const dailyFactText = currentDailyPm ? getLocalizedFact(currentDailyPm, language) : '';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const savedPreference = localStorage.getItem('ukpm_bgm_enabled');
    const shouldPlay = savedPreference !== 'false';

    const audio = new Audio('/audio/pachelbel-canon.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    if (shouldPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) setIsPlaying(true);
          })
          .catch(() => {
            if (isMounted) setIsPlaying(false);
          });
      }

      // Autoplay unlock fallback on first user interaction anywhere
      const handleFirstInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          const currentPref = localStorage.getItem('ukpm_bgm_enabled');
          if (currentPref !== 'false') {
            audioRef.current.play()
              .then(() => {
                if (isMounted) setIsPlaying(true);
              })
              .catch(() => {});
          }
        }
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };

      window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
      window.addEventListener('keydown', handleFirstInteraction, { once: true });

      return () => {
        isMounted = false;
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/audio/pachelbel-canon.mp3');
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('ukpm_bgm_enabled', 'false');
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('ukpm_bgm_enabled', 'true');
        })
        .catch(() => {});
    }
  };

  const handleRefreshFact = () => {
    if (pms.length === 0) return;
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);

    // Pick a different PM than the currently displayed one if possible
    const availablePms = pms.length > 1 && currentDailyPm
      ? pms.filter(p => p.id !== currentDailyPm.id)
      : pms;
    const randomPm = availablePms[Math.floor(Math.random() * availablePms.length)];
    setRefreshedPmId(randomPm.id);
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
      {/* Top Left: Music Off/On Toggle */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <button
          onClick={toggleAudio}
          type="button"
          className="px-2.5 py-2 sm:px-3 sm:py-2 bg-slate-800/85 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700 backdrop-blur-md shadow-md flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500/50 whitespace-nowrap"
          title={isPlaying ? `${t('start.musicMute')} (Pachelbel - Canon)` : `${t('start.musicPlay')} (Pachelbel - Canon)`}
          aria-label={isPlaying ? `${t('start.musicMute')} - Pachelbel - Canon` : `${t('start.musicPlay')} - Pachelbel - Canon`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-emerald-400">
                Pachelbel - Canon
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-slate-400">
                Pachelbel - Canon
              </span>
            </>
          )}
        </button>
      </div>

      {/* Top Right: Language Selection */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
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
      {currentDailyPm && dailyFactText && (
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
                "{dailyFactText}" <span className="font-semibold text-slate-400 not-italic">— {currentDailyPm.name}</span>
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