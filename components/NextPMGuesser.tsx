import React, { useState, useMemo } from 'react';
import { PrimeMinister } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NextPMGuesserProps {
  pms: PrimeMinister[];
  onSubmit: (pmId: number) => void;
  disabled: boolean;
  feedback: { id?: number | string; isCorrect: boolean } | null;
}

const NextPMGuesser: React.FC<NextPMGuesserProps> = ({ pms, onSubmit, disabled, feedback }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const { t } = useLanguage();

  const sortedPMs = useMemo(() => 
    [...pms].sort((a, b) => a.name.localeCompare(b.name)),
    [pms]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !selectedId || feedback) return;
    onSubmit(parseInt(selectedId, 10));
  };

  const feedbackClass = feedback
    ? feedback.isCorrect 
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500/50' 
      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500/50'
    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        disabled={disabled || !!feedback}
        className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg w-full flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
        aria-label="Select the next prime minister"
      >
        <option value="" disabled>{t('next.inputPlaceholder')}</option>
        {sortedPMs.map(pm => (
          <option key={pm.id} value={pm.id}>
            {pm.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={disabled || !selectedId || !!feedback}
        className={`w-full sm:w-auto px-6 py-3 text-white font-bold rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 ${feedbackClass}`}
      >
        {t('timeline.submit')}
      </button>
    </form>
  );
};

export default NextPMGuesser;