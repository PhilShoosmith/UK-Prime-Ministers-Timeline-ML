import React, { useState, useEffect, useRef } from 'react';
import { Leaderboards, GameMode } from '../types';
import { Volume2, VolumeX, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Confetti from './Confetti';

interface HallOfFameProps {
  leaderboards: Leaderboards;
  onBack: () => void;
  initialMode?: GameMode;
}

const HallOfFame: React.FC<HallOfFameProps> = ({ leaderboards, onBack, initialMode }) => {
  const [activeMode, setActiveMode] = useState<GameMode>(initialMode || 'fact');
  const [timeFilter, setTimeFilter] = useState<'allTime' | 'lastMonth' | 'lastWeek'>('allTime');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioSupported, setIsAudioSupported] = useState<boolean>(true);
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Hide confetti after 6 seconds to clean up DOM
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    // Create audio element in memory so it's not tied to the DOM
    const audio = new Audio();
    
    // Check if browser supports MP3
    if (audio.canPlayType('audio/mpeg') !== '') {
      audio.src = "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/45/%27Rule%2C_Britannia%21%27_%28United_States_Army_Strings%29.oga/%27Rule%2C_Britannia%21%27_%28United_States_Army_Strings%29.oga.mp3";
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (isMounted) setIsPlaying(true);
        }).catch(e => {
          if (e.name === 'NotSupportedError') {
            if (isMounted) setTimeout(() => setIsAudioSupported(false), 0);
            console.warn("Audio format is not supported in this browser.");
          } else if (e.name !== 'AbortError') {
            console.log("Audio autoplay prevented:", e);
          }
          if (isMounted) setTimeout(() => setIsPlaying(false), 0);
        });
      }
    } else {
      if (isMounted) setTimeout(() => setIsAudioSupported(false), 0);
      console.warn("MP3 audio format is not supported in this browser.");
    }
    
    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error(e));
      }
    }
  };

  const modeLabels: Record<GameMode, string> = {
    fact: t('hof.mode.fact'),
    year: t('hof.mode.year'),
    pm: t('hof.mode.pm')
  };

  const parseDate = (dateStr: string) => {
    let d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date(0);
  };

  const filteredEntries = leaderboards[activeMode].filter(entry => {
    if (timeFilter === 'allTime') return true;
    const entryDate = parseDate(entry.date);
    if (entryDate.getTime() === 0) return true; // keep unparseable to be safe
    const timeLimit = new Date();
    if (timeFilter === 'lastWeek') {
      timeLimit.setDate(timeLimit.getDate() - 7);
    } else if (timeFilter === 'lastMonth') {
      timeLimit.setMonth(timeLimit.getMonth() - 1);
    }
    timeLimit.setHours(0, 0, 0, 0);
    return entryDate.getTime() >= timeLimit.getTime();
  });

  const entries = filteredEntries;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      {showConfetti && <Confetti />}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-2xl w-full h-[85vh] flex flex-col animate-fade-in relative">
        <header className="p-4 sm:p-6 border-b border-slate-700 flex flex-col flex-shrink-0">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <Trophy className="hidden sm:block w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              {t('hof.title')}
            </h1>

            <div className="flex items-center justify-center bg-slate-900/50 p-1 rounded-lg gap-1 border border-slate-700/50 shadow-inner">
              {(['lastWeek', 'lastMonth', 'allTime'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                    timeFilter === filter
                      ? 'bg-slate-700 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {t(`hof.filter.${filter}` as any)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button 
                 onClick={onBack}
                 className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all shadow-lg text-sm flex items-center gap-2"
              >
                 &larr; <span className="hidden sm:inline">{t('review.back')}</span>
              </button>
              {isAudioSupported && (
                <button 
                  onClick={toggleAudio}
                  className="p-1.5 sm:p-2 bg-slate-700/50 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
                  title={isPlaying ? "Mute Music" : "Play Music"}
                >
                  {isPlaying ? <Volume2 size={18} className="sm:w-5 sm:h-5" /> : <VolumeX size={18} className="sm:w-5 sm:h-5" />}
                </button>
              )}
            </div>
          </div>
          
          <div className="flex w-full gap-2 p-1 bg-slate-900/50 rounded-lg">
            {(['fact', 'year', 'pm'] as GameMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`flex-1 px-4 py-2 rounded-md font-bold text-sm transition-all ${
                  activeMode === mode 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {modeLabels[mode]}
              </button>
            ))}
          </div>

        </header>

        <div className="flex-grow overflow-y-auto p-6">
          <table className="w-full text-left">
            <thead className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-700/50">
              <tr>
                <th className="pb-3 pl-2">{t('hof.rank')}</th>
                <th className="pb-3">{t('hof.player')}</th>
                <th className="pb-3 text-center">{t('hof.score')}</th>
                <th className="pb-3 text-center">{t('hof.time')}</th>
                <th className="pb-3 text-right pr-2">{t('hof.date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {entries.length > 0 ? entries.map((entry, idx) => (
                <tr key={idx} className={`group ${idx < 3 ? 'text-amber-200 font-bold' : 'text-slate-300'}`}>
                  <td className="py-4 pl-2">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </td>
                  <td className="py-4 truncate max-w-[120px]">{entry.name}</td>
                  <td className="py-4 text-center">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded border border-green-800/50">
                      {entry.score}/10
                    </span>
                  </td>
                  <td className="py-4 text-center font-mono text-blue-400">{entry.timeLeft}s</td>
                  <td className="py-4 text-right text-xs text-slate-500 pr-2">
                    {(() => {
                      try {
                        const d = new Date(entry.date);
                        if (isNaN(d.getTime())) return entry.date;
                        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                      } catch {
                        return entry.date;
                      }
                    })()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 italic">
                    {t('hof.noRecords')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;