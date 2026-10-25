import React, { useState, useEffect } from 'react';
import { PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface FactGuesserProps {
  primeMinister: PrimeMinister;
  allPMs: PrimeMinister[];
  onSubmit: (pmId: number) => void;
  disabled: boolean;
  feedback: { id?: number | string; isCorrect: boolean } | null;
}

const FactGuesser: React.FC<FactGuesserProps> = ({ primeMinister, allPMs, onSubmit, disabled, feedback }) => {
  const [options, setOptions] = useState<PrimeMinister[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (primeMinister && allPMs.length > 3) {
      // Find 3 other PMs to act as distractors
      const distractors = allPMs.filter(p => p.id !== primeMinister.id);
      
      const shuffledDistractors = shuffleArray(distractors).slice(0, 3);
      
      // Combine the correct PM with the distractors and shuffle them
      const newOptions = shuffleArray([primeMinister, ...shuffledDistractors]);
      setTimeout(() => setOptions(newOptions), 0);
    }
  }, [primeMinister, allPMs]);

  if (!primeMinister) return null;

  return (
    <div className="w-full">
      <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium mb-1 sm:mb-2 text-center">
        {t('fact.title')}
      </p>
      <blockquote className="border-l-3 border-amber-500/60 pl-2.5 py-1 sm:py-1.5 mb-2 sm:mb-3 bg-slate-900/40 rounded-r-lg max-h-24 sm:max-h-28 overflow-y-auto">
        <p className="text-xs sm:text-sm text-slate-200 italic leading-snug">"{language === 'hi' && primeMinister.contextHi ? primeMinister.contextHi : (language === 'ar' && primeMinister.contextAr ? primeMinister.contextAr : (language === 'zh' && primeMinister.contextZh ? primeMinister.contextZh : (language === 'es' && primeMinister.contextEs ? primeMinister.contextEs : (language === 'ja' && primeMinister.contextJa ? primeMinister.contextJa : (language === 'fr' && primeMinister.contextFr ? primeMinister.contextFr : primeMinister.context)))))}"</p>
      </blockquote>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
        {options.map(pm => {
          const isSelected = feedback && feedback.id === pm.id;
          const isCorrect = pm.id === primeMinister.id;

          let feedbackClass = 'bg-slate-700/60 hover:bg-slate-600/80 focus:ring-teal-500/50';
          if (feedback) {
            if (isSelected) {
              feedbackClass = feedback.isCorrect
                ? 'bg-green-600 border-green-400 scale-[1.02] ring-2 ring-green-400'
                : 'bg-red-600 border-red-400 scale-[1.02] ring-2 ring-red-400';
            } else if (isCorrect && !feedback.isCorrect) {
              // If guess was wrong, highlight the correct one
              feedbackClass = 'bg-green-600/60 border-green-500/50';
            }
          }
          
          return (
            <button
              key={pm.id}
              onClick={() => onSubmit(pm.id)}
              disabled={disabled || !!feedback}
              className={`px-2 sm:px-3 py-2 sm:py-2.5 text-white font-semibold rounded-lg transform transition-all duration-200 shadow disabled:opacity-80 disabled:cursor-not-allowed focus:outline-none focus:ring-2 text-center text-xs sm:text-sm truncate ${feedbackClass}`}
              aria-label={pm.name}
            >
              {pm.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FactGuesser;