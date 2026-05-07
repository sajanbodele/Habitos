import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday, parseISO, differenceInDays, startOfMonth, endOfMonth, getDay } from 'date-fns';

export const CATEGORY_MAP = {
  health: { emoji: '❤️', label: 'Health' },
  fitness: { emoji: '🏃', label: 'Fitness' },
  learning: { emoji: '📚', label: 'Learning' },
  work: { emoji: '💼', label: 'Work' },
  mindfulness: { emoji: '🧘', label: 'Mindfulness' },
  creative: { emoji: '🎨', label: 'Creative' },
  other: { emoji: '✨', label: 'Other' },
};

export const FREQUENCY_MAP = {
  daily: 'Daily',
  '5x-week': '5x/week (Mon-Fri)',
  '3x-week': '3x/week',
  weekly: 'Weekly',
  custom: 'Custom days',
};

export const DIFFICULTY_MAP = {
  easy: { emoji: '🟢', label: 'Easy', time: '< 5 minutes' },
  medium: { emoji: '🟡', label: 'Medium', time: '5-30 minutes' },
  hard: { emoji: '🔴', label: 'Hard', time: '> 30 minutes' },