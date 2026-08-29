import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { t } = useLanguage();

  const sortedPMs = useMemo(() => 
    [...pms].sort((a, b) => a.name.localeCompare(b.name)),
    [pms]
  );

  const filteredPMs = useMemo(() => {
    return sortedPMs.filter(pm => pm.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [sortedPMs, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !selectedId || feedback) return;
    onSubmit(parseInt(selectedId, 10));
  };

  const handleSelectPM = (pm: PrimeMinister) => {
    setSelectedId(pm.id.toString());
    setSearchTerm(pm.name);
    setIsOpen(false);
  };

  const feedbackClass = feedback
    ? feedback.isCorrect 
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500/50' 
      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500/50'
    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full relative">
      <div className="w-full relative flex-grow" ref={dropdownRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setSelectedId(''); // Clear selection if typing again
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('next.inputPlaceholder')}
          disabled={disabled || !!feedback}
          className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
          aria-label="Search for the next prime minister"
        />
        
        {isOpen && !disabled && !feedback && (
          <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
            {filteredPMs.length > 0 ? (
              <ul className="py-1">
                {filteredPMs.map(pm => (
                  <li 
                    key={pm.id}
                    onClick={() => handleSelectPM(pm)}
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-white truncate"
                  >
                    {pm.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-slate-400">
                No prime ministers found.
              </div>
            )}
          </div>
        )}
      </div>
      
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