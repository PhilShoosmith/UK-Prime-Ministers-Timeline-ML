import React from 'react';
import { PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown, BookOpen } from 'lucide-react';

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

  return (
    <div 
      onClick={() => onLearnMore(primeMinister)}
      className={`w-64 sm:w-72 h-[490px] sm:h-[530px] flex-shrink-0 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700/70 hover:${styles.border} hover:shadow-2xl transition-all duration-300 p-2.5 sm:p-3 flex flex-col cursor-pointer group`}
      role="button"
      aria-label={`Learn more about ${name}`}
    >
      {/* Picture - exactly two-thirds (66%) of the card height */}
      <div className="w-full h-[64%] sm:h-[66%] rounded-xl overflow-hidden bg-slate-800 shadow-md flex-shrink-0 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs px-2 text-center">
            {t('reviewCard.noPortrait')}
          </div>
        )}
      </div>

      {/* Remaining one-third: Name, Dates, Full Factual Text, and Action Buttons with zero overlay and zero scroll */}
      <div className="flex flex-col flex-grow min-h-0 justify-between pt-1.5 sm:pt-2">
        <div className="flex-shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-white text-center leading-tight truncate px-1">
            {name}
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-amber-400 text-center font-mono mt-0.5">
            {termStart} - {termEndDisplay}
          </p>
        </div>
        
        {/* Historical Context - full text displayed cleanly with NO scroll and NO overlay */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="flex-grow flex items-center my-0.5 text-left cursor-text overflow-hidden"
        >
          <p className="text-[10.5px] sm:text-[11.5px] text-slate-300 leading-tight sm:leading-snug px-0.5">
            {displayContext}
          </p>
        </div>

        {/* Action Buttons matching Lord North reference */}
        <div className="pt-1.5 sm:pt-2 border-t border-slate-800 flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore(primeMinister);
            }}
            className="flex-1 py-1 sm:py-1.5 px-2 bg-blue-600/20 hover:bg-blue-600/35 text-blue-300 border border-blue-500/40 hover:border-blue-400 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            title={`View detailed history of ${name}`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">{t('rag.title')}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowCareerTree?.(primeMinister);
            }}
            className="flex-1 py-1 sm:py-1.5 px-2 bg-amber-600/20 hover:bg-amber-600/35 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            title={`View career tree and key roles for ${name}`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">Career</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
