import React, { useRef } from 'react';
import { PrimeMinister } from '../types';
import CoatOfArms from './CoatOfArms';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown } from 'lucide-react';

interface PrimeMinisterCardProps {
  primeMinister: PrimeMinister;
  showTerm: boolean;
  isAdmin?: boolean;
  onPortraitUpload?: (pmId: number, newImageUrl: string) => void;
  stagedPortraitUrl?: string;
  onShowCareerTree?: (pm: PrimeMinister) => void;
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

const PrimeMinisterCard: React.FC<PrimeMinisterCardProps> = ({ primeMinister, showTerm, isAdmin, onPortraitUpload, stagedPortraitUrl, onShowCareerTree }) => {
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
    <div className={`bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700 flex flex-col items-center w-full max-w-sm transform transition-all duration-500 hover:scale-105 ${styles.cardHover}`}>
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-black p-2 rounded-lg shadow-lg mb-4 w-full">
        <div 
          className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-slate-700 flex items-center justify-center group shadow-inner"
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
            <span className="text-slate-400">{t('pmCard.noPortrait')}</span>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className="mt-2 font-semibold">{t('coatOfArms.changeImage')}</p>
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
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white pointer-events-none">{name}</h2>
        <div className={`text-md mt-2 font-semibold px-3 py-1 rounded-full inline-flex items-center gap-2 ${styles.badge} pointer-events-none`}>
          <span>{t(`party.${party.toLowerCase()}`) || party}</span>
        </div>
      </div>
      
      {showTerm && (
        <>
          <p className="text-md text-amber-300/80 mt-2 font-mono text-center">
            {termStart} – {termEndDisplay} {durationDisplay}
          </p>
          {onShowCareerTree && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowCareerTree(primeMinister);
              }}
              className="mt-3 px-3 py-1.5 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/40 hover:to-yellow-600/40 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title={`View career tree and key roles for ${name}`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Career Tree</span>
            </button>
          )}
        </>
      )}

      <div className="mt-6 pt-6 w-full border-t border-slate-700/50 flex flex-col items-center">
        <div className="flex items-center justify-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 animate-rise-up" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <CoatOfArms
                className="w-16 h-20"
                imageUrl={primeMinister.coatOfArmsUrl}
                isAdmin={isAdmin}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 animate-rise-up animation-delay-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default PrimeMinisterCard;