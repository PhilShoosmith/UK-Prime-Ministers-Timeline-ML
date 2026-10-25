
import React from 'react';
import { AnyLastGuess, PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown } from 'lucide-react';

interface FeedbackProps {
  lastGuess: AnyLastGuess;
  onNext: () => void;
  primeMinister: PrimeMinister;
  allPMs: PrimeMinister[];
  onLearnMore: (primeMinister: PrimeMinister) => void;
  onShowCareerTree?: (primeMinister: PrimeMinister) => void;
  onStop: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ lastGuess, onNext, primeMinister, onLearnMore, onShowCareerTree, allPMs, onStop }) => {
  const { t, language } = useLanguage();

  const renderFeedbackContent = () => {
    if (lastGuess.type === 'year') {
      const { isCorrect, correctYear, guessedYear, timedOut } = lastGuess;
      if (timedOut) {
        return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.timeout')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('feedback.theAnswerWas')} <span className="font-bold text-white">{correctYear}</span>.
            </p>
          </div>
        );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-green-400 mb-0.5 sm:mb-1">{t('feedback.correct')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('feedback.rightOnMoney').replace('{correctYear}', correctYear.toString())}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.incorrect')}</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('feedback.guessedYearBut').replace('{guessedYear}', guessedYear?.toString() || '')}<span className="font-bold text-white">{correctYear}</span>.
          </p>
        </div>
      );
    }
    
    if (lastGuess.type === 'pm') {
      const { isCorrect, correctPMId, guessedPMId, timedOut } = lastGuess;
      const correctPM = allPMs.find(m => m.id === correctPMId);
      const guessedPM = allPMs.find(m => m.id === guessedPMId);

      if (timedOut) {
         return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.timeout')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('feedback.correctSuccessorWas')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-green-400 mb-0.5 sm:mb-1">{t('feedback.correct')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {correctPM?.name}{t('feedback.wasNextPM')}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.incorrect')}</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('feedback.guessedPMButSuccessor').replace('{guessedPM}', guessedPM?.name || 'an unknown PM')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
          </p>
        </div>
      );
    }

    if (lastGuess.type === 'fact') {
      const { isCorrect, correctPMId, guessedPMId, timedOut } = lastGuess;
      const correctPM = allPMs.find(m => m.id === correctPMId);
      const guessedPM = allPMs.find(m => m.id === guessedPMId);

      if (timedOut) {
         return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.timeout')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('feedback.correctPMWas')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-base sm:text-xl font-bold text-green-400 mb-0.5 sm:mb-1">{t('feedback.correct')}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {correctPM?.name}{t('feedback.isRightAnswer')}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-base sm:text-xl font-bold text-red-400 mb-0.5 sm:mb-1">{t('feedback.incorrect')}</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('feedback.guessedPMButAnswer').replace('{guessedPM}', guessedPM?.name || 'an unknown PM')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full mx-auto p-2 sm:p-3.5 bg-slate-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl border border-slate-700/80 text-center animate-fade-in-up">
      {renderFeedbackContent()}

      <div className="mt-1.5 sm:mt-2.5 p-2 sm:p-2.5 bg-slate-900/60 border border-slate-700/70 rounded-md sm:rounded-lg text-left">
        <p className="text-[11px] sm:text-xs text-slate-300 leading-snug line-clamp-3 sm:line-clamp-4">
          <span className="font-bold text-amber-400">{t('feedback.didYouKnow')}</span> {language === 'hi' && primeMinister.contextHi ? primeMinister.contextHi : (language === 'ar' && primeMinister.contextAr ? primeMinister.contextAr : (language === 'zh' && primeMinister.contextZh ? primeMinister.contextZh : (language === 'es' && primeMinister.contextEs ? primeMinister.contextEs : (language === 'ja' && primeMinister.contextJa ? primeMinister.contextJa : (language === 'fr' && primeMinister.contextFr ? primeMinister.contextFr : primeMinister.context)))))}
        </p>
      </div>

      <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          onClick={onNext}
          className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md sm:rounded-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1"
        >
          <span>{t('feedback.nextRound')}</span>
        </button>
        <button
          onClick={() => onLearnMore(primeMinister)}
          className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md sm:rounded-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center justify-center gap-1 text-[11px] sm:text-xs md:text-sm"
          aria-label={`Learn more about ${primeMinister.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span className="truncate">{t('rag.title')}</span>
        </button>
        {onShowCareerTree && (
          <button
            onClick={() => onShowCareerTree(primeMinister)}
            className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-md sm:rounded-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-500/50 flex items-center justify-center gap-1 text-[11px] sm:text-xs md:text-sm"
            aria-label={`Show career tree for ${primeMinister.name}`}
          >
            <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-950 flex-shrink-0" />
            <span className="truncate">Career Tree</span>
          </button>
        )}
        <button
          onClick={onStop}
          className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md sm:rounded-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-red-500/50 flex items-center justify-center gap-1 text-[11px] sm:text-xs md:text-sm"
          aria-label="Stop game and return to start screen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.293 6.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414L13.414 9l1.293 1.293a1 1 0 01-1.414 1.414L12 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 9 9.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{t('feedback.stopGame')}</span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;