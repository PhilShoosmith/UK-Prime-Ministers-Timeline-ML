import React, { useRef, useState, useEffect } from 'react';
import { PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown } from 'lucide-react';

interface ReviewCardProps {
  primeMinister: PrimeMinister;
  onLearnMore: (pm: PrimeMinister) => void;
  onShowCareerTree?: (pm: PrimeMinister) => void;
}

const getPartyStyles = (party: string): { border: string; } => {
  const lowerCaseParty = party.toLowerCase();
  if (lowerCaseParty.includes('conservative')) return { border: 'border-blue-500' };
  if (lowerCaseParty.includes('labour')) return { border: 'border-red-500' };
  if (lowerCaseParty.includes('liberal') || lowerCaseParty.includes('whig')) return { border: 'border-amber-500' };
  if (lowerCaseParty.includes('tory')) return { border: 'border-sky-500' };
  return { border: 'border-slate-600' };
};

const ReviewCard: React.FC<ReviewCardProps> = ({ primeMinister, onLearnMore, onShowCareerTree }) => {
  const { name, party, termStart, termEnd, context, contextFr, contextJa, contextEs, contextZh, contextAr, contextHi, imageUrl } = primeMinister;
  const styles = getPartyStyles(party);
  const { t, language } = useLanguage();
  const termEndDisplay = termEnd ?? t('reviewCard.present');
  const displayContext = language === 'hi' && contextHi ? contextHi : (language === 'ar' && contextAr ? contextAr : (language === 'zh' && contextZh ? contextZh : (language === 'es' && contextEs ? contextEs : (language === 'ja' && contextJa ? contextJa : (language === 'fr' && contextFr ? contextFr : context)))));
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setIsOverflowing(textRef.current.scrollHeight > containerRef.current.clientHeight);
      }
    };
    
    checkOverflow();
    
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [displayContext]);

  return (
    <div 
      onClick={() => onLearnMore(primeMinister)}
      className={`w-64 h-[calc(100vh-16rem)] max-h-[34rem] min-h-[24rem] flex-shrink-0 bg-slate-800 rounded-xl shadow-lg border-2 border-slate-700 hover:${styles.border} transition-all duration-300 p-3 flex flex-col cursor-pointer group`}
      role="button"
      aria-label={`Learn more about ${name}`}
    >
      <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-slate-700 mb-2 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            {t('reviewCard.noPortrait')}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow min-h-0 text-center relative">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className="text-sm font-mono text-amber-300/80">{termStart} - {termEndDisplay}</p>
        
        <div ref={containerRef} className="mt-2 overflow-hidden flex-grow text-left relative">
          <p ref={textRef} className="text-sm text-slate-300">
            {displayContext}
          </p>
          {isOverflowing && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"></div>
          )}
        </div>
        
        {/* Tooltip for overflowing text */}
        {isOverflowing && (
          <div className="absolute z-20 bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-sm border border-slate-600 p-3 rounded-lg shadow-[0_-10px_40px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
            <p className="text-sm text-slate-200 text-left">{displayContext}</p>
          </div>
        )}

        <div className="mt-2 pt-2 border-t border-slate-700/60 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowCareerTree?.(primeMinister);
            }}
            className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/40 hover:to-yellow-600/40 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            title={`View career tree and key roles for ${name}`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Career Tree</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
