const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const GOALS = [
  { id: 'focus', emoji: '🧠', label: 'Focus', habits: [{ name: 'Deep Work Session', category: 'work', frequency: 'daily', difficulty: 'medium' }, { name: 'No Phone First Hour', category: 'mindfulness', frequency: 'daily', difficulty: 'easy' }, { name: 'Journal 5 min', category: 'mindfulness', frequency: 'daily', difficulty: 'easy' }] },
  { id: 'fitness', emoji: '💪', label: 'Fitness', habits: [{ name: '10 min Walk', category: 'fitness', frequency: 'daily', difficulty: 'easy' }, { name: 'Drink 2L Water', category: 'health', frequency: 'daily', difficulty: 'easy' }, { name: 'Stretch 5 min', category: 'fitness', frequency: 'daily', difficulty: 'easy' }] },
  { id: 'mindfulness', emoji: '🧘', label: 'Mindfulness', habits: [{ name: 'Morning Meditation', category: 'mindfulness', frequency: 'daily', difficulty: 'easy' }, { name: 'Gratitude Journal', category: 'mindfulness', frequency: 'daily', difficulty: 'easy' }, { name: 'Digital Detox 1hr', category: 'mindfulness', frequency: 'daily', difficulty: 'medium' }] },
  { id: 'learning', emoji: '📚', label: 'Learning', habits: [{ name: 'Read 10 Pages', category: 'learning', frequency: 'daily', difficulty: 'easy' }, { name: 'Practice New Skill', category: 'learning', frequency: '5x-week', difficulty: 'medium' }, { name: 'Review Notes', category: 'learning', frequency: '3x-week', difficulty: 'easy' }] },
  { id: 'discipline', emoji: '⚡', label: 'Discipline', habits: [{ name: 'Wake Up On Time', category: 'other', frequency: 'daily', difficulty: 'medium' }, { name: 'Cold Shower', category: 'health', frequency: '5x-week', difficulty: 'hard' }, { name: 'Plan Tomorrow', category: 'work', frequency: 'daily', difficulty: 'easy' }] },
];

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const goal = GOALS.find(g => g.id === selectedGoal);

  const handleGenerate = async () => {
    if (!goal) return;
    setIsCreating(true);
    await Promise.all(goal.habits.map(h => db.entities.Habit.create({ ...h, status: 'active' })));
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    setIsCreating(false);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step indicator */}
        <div className="flex gap-1.5 mb-6 justify-center">
          {[1, 2, 3].map(s => (
            <div key={s} className={cn('h-1.5 rounded-full transition-all duration-300', s <= step ? 'bg-primary w-8' : 'bg-muted w-4')} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-xl font-bold text-foreground mb-1">What's your main goal?</h2>
              <p className="text-sm text-muted-foreground mb-5">We'll generate habits tailored for you.</p>
              <div className="grid grid-cols-2 gap-2 mb-6 sm:grid-cols-3">
                {GOALS.map(g => (
                  <button key={g.id} onClick={() => setSelectedGoal(g.id)}
                    className={cn('flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all duration-150', selectedGoal === g.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30')}>
                    <span className="text-3xl">{g.emoji}</span>
                    <span className={cn('text-sm font-semibold', selectedGoal === g.id ? 'text-primary' : 'text-foreground')}>{g.label}</span>
                  </button>
                ))}
              </div>
              <Button className="w-full" disabled={!selectedGoal} onClick={() => setStep(2)}>
                Continue →
              </Button>
            </motion.div>
          )}

          {step === 2 && goal && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-xl font-bold text-foreground mb-1">Your {goal.label} habits</h2>
              <p className="text-sm text-muted-foreground mb-5">These will be added to your tracker.</p>
              <div className="space-y-2 mb-6">
                {goal.habits.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                    <span className="text-xl">{h.category === 'health' ? '❤️' : h.category === 'fitness' ? '🏃' : h.category === 'mindfulness' ? '🧘' : h.category === 'learning' ? '📚' : h.category === 'work' ? '💼' : '✨'}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{h.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{h.frequency} · {h.difficulty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>← Back</Button>
                <Button className="flex-1" disabled={isCreating} onClick={handleGenerate}>
                  {isCreating ? 'Generating...' : 'Generate My Habits 🚀'}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-xl font-bold text-foreground mb-2">Your journey is ready!</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Your habits have been created. Log your first completion today to start your streak!
              </p>
              <Button className="w-full text-base py-3" onClick={onComplete}>
                Start Tracking →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}