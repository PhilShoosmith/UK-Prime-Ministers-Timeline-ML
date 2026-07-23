import React from 'react';
import { ROUND_DURATION_SECONDS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface ScoreboardProps {
  score: number;
  incorrect: number;
  round: number;
  totalRounds: number;
  timeLeft: number;
  isAdmin: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, incorrect, round, totalRounds, timeLeft, isAdmin }) => {
  const { t } = useLanguage();
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = isAdmin ? 100 : (timeLeft / ROUND_DURATION_SECONDS) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const timerColor = timeLeft <= 5 && !isAdmin ? 'text-red-500 animate-pulse' : 'text-yellow-300';
  const strokeColor = timeLeft <= 5 && !isAdmin ? 'stroke-red-500' : 'stroke-yellow-300';

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/70 backdrop-blur-md p-4 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center text-xs sm:text-sm md:text-base font-semibold">
        <div className="flex justify-start gap-4 sm:gap-8 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">{t('end.correct')}</span>
            <span className="text-green-400 font-bold text-base sm:text-xl md:text-2xl leading-none mt-1">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">{t('feedback.incorrect')}</span>
            <span className="text-red-400 font-bold text-base sm:text-xl md:text-2xl leading-none mt-1">{incorrect}</span>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
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
            <span className={`relative z-10 text-lg sm:text-2xl font-bold leading-none ${timerColor}`}>
               {isAdmin ? '∞' : timeLeft}
            </span>
          </div>
        </div>

        <div className="flex justify-end text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">{t('score.round')}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-white font-bold text-base sm:text-xl md:text-2xl leading-none">{round}</span>
              <span className="text-xs sm:text-sm text-slate-400 font-normal leading-none">/ {totalRounds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;