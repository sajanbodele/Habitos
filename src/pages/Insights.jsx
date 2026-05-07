import React, { useMemo } from 'react';
import LockedInsights from '@/components/insights/LockedInsights';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks } from 'date-fns';

import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { calculateStreak, getCompletionRate, isHabitScheduledForDay, CATEGORY_MAP } from '@/lib/habitUtils';
import { getUnlockedAchievements } from '@/lib/achievementUtils';
import { Link } from 'react-router-dom';

function MetricChip({ value, label, color = 'text-foreground' }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-sm">
      <p className="text-muted-foreground mb-0.5">{label}</p>