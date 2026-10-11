import React, { useRef } from 'react';
import { PrimeMinister } from '../types';
import CoatOfArms from './CoatOfArms';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown, BookOpen } from 'lucide-react';

interface PrimeMinisterCardProps {
  primeMinister: PrimeMinister;
  showTerm: boolean;
  isAdmin?: boolean;
  onPortraitUpload?: (pmId: number, newImageUrl: string) => void;
  stagedPortraitUrl?: string;
  onShowCareerTree?: (pm: PrimeMinister) => void;
  onLearnMore?: (pm: PrimeMinister) => void;
  compact?: boolean;
}

const getPartyStyles = (party: string): { badge: string; cardHover: string; } => {
  const lowerCaseParty = party.toLowerCase();
  if (lowerCaseParty.includes('conservative')) {
    return { badge: 'bg-blue-500/10 text-blue-300', cardHover: 'hover:border-blue-500/50' };
  }
  if (lowerCaseParty.includes('labour')) {
    return { badge: 'bg-red-500/10 text-red-300', cardHover: 'hover:border-red-500/50' };
  }
  if (lowerCaseParty.includes('liberal') || lowerCaseParty.includes('whig')) {
    return { badge: 'bg-amber-500/10 text-amber-300', cardHover: 'hover:border-amber-500/50' };
  }
  if (lowerCaseParty.includes('tory')) {
     return { badge: 'bg-sky-500/10 text-sky-300', cardHover: 'hover:border-sky-500/50' };
  }
  return { badge: 'bg-slate-700 text-slate-300', cardHover: 'hover:border-slate-600' };
};

const PrimeMinisterCard: React.FC<PrimeMinisterCardProps> = ({ primeMinister, showTerm, isAdmin, onPortraitUpload, stagedPortraitUrl, onShowCareerTree, onLearnMore, compact }) => {
  const { t } = useLanguage();
  const portraitFileInputRef = useRef<HTMLInputElement>(null);

  if (!primeMinister) {
    return null;
  }

  const handleUploadClick = () => {
    portraitFileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPortraitUpload && primeMinister) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onPortraitUpload(primeMinister.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { name, party, termStart, termEnd } = primeMinister;
  const styles = getPartyStyles(party);
  const displayImageUrl = stagedPortraitUrl || primeMinister.imageUrl;
  
  const termEndDisplay = termEnd ?? t('pmCard.present');
  let durationDisplay: string;

  if (termEnd) {
    if (termEnd === termStart) {
      durationDisplay = t('pmCard.lessThanYear');
    } else {
      const duration = termEnd - termStart;
      durationDisplay = t('pmCard.years').replace('{duration}', duration.toString()).replace('{s}', duration === 1 ? '' : 's');
    }
  } else {
    const currentYear = new Date().getFullYear();
    const duration = currentYear - termStart;
    durationDisplay = t('pmCard.yearsAndCounting').replace('{duration}', duration.toString()).replace('{s}', duration === 1 ? '' : 's');
  }
  
  return (
    <div 
      onClick={() => onLearnMore?.(primeMinister)}
      className={`bg-slate-800 ${compact ? 'rounded-xl p-3 sm:p-4 max-w-[260px] sm:max-w-[280px]' : 'rounded-2xl p-6 max-w-sm'} shadow-2xl border border-slate-700 flex flex-col items-center w-full transform transition-all duration-300 hover:scale-105 ${styles.cardHover} ${onLearnMore ? 'cursor-pointer group' : ''}`}
      role={onLearnMore ? "button" : undefined}
      aria-label={onLearnMore ? `View detailed history of ${name}` : undefined}
    >
      <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-black ${compact ? 'p-1.5 mb-2' : 'p-2 mb-4'} rounded-lg shadow-lg w-full flex items-center justify-center`}>
        <div 
          className={`relative ${compact ? 'h-32 sm:h-36 w-auto aspect-[3/4] max-w-full' : 'aspect-[3/4] w-full'} rounded-md overflow-hidden bg-slate-700 flex items-center justify-center shadow-inner`}
        >
          {displayImageUrl ? (
            <img 
              src={displayImageUrl} 
              alt={`Portrait of Prime Minister ${name}`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              key={displayImageUrl}
            />
          ) : (
            <span className="text-slate-400 text-xs sm:text-sm">{t('pmCard.noPortrait')}</span>
          )}
          {stagedPortraitUrl && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg pointer-events-none">
              {t('pmCard.pending')}
            </div>
          )}
          {isAdmin && (
            <>
              <div
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}
                role="button"
                aria-label="Change PM portrait"
              >
                <div className="text-center text-white p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className="mt-1 text-xs font-semibold">{t('coatOfArms.changeImage')}</p>
                </div>
              </div>
              <input
                type="file"
                ref={portraitFileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>
      <div 
        className="text-center w-full"
      >
        <h2 className={`${compact ? 'text-lg sm:text-xl' : 'text-3xl sm:text-4xl'} font-bold text-center text-white pointer-events-none leading-tight`}>{name}</h2>
        <div className={`${compact ? 'text-xs mt-1 px-2.5 py-0.5' : 'text-md mt-2 px-3 py-1'} font-semibold rounded-full inline-flex items-center gap-1.5 ${styles.badge} pointer-events-none`}>
          <span>{t(`party.${party.toLowerCase()}`) || party}</span>
        </div>
      </div>
      
      {showTerm && (
        <>
          <p className={`${compact ? 'text-xs mt-1' : 'text-md mt-2'} text-amber-300/80 font-mono text-center`}>
            {termStart} – {termEndDisplay} {durationDisplay}
          </p>
          <div className={`${compact ? 'mt-1.5' : 'mt-3'} flex items-center justify-center gap-1.5 flex-wrap`}>
            {onLearnMore && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLearnMore(primeMinister);
                }}
                className={`px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 rounded-full ${compact ? 'text-[11px]' : 'text-xs'} font-semibold flex items-center gap-1 transition-all shadow-sm`}
                title={`View detailed history of ${name}`}
              >
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span>{t('rag.title')}</span>
              </button>
            )}
            {onShowCareerTree && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShowCareerTree(primeMinister);
                }}
                className={`px-2.5 py-1 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/40 hover:to-yellow-600/40 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-full ${compact ? 'text-[11px]' : 'text-xs'} font-semibold flex items-center gap-1 transition-all shadow-sm`}
                title={`View career tree and key roles for ${name}`}
              >
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Career Tree</span>
              </button>
            )}
          </div>
        </>
      )}

      <div className={`${compact ? 'mt-2 pt-2' : 'mt-6 pt-6'} w-full border-t border-slate-700/50 flex flex-col items-center`}>
        <div className="flex items-center justify-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className={`${compact ? 'h-4 w-4' : 'h-8 w-8'} text-slate-500 animate-rise-up`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <CoatOfArms
                className={compact ? "w-10 h-12" : "w-16 h-20"}
                imageUrl={primeMinister.coatOfArmsUrl}
                isAdmin={isAdmin}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className={`${compact ? 'h-4 w-4' : 'h-8 w-8'} text-slate-500 animate-rise-up animation-delay-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default PrimeMinisterCard;