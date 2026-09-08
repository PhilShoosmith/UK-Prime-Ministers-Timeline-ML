import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PrimeMinister } from '../types';
import ReviewCard from './ReviewCard';
import SearchPopup, { SearchFilters } from './SearchPopup';
import { POLITICAL_ERAS } from '../constants';
import { Rewind, FastForward, Play, Pause } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewScreenProps {
  pms: PrimeMinister[];
  onStop: () => void;
  onLearnMore: (pm: PrimeMinister) => void;
  onShowCareerTree?: (pm: PrimeMinister) => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ pms, onStop, onLearnMore, onShowCareerTree }) => {
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { t } = useLanguage();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: '',
    startYear: '',
    endYear: '',
    era: '',
  });

  const filteredPms = useMemo(() => {
    const { name, startYear, endYear, era } = searchFilters;

    if (!name.trim() && !startYear && !endYear && !era) {
      return pms;
    }
    
    return pms.filter(pm => {
      const nameMatch = name
        ? pm.name.toLowerCase().includes(name.toLowerCase())
        : true;

      const eraMatch = (() => {
        if (!era) return true;
        const selectedEra = POLITICAL_ERAS.find(e => e.name === era);
        if (!selectedEra) return true;
        return pm.termStart >= selectedEra.start && pm.termStart <= selectedEra.end;
      })();

      const dateMatch = (() => {
        const startFilter = startYear ? parseInt(startYear, 10) : null;
        const endFilter = endYear ? parseInt(endYear, 10) : null;

        if (!startFilter && !endFilter) return true;

        const pmEnd = pm.termEnd ?? new Date().getFullYear();

        if (startFilter && endFilter) {
          if (startFilter > endFilter) return true; // Ignore invalid range
          return pm.termStart <= endFilter && pmEnd >= startFilter;
        }
        if (startFilter) {
          return pmEnd >= startFilter;
        }
        if (endFilter) {
          return pm.termStart <= endFilter;
        }
        return true;
      })();
      
      return nameMatch && eraMatch && dateMatch;
    });
  }, [pms, searchFilters]);
  
  const isSearching = searchFilters.name.trim().length > 0 || !!searchFilters.startYear || !!searchFilters.endYear || !!searchFilters.era;
  const baseDuration = pms.length * 7; // ~7 seconds per card

  const pmsToDisplay = isSearching ? filteredPms : [...pms, ...pms];
  
  const activeFilterCount = [
    searchFilters.name.trim(),
    searchFilters.era,
    (searchFilters.startYear || searchFilters.endYear)
  ].filter(Boolean).length;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const stateRef = useRef({ isPaused: isHoverPaused || isManuallyPaused, isSearching, speed, direction, baseDuration });

  useEffect(() => {
    stateRef.current = { isPaused: isHoverPaused || isManuallyPaused, isSearching, speed, direction, baseDuration };
  }, [isHoverPaused, isManuallyPaused, isSearching, speed, direction, baseDuration]);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        let deltaTime = time - lastTimeRef.current;
        if (deltaTime > 100) deltaTime = 16; // Cap deltaTime to avoid jumps when tab is inactive
        
        const { isPaused, isSearching, speed, direction, baseDuration } = stateRef.current;
        
        if (!isPaused && !isSearching) {
          const progressDelta = (deltaTime / (baseDuration * 1000)) * speed * direction;
          
          progressRef.current += progressDelta;
          
          if (progressRef.current >= 1) {
            progressRef.current -= 1;
          } else if (progressRef.current < 0) {
            progressRef.current += 1;
          }
        }
      }
      lastTimeRef.current = time;
      
      if (scrollContainerRef.current) {
        if (!stateRef.current.isSearching) {
          scrollContainerRef.current.style.transform = `translateX(-${progressRef.current * 50}%)`;
        } else {
          scrollContainerRef.current.style.transform = 'none';
        }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleFastForward = () => {
    setIsManuallyPaused(false);
    if (direction === -1) {
      setDirection(1);
      setSpeed(2);
    } else {
      setSpeed(prev => Math.min(prev * 2, 8));
    }
  };

  const handleRewind = () => {
    setIsManuallyPaused(false);
    if (direction === 1) {
      setDirection(-1);
      setSpeed(2);
    } else {
      setSpeed(prev => Math.min(prev * 2, 8));
    }
  };

  const togglePlayPause = () => {
    if (isManuallyPaused) {
      setIsManuallyPaused(false);
      setSpeed(1);
      setDirection(1);
    } else {
      setIsManuallyPaused(true);
    }
  };


  return (
    <div className="w-full h-screen flex flex-col items-center justify-between relative overflow-hidden bg-slate-900">
      <header className="w-full z-10 p-2 sm:p-4 pt-4 sm:pt-8 bg-slate-900/50 backdrop-blur-sm flex flex-col gap-2 sm:gap-6">
        <div className="w-full max-w-6xl mx-auto relative flex items-center justify-center px-2 sm:px-4">
          <div className="absolute left-2 sm:left-4">
            <button
              onClick={onStop}
              className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-slate-500/50 whitespace-nowrap"
            >
              &lt;<span className="hidden md:inline"> {t('review.back')}</span>
            </button>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            {t('review.title')}
          </h1>
          
          <div className="absolute right-2 sm:right-4">
            <button
                onClick={() => setIsSearchPopupOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all flex items-center gap-1 sm:gap-2 shadow-md"
                aria-label="Open advanced search and filtering options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">{t('review.searchFilter')}</span>
              {activeFilterCount > 0 && (
                <span className="bg-white text-blue-600 text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 text-center pointer-events-none">
          {isSearching 
            ? t('review.found').replace('{count}', filteredPms.length.toString()).replace('{s}', filteredPms.length !== 1 ? 's' : '')
            : t('review.hoverToPause')
          }
        </p>
      </header>

      <div 
        className={`flex-grow w-full flex items-center ${isSearching ? 'overflow-x-auto justify-start' : 'overflow-hidden'}`}
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={() => setIsHoverPaused(true)}
        onTouchEnd={() => setIsHoverPaused(false)}
      >
        <div 
          ref={scrollContainerRef}
          className="flex-shrink-0 flex items-center gap-4 px-4"
        >
          {pmsToDisplay.map((pm, index) => (
            <ReviewCard
              key={`${pm.id}-${index}`}
              primeMinister={pm}
              onLearnMore={onLearnMore}
              onShowCareerTree={onShowCareerTree}
            />
          ))}
          {isSearching && filteredPms.length === 0 && (
            <div className="w-full text-center flex justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-xl text-slate-400 bg-slate-800/80 p-6 rounded-lg">{t('review.noPMs')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full z-10 p-2 sm:p-6 bg-slate-900/50 backdrop-blur-sm flex justify-center pb-4 sm:pb-8">
        {!isSearching && (
          <div className="flex items-center bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full px-2 sm:px-4 py-1 gap-2 sm:gap-4 shadow-lg">
            <button 
              onClick={handleRewind}
              className={`p-2 rounded-full transition-colors ${!isManuallyPaused && direction === -1 && speed > 1 ? 'text-blue-400 bg-blue-400/10' : 'text-slate-400 hover:text-white'}`}
              title="Fast Reverse"
            >
              <Rewind size={20} />
            </button>
            
            <button 
              onClick={togglePlayPause}
              className={`p-2 rounded-full transition-colors ${!isManuallyPaused && speed === 1 && direction === 1 ? 'text-blue-400 bg-blue-400/10' : 'text-slate-400 hover:text-white'}`}
              title={isManuallyPaused ? "Play" : "Pause"}
            >
              {isManuallyPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>

            <button 
              onClick={handleFastForward}
              className={`p-2 rounded-full transition-colors ${!isManuallyPaused && direction === 1 && speed > 1 ? 'text-blue-400 bg-blue-400/10' : 'text-slate-400 hover:text-white'}`}
              title="Fast Forward"
            >
              <FastForward size={20} />
            </button>
            
            {speed > 1 && (
              <span className="text-xs font-mono text-blue-400 font-bold w-8 text-center">
                {speed}x
              </span>
            )}
          </div>
        )}
      </div>

      <SearchPopup
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onApplyFilters={setSearchFilters}
        initialFilters={searchFilters}
      />
    </div>
  );
};

export default ReviewScreen;