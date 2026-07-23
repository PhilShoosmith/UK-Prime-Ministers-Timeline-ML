
export const ROUNDS_PER_GAME = 10;
export const YEAR_TOLERANCE = 2; // Guesses within this many years are correct
export const TIMELINE_START_YEAR = 1700;
export const TIMELINE_END_YEAR = 2030;
export const ROUND_DURATION_SECONDS = 30;

export const POLITICAL_ERAS = [
  { name: 'Whig Ascendancy', start: 1721, end: 1784, color: 'bg-green-900/50', textColor: 'text-green-300', borderColor: 'border-green-700', hoverBorder: 'hover:border-green-700', timelineColor: 'bg-green-600' },
  { name: 'Pitt & The Wars', start: 1784, end: 1830, color: 'bg-sky-900/50', textColor: 'text-sky-300', borderColor: 'border-sky-700', hoverBorder: 'hover:border-sky-700', timelineColor: 'bg-sky-600' },
  { name: 'Victorian Reform', start: 1830, end: 1902, color: 'bg-purple-900/50', textColor: 'text-purple-300', borderColor: 'border-purple-700', hoverBorder: 'hover:border-purple-700', timelineColor: 'bg-purple-600' },
  { name: 'World Wars & Consensus', start: 1902, end: 1979, color: 'bg-yellow-900/50', textColor: 'text-yellow-300', borderColor: 'border-yellow-700', hoverBorder: 'hover:border-yellow-700', timelineColor: 'bg-yellow-600' },
  { name: 'Modern Politics', start: 1979, end: 2030, color: 'bg-red-900/50', textColor: 'text-red-300', borderColor: 'border-red-700', hoverBorder: 'hover:border-red-700', timelineColor: 'bg-red-600' },
];
