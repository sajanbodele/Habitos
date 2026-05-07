const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useMemo } from 'react';
import { format, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import DayDetailPopup from '@/components/calendar/DayDetailPopup';
import { isHabitScheduledForDay, CATEGORY_MAP } from '@/lib/habitUtils';
import { useNavigate } from 'react-router-dom';

function CalendarEmptyState({ navigate }) {
  return (
    <div className="relative">
      {/* Skeleton calendar overlay */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4 opacity-40 pointer-events-none select-none">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
      {/* Centered message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl p-6 shadow-sm max-w-xs">
          <div className="text-4xl mb-3">📅</div>
          <p className="font-semibold text-foreground mb-1">Your consistency calendar will appear here</p>
          <p className="text-xs text-muted-foreground mb-4">Start tracking to unlock your streak view</p>
          <Button size="sm" className="w-full" onClick={() => navigate('/add')}>Create your first habit</Button>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState('all');
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: () => db.entities.Habit.list(),
  });
  const { data: logs = [] } = useQuery({
    queryKey: ['habitLogs'],
    queryFn: () => db.entities.HabitLog.list('-created_date', 500),
  });

  const activeHabits = habits.filter(h => h.status !== 'archived');
  const hasData = activeHabits.length > 0;

  const dayStatuses = useMemo(() => {
    const statuses = {};
    const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
    const relevantHabits = selectedHabitId === 'all' ? activeHabits : activeHabits.filter(h => h.id === selectedHabitId);
    days.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const scheduled = relevantHabits.filter(h => isHabitScheduledForDay(h, day));
      if (scheduled.length === 0) { statuses[dateStr] = 'none_scheduled'; return; }
      const completed = scheduled.filter(h => logs.some(l => l.habit_id === h.id && l.date === dateStr && l.status === 'completed'));
      if (completed.length === scheduled.length) statuses[dateStr] = 'all';
      else if (completed.length > 0) statuses[dateStr] = 'some';
      else statuses[dateStr] = 'none';
    });
    return statuses;
  }, [currentMonth, activeHabits, logs, selectedHabitId]);

  const dayHabits = useMemo(() => {
    if (!selectedDay) return [];
    const relevantHabits = selectedHabitId === 'all' ? activeHabits : activeHabits.filter(h => h.id === selectedHabitId);
    return relevantHabits.filter(h => isHabitScheduledForDay(h, selectedDay));
  }, [selectedDay, activeHabits, selectedHabitId]);

  return (
    <div className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Visual completion history</p>
      </div>

      {!hasData ? (
        <CalendarEmptyState navigate={navigate} />
      ) : (
        <>
          <div className="mb-4">
            <Select value={selectedHabitId} onValueChange={setSelectedHabitId}>
              <SelectTrigger><SelectValue placeholder="All Habits" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Habits</SelectItem>
                {activeHabits.map(h => (
                  <SelectItem key={h.id} value={h.id}>{CATEGORY_MAP[h.category]?.emoji || '✨'} {h.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-base font-semibold text-foreground">{format(currentMonth, 'MMMM yyyy')}</h2>
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <CalendarGrid currentMonth={currentMonth} dayStatuses={dayStatuses} onDayClick={setSelectedDay} />
          </div>

          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {[{ color: 'bg-success', label: 'All done' }, { color: 'bg-warning', label: 'Partial' }, { color: 'bg-destructive', label: 'Missed' }, { color: 'bg-muted', label: 'Rest day' }].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className={`w-2.5 h-2.5 rounded-full ${color}`} />{label}
              </div>
            ))}
          </div>

          <DayDetailPopup date={selectedDay} habits={dayHabits} logs={logs} open={!!selectedDay} onClose={() => setSelectedDay(null)} />
        </>
      )}
    </div>
  );
}