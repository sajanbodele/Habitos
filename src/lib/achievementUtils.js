import { calculateStreak, calculateLongestStreak } from './habitUtils';

export const ACHIEVEMENTS = [
  { id: 'first-habit', emoji: '🌱', title: 'First Step', desc: 'Created your first habit', trigger: (h, l) => h.length >= 1 },
  { id: 'streak-3', emoji: '🔥', title: 'On Fire', desc: '3-day streak on any habit', trigger: (h, l) => h.some(hab => calculateStreak(hab.id, l) >= 3) },
  { id: 'streak-7', emoji: '⚡', title: 'Week Warrior', desc: '7-day streak on any habit', trigger: (h, l) => h.some(hab => calculateStreak(hab.id, l) >= 7) },
  { id: 'streak-14', emoji: '💎', title: 'Diamond Streak', desc: '14-day streak on any habit', trigger: (h, l) => h.some(hab => calculateStreak(hab.id, l) >= 14) },
  { id: 'streak-30', emoji: '🏆', title: '30-Day Legend', desc: '30-day streak on any habit', trigger: (h, l) => h.some(hab => calculateStreak(hab.id, l) >= 30) },
  { id: 'five-habits', emoji: '🎯', title: 'Habit Builder', desc: 'Track 5 active habits at once', trigger: (h, l) => h.filter(hab => hab.status === 'active').length >= 5 },
  { id: '50-logs', emoji: '📈', title: 'Consistent', desc: 'Log 50 habit completions', trigger: (h, l) => l.filter(log => log.status === 'completed').length >= 50 },
  { id: '100-logs', emoji: '💯', title: 'Centurion', desc: 'Log 100 habit completions', trigger: (h, l) => l.filter(log => log.status === 'completed').length >= 100 },
];

export function getUnlockedAchievements(habits, logs) {
  return ACHIEVEMENTS.filter(a => a.trigger(habits, logs));
}

export function getLockedAchievements(habits, logs) {
  return ACHIEVEMENTS.filter(a => !a.trigger(habits, logs));
}