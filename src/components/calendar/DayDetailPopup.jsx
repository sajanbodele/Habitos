import React from 'react';
import { format } from 'date-fns';
import { X, Check, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CATEGORY_MAP } from '@/lib/habitUtils';

export default function DayDetailPopup({ date, habits, logs, open, onClose }) {
  if (!date) return null;

  const dateStr = format(date, 'yyyy-MM-dd');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{format(date, 'EEEE, MMMM d, yyyy')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-2">
          {habits.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No habits scheduled for this day.</p>
          ) : (
            habits.map(habit => {
              const cat = CATEGORY_MAP[habit.category] || CATEGORY_MAP.other;
              const log = logs.find(l => l.habit_id === habit.id && l.date === dateStr);
              const completed = log?.status === 'completed';
              return (
                <div key={habit.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="text-sm font-medium">{habit.name}</span>
                  </div>
                  {completed ? (
                    <div className="flex items-center gap-1 text-success text-xs font-medium">
                      <Check className="w-3.5 h-3.5" /> Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-destructive text-xs font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Missed
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}