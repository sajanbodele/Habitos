import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, Pause, Play, Archive } from 'lucide-react';
import { CATEGORY_MAP, FREQUENCY_MAP } from '@/lib/habitUtils';
import { cn } from '@/lib/utils';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function HabitCard({ habit, streak, longestStreak, completionRate, onPause, onResume, onArchive }) {
  const navigate = useNavigate();
  const cat = CATEGORY_MAP[habit.category] || CATEGORY_MAP.other;
  const isPaused = habit.status === 'paused';

  return (
    <div className={cn('bg-card border border-border rounded-xl p-4 transition-all duration-150 hover:border-primary/20', isPaused && 'opacity-60')}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl flex-shrink-0">{cat.emoji}</span>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{habit.name}</p>
            <p className="text-xs text-muted-foreground">{cat.label} · {FREQUENCY_MAP[habit.frequency]}</p>