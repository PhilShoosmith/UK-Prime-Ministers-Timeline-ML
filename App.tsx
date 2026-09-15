/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { PrimeMinister, GameState, AnyLastGuess, GameMode, Leaderboards, HallOfFameEntry } from './types';
import { getGamePrimeMinisters, allPrimeMinisters, getSuccessorPrimeMinisters } from './services/gameService';
import { fetchLeaderboards, saveLeaderboardEntry } from './services/leaderboardService';
import { ROUNDS_PER_GAME, YEAR_TOLERANCE, ROUND_DURATION_SECONDS, POLITICAL_ERAS } from './constants';
import StartScreen from './components/StartScreen';
import Scoreboard from './components/Scoreboard';
import PrimeMinisterCard from './components/PrimeMinisterCard';
import Timeline from './components/Timeline';
import Feedback from './components/Feedback';
import EndScreen from './components/EndScreen';
import { GoogleGenAI } from '@google/genai';
import RAGModal from './components/RAGModal';
import Confetti from './components/Confetti';
import NextPMGuesser from './components/NextPMGuesser';
import ReviewScreen from './components/ReviewScreen';
import FactGuesser from './components/FactGuesser';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import HallOfFame from './components/HallOfFame';
import InstructionsModal from './components/InstructionsModal';
import CareerTreeModal from './components/CareerTreeModal';
import { useLanguage } from './contexts/LanguageContext';

interface GroundingSource {
  uri: string;
  title: string;
}

const eraToGradientMap: { [key: string]: string } = {
  'Whig Ascendancy': 'from-green-800',
  'Pitt & The Wars': 'from-sky-800',
  'Victorian Reform': 'from-purple-800',
  'World Wars & Consensus': 'from-yellow-800',
  'Modern Politics': 'from-red-800',
};

const DynamicBackground: React.FC<{ era: (typeof POLITICAL_ERAS)[0] | null }> = ({ era }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-900">
      {POLITICAL_ERAS.map(p => (
        <div 
          key={p.name} 
          className={
            `absolute inset-0 bg-gradient-to-br ${eraToGradientMap[p.name]} to-slate-900 transition-opacity duration-1000 ease-in-out
             ${era?.name === p.name ? 'opacity-30' : 'opacity-0'}`
          } 
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameMode, setGameMode] = useState<GameMode>('year');
  const [allPMsData] = useState<PrimeMinister[]>(allPrimeMinisters);
  const [gamePMIds, setGamePMIds] = useState<number[]>([]);
  
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState<number>(0);
  const [lastGuess, setLastGuess] = useState<AnyLastGuess | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(ROUND_DURATION_SECONDS);
  const [typedYear, setTypedYear] = useState<string>('');
  const [isAdmin] = useState<boolean>(false);
  const [adminViewIndex] = useState<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const [guessFeedback, setGuessFeedback] = useState<{ id?: number | string; isCorrect: boolean } | null>(null);
  const { t, language } = useLanguage();

  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const [leaderboards, setLeaderboards] = useState<Leaderboards>({ year: [], pm: [], fact: [] });
  const [initialHallOfFameMode, setInitialHallOfFameMode] = useState<GameMode | undefined>();
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  const [isRagModalOpen, setIsRagModalOpen] = useState<boolean>(false);
  const [ragContent, setRagContent] = useState<{ title: string; text: string; imageUrl?: string; } | null>(null);
  const [ragSources, setRagSources] = useState<GroundingSource[]>([]);
  const [isRagLoading, setIsRagLoading] = useState<boolean>(false);

  const [selectedCareerPM, setSelectedCareerPM] = useState<PrimeMinister | null>(null);
  const handleShowCareerTree = useCallback((pm: PrimeMinister) => {
    setSelectedCareerPM(pm);
  }, []);

  // Fetch leaderboards on mount
  useEffect(() => {
    const loadLeaderboards = async () => {
      const data = await fetchLeaderboards();
      setLeaderboards(data);
    };
    loadLeaderboards();
  }, []);

  const primeMinisters = useMemo(() =>
    gamePMIds
      .map(id => allPMsData.find(m => m.id === id))
      .filter((m): m is PrimeMinister => m !== undefined),
    [gamePMIds, allPMsData]
  );

  const clearTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const startGame = useCallback((mode: GameMode) => {
    setShowConfetti(false);
    setGameMode(mode);
    const gamePMs = mode === 'pm'
      ? getSuccessorPrimeMinisters(allPMsData)
      : getGamePrimeMinisters(allPMsData);
    setGamePMIds(gamePMs.map(m => m.id));
    setCurrentRound(0);
    setScore(0);
    setTotalTimeLeft(0);
    setLastGuess(null);
    setTypedYear('');
    setGameState('playing');
  }, [allPMsData]);

  const handleYearGuess = useCallback((guessedYear: number) => {
    if (!primeMinisters[currentRound] || guessFeedback) return;

    const timedOut = guessedYear === 0;
    const correctYear = primeMinisters[currentRound].termStart;
    const isCorrect = !timedOut && Math.abs(guessedYear - correctYear) <= YEAR_TOLERANCE;

    if (timedOut) {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setLastGuess({ type: 'year', isCorrect: false, guessedYear, correctYear, timedOut });
      setGameState('feedback');
      return;
    }

    setGuessFeedback({ id: 'year', isCorrect });

    setTimeout(() => {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
        setShowConfetti(true);
      }
      setLastGuess({ type: 'year', isCorrect, guessedYear, correctYear, timedOut });
      setGameState('feedback');
      setGuessFeedback(null);
    }, 1200);
  }, [primeMinisters, currentRound, clearTimer, guessFeedback]);

  const handlePMGuess = useCallback((guessedPMId: number) => {
    if (!primeMinisters[currentRound] || guessFeedback) return;

    const timedOut = guessedPMId === 0;
    const currentPMInFullList = allPMsData.findIndex(m => m.id === primeMinisters[currentRound].id);
    const correctSuccessor = allPMsData[currentPMInFullList + 1];
    if (!correctSuccessor) return;
    const correctPMId = correctSuccessor.id;
    const isCorrect = !timedOut && guessedPMId === correctPMId;

    if (timedOut) {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setLastGuess({ type: 'pm', isCorrect: false, guessedPMId, correctPMId, timedOut });
      setGameState('feedback');
      return;
    }

    setGuessFeedback({ id: guessedPMId, isCorrect });
    
    setTimeout(() => {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
        setShowConfetti(true);
      }
      setLastGuess({ type: 'pm', isCorrect, guessedPMId, correctPMId, timedOut });
      setGameState('feedback');
      setGuessFeedback(null);
    }, 1200);
  }, [primeMinisters, currentRound, clearTimer, allPMsData, guessFeedback]);
  
  const handleFactGuess = useCallback((guessedPMId: number) => {
    if (!primeMinisters[currentRound] || guessFeedback) return;

    const timedOut = guessedPMId === 0;
    const correctPMId = primeMinisters[currentRound].id;
    const isCorrect = !timedOut && guessedPMId === correctPMId;
    
    if (timedOut) {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setLastGuess({ type: 'fact', isCorrect: false, guessedPMId, correctPMId, timedOut });
      setGameState('feedback');
      return;
    }

    setGuessFeedback({ id: guessedPMId, isCorrect });

    setTimeout(() => {
      clearTimer();
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
        setShowConfetti(true);
      }
      setLastGuess({ type: 'fact', isCorrect, guessedPMId, correctPMId, timedOut });
      setGameState('feedback');
      setGuessFeedback(null);
    }, 1200);
  }, [primeMinisters, currentRound, clearTimer, guessFeedback]);


  useEffect(() => {
    if (gameState === 'playing' && !isAdmin) {
      setTimeout(() => setTimeLeft(ROUND_DURATION_SECONDS), 0);
      timerIdRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (gameMode === 'year') handleYearGuess(0);
            else if (gameMode === 'pm') handlePMGuess(0);
            else handleFactGuess(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [gameState, currentRound, isAdmin, gameMode, handleYearGuess, handlePMGuess, handleFactGuess, clearTimer]);

  const saveScore = useCallback(async (name: string) => {
    const newEntry: HallOfFameEntry = {
      name,
      score,
      timeLeft: totalTimeLeft,
      date: new Date().toLocaleDateString()
    };
    
    try {
      await saveLeaderboardEntry(newEntry, gameMode);
      // Refresh leaderboards
      const freshData = await fetchLeaderboards();
      setLeaderboards(freshData);
    } catch (e) {
      console.error("Failed to save score to Supabase:", e);
    }

    setInitialHallOfFameMode(gameMode);
    setGameState('hallOfFame');
  }, [gameMode, score, totalTimeLeft]);

  const nextRound = useCallback(() => {
    setShowConfetti(false);
    if (currentRound + 1 < ROUNDS_PER_GAME) {
      setCurrentRound(prev => prev + 1);
      setLastGuess(null);
      setTypedYear('');
      setGameState('playing');
      window.scrollTo(0, 0);
    } else {
      setGameState('end');
    }
  }, [currentRound]);

  const handleLearnMore = useCallback(async (pm: PrimeMinister) => {
    setIsRagModalOpen(true);
    setIsRagLoading(true);
    setRagContent({ title: pm.name, text: '', imageUrl: pm.imageUrl });
    setRagSources([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      let prompt = `Tell me a brief history about ${pm.name}. Focus on their rise, key events, and legacy. Concise 3-4 paragraphs.`;
      if (language === 'fr') {
        prompt = `Raconte-moi une brève histoire sur ${pm.name}. Concentre-toi sur son ascension, les événements clés et son héritage. 3-4 paragraphes concis.`;
      } else if (language === 'ja') {
        prompt = `${pm.name}の短い歴史を教えてください。彼らの台頭、主要な出来事、そして遺産に焦点を当ててください。簡潔な3〜4段落で。`;
      } else if (language === 'es') {
        prompt = `Cuéntame una breve historia sobre ${pm.name}. Concéntrate en su ascenso, eventos clave y legado. 3-4 párrafos concisos.`;
      } else if (language === 'zh') {
        prompt = `请告诉我关于 ${pm.name} 的简短历史。重点关注他们的崛起、关键事件和遗产。简明扼要的3-4段。`;
      } else if (language === 'ar') {
        prompt = `أخبرني بتاريخ موجز عن ${pm.name}. ركز على صعودهم والأحداث الرئيسية وإرثهم. 3-4 فقرات موجزة.`;
      } else if (language === 'hi') {
        prompt = `मुझे ${pm.name} के बारे में एक संक्षिप्त इतिहास बताएं। उनके उदय, प्रमुख घटनाओं और विरासत पर ध्यान दें। 3-4 संक्षिप्त पैराग्राफ।`;
      }
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { tools: [{googleSearch: {}}] },
      });

      setRagContent({ title: pm.name, text: response.text, imageUrl: pm.imageUrl });
      const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as unknown[] || [])
        .map((chunk: any) => chunk.web).filter(web => !!(web?.uri && web.title));
      setRagSources(Array.from(new Map(sources.map((s: any) => [s.uri, s])).values()) as any);
    } catch (error) {
      console.error(error);
      setRagContent({ title: pm.name, text: t('rag.error'), imageUrl: pm.imageUrl });
    } finally {
      setIsRagLoading(false);
    }
  }, [language, t]);

  const renderGameScreen = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen 
          onStart={startGame} 
          pms={allPMsData} 
          onShowInstructions={() => setIsInstructionsOpen(true)} 
          onReview={() => setGameState('review')} 
          onShowPrivacy={() => setGameState('privacy')} 
          onShowTerms={() => setGameState('terms')} 
          onShowHallOfFame={() => { setInitialHallOfFameMode(undefined); setGameState('hallOfFame'); }} 
        />;
      case 'hallOfFame':
        return <HallOfFame leaderboards={leaderboards} onBack={() => setGameState('start')} initialMode={initialHallOfFameMode} />;
      case 'end':
        return <EndScreen score={score} timeLeft={totalTimeLeft} onRestart={() => setGameState('start')} onSaveScore={saveScore} />;
      case 'review':
        return <ReviewScreen pms={allPMsData} onStop={() => setGameState('start')} onLearnMore={handleLearnMore} onShowCareerTree={handleShowCareerTree} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setGameState('start')} />;
      case 'terms':
        return <TermsOfService onBack={() => setGameState('start')} />;
      case 'playing':
      case 'feedback': {
        const currentPM = isAdmin ? allPMsData[adminViewIndex] : primeMinisters[currentRound];
        if (!currentPM) return null;
        
        const yearGuessFeedback = guessFeedback && guessFeedback.id === 'year';
        const feedbackInputClass = yearGuessFeedback
          ? guessFeedback.isCorrect ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500'
          : 'focus:ring-2 focus:ring-blue-500';
        const feedbackButtonClass = yearGuessFeedback
          ? guessFeedback.isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          : 'bg-blue-600 hover:bg-blue-700';

        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start min-h-screen py-8">
            <Scoreboard score={score} incorrect={(gameState === 'feedback' ? currentRound + 1 : currentRound) - score} round={currentRound + 1} totalRounds={ROUNDS_PER_GAME} timeLeft={timeLeft} isAdmin={isAdmin} />
            <div className="mt-16 md:mt-24 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-8">
              {(gameMode !== 'fact' || gameState !== 'playing') && (
                <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0 animate-fade-in">
                  <PrimeMinisterCard primeMinister={currentPM} showTerm={gameState === 'feedback' || isAdmin} isAdmin={isAdmin} onShowCareerTree={handleShowCareerTree} />
                </div>
              )}

              <div className="w-full lg:max-w-md mt-8 lg:mt-0">
                {gameState === 'feedback' && lastGuess ? (
                  <Feedback lastGuess={lastGuess} onNext={nextRound} primeMinister={currentPM} onLearnMore={handleLearnMore} onShowCareerTree={handleShowCareerTree} allPMs={allPMsData} onStop={() => setGameState('start')} />
                ) : (
                   <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-fade-in-up">
                    {gameMode === 'year' ? (
                       <form onSubmit={(e) => { e.preventDefault(); handleYearGuess(parseInt(typedYear)); }} className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <input type="number" value={typedYear} onChange={(e) => setTypedYear(e.target.value)} placeholder={t('timeline.inputPlaceholder')} disabled={!!guessFeedback} className={`bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-lg w-full sm:flex-grow text-center focus:outline-none transition-all ${feedbackInputClass}`} />
                            <button type="submit" disabled={!!guessFeedback || !typedYear} className={`w-full sm:w-auto px-6 py-2 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${feedbackButtonClass}`}>{t('timeline.submit')}</button>
                        </form>
                    ) : gameMode === 'pm' ? (
                        <NextPMGuesser pms={allPMsData} onSubmit={handlePMGuess} disabled={gameState === 'feedback'} feedback={guessFeedback} />
                    ) : (
                      <FactGuesser primeMinister={currentPM} allPMs={allPMsData} onSubmit={handleFactGuess} disabled={gameState === 'feedback'} feedback={guessFeedback} />
                    )}
                   </div>
                )}
              </div>
            </div>
            {gameMode === 'year' && (
              <div className="w-full mt-8">
                 <Timeline onGuess={(year) => handleYearGuess(year)} disabled={gameState === 'feedback' || isAdmin || !!guessFeedback} lastGuess={lastGuess?.type === 'year' ? lastGuess : null} />
              </div>
            )}
          </div>
        );
      }
      default: return null;
    }
  };

  const currentPM = isAdmin ? allPMsData[adminViewIndex] : primeMinisters[currentRound];
  const currentEra = useMemo(() => POLITICAL_ERAS.find(p => currentPM?.termStart >= p.start && currentPM?.termStart <= p.end) || null, [currentPM]);

  return (
    <main className="min-h-screen w-full text-white font-sans flex items-center justify-center">
      <DynamicBackground era={gameState === 'start' || gameState === 'end' ? null : currentEra} />
      {showConfetti && <Confetti />}
      {renderGameScreen()}
      <RAGModal isOpen={isRagModalOpen} isLoading={isRagLoading} content={ragContent} sources={ragSources} onClose={() => setIsRagModalOpen(false)} />
      <InstructionsModal isOpen={isInstructionsOpen} onClose={() => setIsInstructionsOpen(false)} />
      {selectedCareerPM && (
        <CareerTreeModal 
          primeMinister={selectedCareerPM} 
          isOpen={!!selectedCareerPM} 
          onClose={() => setSelectedCareerPM(null)} 
        />
      )}
    </main>
  );
};

export default App;