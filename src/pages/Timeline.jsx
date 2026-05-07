const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateStreak, CATEGORY_MAP } from '@/lib/habitUtils';
import { cn } from '@/lib/utils';
import { Flame, Plus, Star, Zap, TrendingDown, TrendingUp } from 'lucide-react';

function buildTimeline(habits, logs) {
  const events = [];

  habits.forEach(habit => {
    events.push({
      id: `create-${habit.id}`,
      date: habit.created_date || habit.created_at,
      type: 'created',
      title: `Started "${habit.name}"`,
      emoji: CATEGORY_MAP[habit.category]?.emoji || '✨',
      detail: `${CATEGORY_MAP[habit.category]?.label || 'Other'} · ${habit.frequency}`,
      habitId: habit.id,
    });
  });

  const habitMap = Object.fromEntries(habits.map(h => [h.id, h]));
  const grouped = {};
  logs.filter(l => l.status === 'completed').forEach(l => {
    const key = `${l.habit_id}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(l.date);
  });

  Object.entries(grouped).forEach(([habitId, dates]) => {
    const habit = habitMap[habitId];
    if (!habit) return;
    const sorted = [...dates].sort();
    [7, 14, 30].forEach(milestone => {
      if (sorted.length >= milestone) {
        events.push({
          id: `milestone-${habitId}-${milestone}`,
          date: sorted[milestone - 1],
          type: 'milestone',
          title: `${milestone}-day milestone`,
          emoji: milestone === 7 ? '⚡' : milestone === 14 ? '💎' : '🏆',
          detail: habit.name,
          habitId,
        });
      }
    });
  });

  return events
    .filter(e => e.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 40);
}

const TYPE_STYLES = {
  created: 'bg-primary/10 text-primary border-primary/20',
  milestone: 'bg-warning/10 text-warning border-warning/20',
  streak: 'bg-success/10 text-success border-success/20',
  recovery: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Timeline() {
  const [expanded, setExpanded] = useState(null);

  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: () => db.entities.Habit.list(),
  });
  const { data: logs = [] } = useQuery({
    queryKey: ['habitLogs'],
    queryFn: () => db.entities.HabitLog.list('-created_date', 500),
  });

  const events = useMemo(() => buildTimeline(habits, logs), [habits, logs]);

  if (events.length === 0) {
    return (
      <div className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Journey</h1>
        <p className="text-sm text-muted-foreground mb-8">Your habit history unfolds here</p>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <span className="text-4xl">🌱</span>
          <p className="font-medium text-foreground mt-3">Your journey starts now</p>
          <p className="text-sm text-muted-foreground mt-1">Create habits and log completions to build your timeline.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Journey</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your habit story from Day 1</p>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative flex gap-4"
            >
              {/* Dot */}
              <div className={cn(
                'relative z-10 w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0',
                TYPE_STYLES[event.type] || TYPE_STYLES.created
              )}>
                <span className="text-base">{event.emoji}</span>
              </div>

              {/* Content */}
              <button
                onClick={() => setExpanded(expanded === event.id ? null : event.id)}
                className="flex-1 text-left bg-card border border-border rounded-xl p-3 hover:border-primary/20 transition-colors duration-150"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.detail}</p>
                  </div>
                  <time className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </time>
                </div>
                <AnimatePresence>
                  {expanded === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 pt-2 border-t border-border"
                    >
                      <p className="text-xs text-muted-foreground">
                        {event.type === 'created' && 'You committed to this habit. Every journey starts here.'}
                        {event.type === 'milestone' && 'You reached a major streak milestone. Incredible consistency!'}
                        {event.type === 'streak' && 'Streak achieved through daily discipline and focus.'}
                        {event.type === 'recovery' && 'You bounced back after a setback. That shows real grit.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}