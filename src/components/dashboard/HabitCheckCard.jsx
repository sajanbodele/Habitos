import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CATEGORY_MAP } from '@/lib/habitUtils';
import { cn } from '@/lib/utils';

export default function HabitCheckCard({ habit, streak, isCompleted, onLog }) {
  const [justLogged, setJustLogged] = useState(false);
  const cat = CATEGORY_MAP[habit.category] || CATEGORY_MAP.other;

  const handleLog = () => {
    if (isCompleted) return;
    setJustLogged(true);
    onLog(habit.id);
    setTimeout(() => setJustLogged(false), 800);
  };

  return (
    <div className={cn(
      'bg-card border rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-150',
      isCompleted ? 'border-success/30 bg-success/5' : 'border-border hover:border-primary/20',
      justLogged && 'scale-[0.99]'
    )}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl flex-shrink-0">{cat.emoji}</span>
        <div className="min-w-0">
          <p className={cn('font-semibold text-sm truncate', isCompleted ? 'text-muted-foreground line-through' : 'text-foreground')}>
            {habit.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{cat.label}</span>
            {streak > 0 && <span className="text-xs font-semibold text-primary">🔥 {streak}</span>}
          </div>
        </div>
      </div>
      <button
        onClick={handleLog}
        disabled={isCompleted}
        className={cn(
          'flex-shrink-0 w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-150',
          isCompleted
            ? 'border-success bg-success text-success-foreground'
            : 'border-border text-muted-foreground hover:border-primary hover:text-primary active:scale-95'
        )}
      >
        <Check className="w-4 h-4" strokeWidth={isCompleted ? 2.5 : 2} />
      </button>
    </div>
  );
}