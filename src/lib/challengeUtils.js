import { format, subDays, isWeekend, eachDayOfInterval } from 'date-fns';
import { isHabitScheduledForDay, calculateStreak } from './habitUtils';

export const CHALLENGES = [
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Complete any habit 7 days in a row',
    emoji: '🔥',
    type: 'streak',
    target: 7,
    category: null,
  },
  {
    id: 'streak-30',
    title: '30-Day Champion',
    description: 'Maintain a 30-day streak on any habit',
    emoji: '🏆',
    type: 'streak',
    target: 30,
    category: null,
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Complete all habits on 4 consecutive weekends',
    emoji: '⚡',
    type: 'weekend',
    target: 4,
    category: null,
  },
  {
    id: 'fitness-focus',
    title: 'Fitness Focus',
    description: 'Complete all fitness habits 10 times',
    emoji: '🏃',
    type: 'category',
    target: 10,
    category: 'fitness',
  },
  {
    id: 'mindful-week',
    title: 'Mindful Week',
    description: 'Complete all mindfulness habits 7 days straight',
    emoji: '🧘',
    type: 'category_streak',
    target: 7,
    category: 'mindfulness',
  },
  {
    id: 'learning-league',
    title: 'Learning League',
    description: 'Complete learning habits 14 times',
    emoji: '📚',
    type: 'category',
    target: 14,
    category: 'learning',
  },
];

export function getChallengeProgress(challenge, habits, logs) {
  const activeHabits = habits.filter(h => h.status === 'active');

  if (challenge.type === 'streak') {
    const maxStreak = Math.max(0, ...activeHabits.map(h => calculateStreak(h.id, logs)));
    return { current: Math.min(maxStreak, challenge.target), target: challenge.target };
  }

  if (challenge.type === 'category') {
    const catHabits = activeHabits.filter(h => h.category === challenge.category);
    const count = logs.filter(l =>
      l.status === 'completed' &&
      catHabits.some(h => h.id === l.habit_id)
    ).length;
    return { current: Math.min(count, challenge.target), target: challenge.target };
  }

  if (challenge.type === 'category_streak') {
    const catHabits = activeHabits.filter(h => h.category === challenge.category);
    if (catHabits.length === 0) return { current: 0, target: challenge.target };
    const maxStreak = Math.max(0, ...catHabits.map(h => calculateStreak(h.id, logs)));
    return { current: Math.min(maxStreak, challenge.target), target: challenge.target };
  }

  if (challenge.type === 'weekend') {
    let weekendStreak = 0;
    for (let w = 0; w < challenge.target; w++) {
      const satOffset = 1 + w * 7;
      const sat = subDays(new Date(), new Date().getDay() === 0 ? satOffset : new Date().getDay() - 6 + w * 7);
      const sun = subDays(sat, -1);
      const satStr = format(sat, 'yyyy-MM-dd');
      const sunStr = format(sun, 'yyyy-MM-dd');
      const satComplete = activeHabits.every(h => !isHabitScheduledForDay(h, sat) || logs.some(l => l.habit_id === h.id && l.date === satStr && l.status === 'completed'));
      const sunComplete = activeHabits.every(h => !isHabitScheduledForDay(h, sun) || logs.some(l => l.habit_id === h.id && l.date === sunStr && l.status === 'completed'));
      if (satComplete && sunComplete) weekendStreak++;
      else break;
    }
    return { current: weekendStreak, target: challenge.target };
  }

  return { current: 0, target: challenge.target };
}