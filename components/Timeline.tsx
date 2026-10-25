
import React, { useState, useRef } from 'react';
import { LastYearGuess } from '../types';
import { TIMELINE_START_YEAR, TIMELINE_END_YEAR, YEAR_TOLERANCE, POLITICAL_ERAS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineProps {
  onGuess: (year: number) => void;
  disabled: boolean;
  lastGuess: LastYearGuess | null;
}

const Timeline: React.FC<TimelineProps> = ({ onGuess, disabled, lastGuess }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoverYear, setHoverYear] = useState<number | null>(null);
  const { t } = useLanguage();

  const totalYears = TIMELINE_END_YEAR - TIMELINE_START_YEAR;

  const calculateYearFromX = (x: number) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    return Math.round(TIMELINE_START_YEAR + percentage * totalYears);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.clientX));
  };

  const handleMouseLeave = () => {
    setHoverYear(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const year = calculateYearFromX(e.clientX);
    onGuess(year);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchEnd = () => {
    if (disabled || hoverYear === null) return;
    onGuess(hoverYear);
    setHoverYear(null);
  };


  const yearToPercentage = (year: number) => {
    const boundedYear = Math.max(TIMELINE_START_YEAR, Math.min(TIMELINE_END_YEAR, year));
    return ((boundedYear - TIMELINE_START_YEAR) / totalYears) * 100;
  };

  const centuryMarkers = [];
  for (let year = TIMELINE_START_YEAR; year <= TIMELINE_END_YEAR; year += 100) {
    if (year % 100 === 0) centuryMarkers.push(year);
  }

  return (
    <div className="w-full py-0.5 sm:py-1 px-1 sm:px-2 relative">
      <div className="relative mb-1 sm:mb-2 w-full h-5 sm:h-7 flex items-center rounded overflow-hidden border border-slate-700/80">
        {POLITICAL_ERAS.map(era => (
            <div 
                key={era.name}
                className={`h-full flex items-center justify-center px-0.5 sm:px-1 overflow-hidden ${era.color}`}
                style={{
                    position: 'absolute',
                    left: `${yearToPercentage(era.start)}%`,
                    width: `${yearToPercentage(era.end) - yearToPercentage(era.start)}%`,
                }}
            >
                <span className={`text-[8px] sm:text-[10px] md:text-xs font-semibold opacity-90 select-none truncate ${era.textColor}`}>{era.name}</span>
            </div>
        ))}
      </div>

      <div
        ref={timelineRef}
        className="w-full h-2.5 sm:h-3 bg-slate-700 rounded-full cursor-pointer relative touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
            {POLITICAL_ERAS.map(era => (
                <div
                    key={era.name}
                    aria-hidden="true"
                    className={`absolute top-0 bottom-0 h-full ${era.timelineColor}`}
                    style={{
                        left: `${yearToPercentage(era.start)}%`,
                        width: `${yearToPercentage(era.end) - yearToPercentage(era.start)}%`,
                    }}
                />
            ))}
        </div>
        
        {hoverYear && !disabled && (
          <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20" style={{ left: `${yearToPercentage(hoverYear)}%` }}>
            <div className="h-5 sm:h-6 w-1 bg-yellow-400 transform -translate-y-1/2 top-1/2 absolute"></div>
            <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-slate-800 px-1 py-0.2 rounded text-[10px] sm:text-xs text-yellow-300 whitespace-nowrap shadow">{hoverYear}</div>
          </div>
        )}

        {lastGuess && (
          <>
             <div
                className="absolute top-1/2 -translate-y-1/2 h-3.5 sm:h-4 bg-green-500/30 rounded-full animate-pop-in-marker border border-green-500/50"
                style={{
                    left: `${yearToPercentage(lastGuess.correctYear - YEAR_TOLERANCE)}%`,
                    width: `${(YEAR_TOLERANCE * 2 / totalYears) * 100}%`
                }}
             />

            <div 
              className="absolute top-1/2 -translate-y-1/2 animate-pop-in-marker animation-delay-200" 
              style={{ left: `${yearToPercentage(lastGuess.correctYear)}%` }}
            >
              <div className="h-5 sm:h-7 w-1 bg-green-400 transform -translate-y-1/2 top-1/2 absolute animate-pulse"></div>
              <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-green-900/90 border border-green-500 px-1 py-0.2 rounded text-[9px] sm:text-[11px] text-green-200 whitespace-nowrap shadow z-20">
                {t('timeline.correctYear')}: {lastGuess.correctYear}
              </div>
            </div>

            {!lastGuess.isCorrect && !lastGuess.timedOut && (
              <div 
                className="absolute top-1/2 -translate-y-1/2 animate-pop-in-marker animation-delay-400" 
                style={{ left: `${yearToPercentage(lastGuess.guessedYear)}%` }}
              >
                 <div className="h-5 sm:h-7 w-1 bg-red-500 transform -translate-y-1/2 top-1/2 absolute"></div>
                 <div className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 bg-red-900/90 border border-red-500 px-1 py-0.2 rounded text-[9px] sm:text-[11px] text-red-200 whitespace-nowrap shadow z-20">
                   {t('timeline.yourGuess')}: {lastGuess.guessedYear}
                 </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-1 sm:mt-1.5 w-full h-3 sm:h-4 relative">
        {centuryMarkers.map(year => (
          <div
            key={year}
            className="absolute top-0"
            style={{ left: `${yearToPercentage(year)}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px h-1 bg-slate-600"></div>
            <span className="text-[8px] sm:text-[10px] text-slate-500 select-none">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
