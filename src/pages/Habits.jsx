const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import HabitCard from '@/components/habits/HabitCard';
import HabitsEmptyState from '@/components/onboarding/HabitsEmptyState';
import { calculateStreak, calculateLongestStreak, getCompletionRate } from '@/lib/habitUtils';

const FREQ_ORDER = { daily: 0, '5x-week': 1, '3x-week': 2, weekly: 3, custom: 4 };

export default function Habits() {
  const queryClient = useQueryClient();

  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: () => db.entities.Habit.list(),
  });

  const { data: logs = [] } = useQuery({
    queryKey: ['habitLogs'],
    queryFn: () => db.entities.HabitLog.list('-created_date', 500),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => db.entities.Habit.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
  });

  const handlePause = (id) => { updateMutation.mutate({ id, data: { status: 'paused', paused_at: new Date().toISOString() } }); toast('Habit paused'); };
  const handleResume = (id) => { updateMutation.mutate({ id, data: { status: 'active', paused_at: null } }); toast.success('Habit resumed!'); };
  const handleArchive = (id) => { updateMutation.mutate({ id, data: { status: 'archived' } }); toast('Habit archived'); };

  const activeHabits = habits.filter(h => h.status === 'active').sort((a, b) => {
    const freqDiff = (FREQ_ORDER[a.frequency] || 4) - (FREQ_ORDER[b.frequency] || 4);
    if (freqDiff !== 0) return freqDiff;
    return calculateStreak(b.id, logs) - calculateStreak(a.id, logs);
  });
  const pausedHabits = habits.filter(h => h.status === 'paused');

  const hasAny = habits.filter(h => h.status !== 'archived').length > 0;

  return (
    <div className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Habits</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{activeHabits.length} active</p>
        </div>
        <Link to="/add">
          <Button size="sm" className="gap-1.5"><PlusCircle className="w-4 h-4" /> New</Button>
        </Link>
      </div>

      {!hasAny ? (
        <HabitsEmptyState />
      ) : (
        <div className="space-y-5">
          {activeHabits.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Active</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {activeHabits.map((habit, i) => (
                  <motion.div key={habit.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <HabitCard habit={habit} streak={calculateStreak(habit.id, logs)} longestStreak={calculateLongestStreak(habit.id, logs)} completionRate={getCompletionRate(habit.id, logs, habit)} onPause={handlePause} onResume={handleResume} onArchive={handleArchive} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {pausedHabits.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Paused</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {pausedHabits.map((habit, i) => (
                  <motion.div key={habit.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <HabitCard habit={habit} streak={calculateStreak(habit.id, logs)} longestStreak={calculateLongestStreak(habit.id, logs)} completionRate={getCompletionRate(habit.id, logs, habit)} onPause={handlePause} onResume={handleResume} onArchive={handleArchive} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}