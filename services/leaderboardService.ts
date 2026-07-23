/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from './firebaseClient';
import { collection, getDocs, setDoc, doc, query, orderBy } from 'firebase/firestore';
import { Leaderboards, GameMode, HallOfFameEntry } from '../types';

export const fetchLeaderboards = async (): Promise<Leaderboards> => {
  try {
    const leaderboards: Leaderboards = { year: [], pm: [], fact: [] };
    const q = query(
      collection(db, 'hall_of_fame'),
      orderBy('score', 'desc'),
      orderBy('time_left', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((docSnap) => {
      const entry = docSnap.data();
      const mode = entry.game_mode as GameMode;
      if (leaderboards[mode] && leaderboards[mode].length < 10) {
        leaderboards[mode].push({
          name: entry.name,
          score: entry.score,
          timeLeft: entry.time_left,
          date: entry.date
        });
      }
    });

    return leaderboards;
  } catch (error) {
    console.error('Error fetching leaderboards:', error);
    return { year: [], pm: [], fact: [] };
  }
};

export const saveLeaderboardEntry = async (entry: HallOfFameEntry, mode: GameMode) => {
  try {
    const entryId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await setDoc(doc(db, 'hall_of_fame', entryId), {
      name: entry.name,
      score: entry.score,
      time_left: entry.timeLeft,
      game_mode: mode,
      date: entry.date
    });
  } catch (error) {
    console.error('Error saving leaderboard entry:', error);
    throw error;
  }
};