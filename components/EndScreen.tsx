import React, { useState, useEffect } from 'react';
import { ROUNDS_PER_GAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface EndScreenProps {
  score: number;
  timeLeft: number;
  onRestart: () => void;
  onSaveScore: (name: string) => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, timeLeft, onRestart, onSaveScore }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [name, setName] = useState('');
  const [hasSaved, setHasSaved] = useState(false);
  const { t } = useLanguage();

  const getTitleAndMessage = () => {
    const percentage = (score / ROUNDS_PER_GAME) * 100;
    if (percentage === 100) return { title: t('end.perfect.title'), message: t('end.perfect.message') };
    if (percentage >= 80) return { title: t('end.great.title'), message: t('end.great.message') };
    if (percentage >= 50) return { title: t('end.good.title'), message: t('end.good.message') };
    if (percentage >= 20) return { title: t('end.fair.title'), message: t('end.fair.message') };
    return { title: t('end.poor.title'), message: t('end.poor.message') };
  };

  const { title, message } = getTitleAndMessage();

  useEffect(() => {
    if (score === 0) return;
    let currentScore = 0;
    const timer = setInterval(() => {
      currentScore += 1;
      if (currentScore > score) {
        clearInterval(timer);
        setDisplayScore(score);
      } else {
        setDisplayScore(currentScore);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [score]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveScore(name);
      setHasSaved(true);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900 opacity-80"></div>
      <div className="relative text-center p-8 bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 max-w-lg mx-auto z-10 animate-fade-in-up">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2">
          {t('end.title')}
        </h2>
        <h3 className="text-3xl font-bold text-slate-200 mb-4">{title}</h3>
        <p className="text-lg text-slate-300 mb-6">{message}</p>

        <div className="w-full bg-slate-900/50 rounded-lg p-4 my-6 flex justify-around text-center">
          <div>
              <p className="text-5xl font-bold text-green-400">{displayScore}</p>
              <p className="text-slate-400 mt-1 text-sm uppercase tracking-wider">{t('end.correct')}</p>
          </div>
          <div className="border-l border-slate-700"></div>
          <div>
              <p className="text-5xl font-bold text-blue-400">{timeLeft}s</p>
              <p className="text-slate-400 mt-1 text-sm uppercase tracking-wider">{t('end.timeLeft')}</p>
          </div>
        </div>

        {!hasSaved && score > 0 ? (
          <form onSubmit={handleSave} className="mb-6 space-y-3">
            <input 
              type="text" 
              placeholder={t('end.placeholder')} 
              value={name} 
              onChange={e => setName(e.target.value.slice(0, 15))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white text-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button type="submit" className="w-full px-6 py-2 bg-amber-600 text-white font-bold rounded hover:bg-amber-700 transition-colors">
              {t('end.save')}
            </button>
          </form>
        ) : hasSaved ? (
          <p className="mb-6 text-amber-400 font-bold">{t('end.saved')}</p>
        ) : null}
      
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
        >
          {t('end.back')}
        </button>
      </div>
    </div>
  );
};

export default EndScreen;