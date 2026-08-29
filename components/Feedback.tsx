
import React from 'react';
import { AnyLastGuess, PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackProps {
  lastGuess: AnyLastGuess;
  onNext: () => void;
  primeMinister: PrimeMinister;
  allPMs: PrimeMinister[];
  onLearnMore: (primeMinister: PrimeMinister) => void;
  onStop: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ lastGuess, onNext, primeMinister, onLearnMore, allPMs, onStop }) => {
  const { t, language } = useLanguage();

  const renderFeedbackContent = () => {
    if (lastGuess.type === 'year') {
      const { isCorrect, correctYear, guessedYear, timedOut } = lastGuess;
      if (timedOut) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.timeout')}</h3>
            <p className="text-slate-300">
              {t('feedback.theAnswerWas')} <span className="font-bold text-white">{correctYear}</span>.
            </p>
          </div>
        );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{t('feedback.correct')}</h3>
            <p className="text-slate-300">
              {t('feedback.rightOnMoney').replace('{correctYear}', correctYear.toString())}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.incorrect')}</h3>
          <p className="text-slate-300">
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
            <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.timeout')}</h3>
            <p className="text-slate-300">
              {t('feedback.correctSuccessorWas')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{t('feedback.correct')}</h3>
            <p className="text-slate-300">
              {correctPM?.name}{t('feedback.wasNextPM')}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.incorrect')}</h3>
          <p className="text-slate-300">
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
            <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.timeout')}</h3>
            <p className="text-slate-300">
              {t('feedback.correctPMWas')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{t('feedback.correct')}</h3>
            <p className="text-slate-300">
              {correctPM?.name}{t('feedback.isRightAnswer')}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">{t('feedback.incorrect')}</h3>
          <p className="text-slate-300">
            {t('feedback.guessedPMButAnswer').replace('{guessedPM}', guessedPM?.name || 'an unknown PM')}<span className="font-bold text-white">{correctPM?.name || 'Unknown'}</span>.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 text-center animate-fade-in-up">
      {renderFeedbackContent()}

      <div className="mt-4 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-left">
        <p className="text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-400">{t('feedback.didYouKnow')}</span> {language === 'hi' && primeMinister.contextHi ? primeMinister.contextHi : (language === 'ar' && primeMinister.contextAr ? primeMinister.contextAr : (language === 'zh' && primeMinister.contextZh ? primeMinister.contextZh : (language === 'es' && primeMinister.contextEs ? primeMinister.contextEs : (language === 'ja' && primeMinister.contextJa ? primeMinister.contextJa : (language === 'fr' && primeMinister.contextFr ? primeMinister.contextFr : primeMinister.context)))))}
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          {t('feedback.nextRound')}
        </button>
        <button
          onClick={() => onLearnMore(primeMinister)}
          className="w-full sm:w-auto px-6 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500/50 flex items-center justify-center gap-2"
          aria-label={`Learn more about ${primeMinister.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          {t('rag.title')}
        </button>
        <button
          onClick={onStop}
          className="w-full sm:w-auto px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 flex items-center justify-center gap-2"
          aria-label="Stop game and return to start screen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.293 6.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414L13.414 9l1.293 1.293a1 1 0 01-1.414 1.414L12 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 9 9.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {t('feedback.stopGame')}
        </button>
      </div>
    </div>
  );
};

export default Feedback;