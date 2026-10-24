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
      className={`w-56 sm:w-64 h-[calc(100vh-14rem)] max-h-[30rem] min-h-[21rem] flex-shrink-0 bg-slate-800 rounded-xl shadow-lg border-2 border-slate-700 hover:${styles.border} transition-all duration-300 p-3 flex flex-col cursor-pointer group`}
      role="button"
      aria-label={`Learn more about ${name}`}
    >
      {/* Scaled-down picture */}
      <div className="w-full flex justify-center mb-2 flex-shrink-0">
        <div className="relative h-24 sm:h-28 w-auto aspect-[3/4] rounded-lg overflow-hidden bg-slate-700 border border-slate-600/60 shadow-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Portrait of ${name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs px-2 text-center">
              {t('reviewCard.noPortrait')}
            </div>
          )}
        </div>
      </div>

      {/* PM Details */}
      <div className="flex flex-col flex-grow min-h-0 text-center">
        <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate px-1">{name}</h3>
        <p className="text-xs font-mono text-amber-300/80 mt-0.5">{termStart} - {termEndDisplay}</p>
        
        {/* Historical Fact - with smaller font and clean scrollable view, NO overlays */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="mt-2 p-2 bg-slate-900/40 rounded-lg border border-slate-700/40 overflow-y-auto flex-grow text-left cursor-text"
        >
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
            {displayContext}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-2 pt-2 border-t border-slate-700/60 flex-shrink-0 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore(primeMinister);
            }}
            className="flex-1 py-1.5 px-2 bg-blue-600/25 hover:bg-blue-600/40 text-blue-300 border border-blue-500/40 hover:border-blue-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
            title={`View detailed history of ${name}`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('rag.title')}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowCareerTree?.(primeMinister);
            }}
            className="flex-1 py-1.5 px-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/40 hover:to-yellow-600/40 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm"
            title={`View career tree and key roles for ${name}`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Career</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
