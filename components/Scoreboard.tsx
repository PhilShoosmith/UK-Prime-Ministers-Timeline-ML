import React from 'react';
import { ROUND_DURATION_SECONDS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

interface ScoreboardProps {
  score: number;
  incorrect: number;
  round: number;
  totalRounds: number;
  timeLeft: number;
  isAdmin: boolean;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ 
  score, 
  incorrect, 
  round, 
  totalRounds, 
  timeLeft, 
  isAdmin,
  soundEnabled = true,
  onToggleSound 
}) => {
  const { t } = useLanguage();
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = isAdmin ? 100 : (timeLeft / ROUND_DURATION_SECONDS) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const timerColor = timeLeft <= 5 && !isAdmin ? 'text-red-500 animate-pulse' : 'text-yellow-300';
  const strokeColor = timeLeft <= 5 && !isAdmin ? 'stroke-red-500' : 'stroke-yellow-300';

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 sm:py-1.5 sm:px-6 z-50 border-b border-slate-700/80 shadow-md">
      <div className="max-w-5xl mx-auto grid grid-cols-3 items-center text-xs sm:text-sm font-semibold">
        <div className="flex justify-start gap-2.5 sm:gap-6 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-400 leading-tight">{t('end.correct')}</span>
            <span className="text-green-400 font-bold text-xs sm:text-base md:text-lg leading-none mt-0.5">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-400 leading-tight">{t('feedback.incorrect')}</span>
            <span className="text-red-400 font-bold text-xs sm:text-base md:text-lg leading-none mt-0.5">{incorrect}</span>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            {/* Stopwatch SVG */}
            <svg 
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 64 64"
            >
              {/* Background track */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-slate-700"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress indicator */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                className={strokeColor}
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            {/* Numeric Countdown */}
            <span className={`relative z-10 text-xs sm:text-sm md:text-base font-bold leading-none ${timerColor}`}>
               {isAdmin ? '∞' : timeLeft}
            </span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-1.5 sm:gap-3 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-400 leading-tight">{t('score.round')}</span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-white font-bold text-xs sm:text-base md:text-lg leading-none">{round}</span>
              <span className="text-[8px] sm:text-xs text-slate-400 font-normal leading-none">/{totalRounds}</span>
            </div>
          </div>
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              type="button"
              className="p-1 sm:p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              title={soundEnabled ? t('score.soundMute') : t('score.soundUnmute')}
              aria-label={soundEnabled ? t('score.soundMute') : t('score.soundUnmute')}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;