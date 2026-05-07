import React from 'react';
import { cn } from '@/lib/utils';

export default function MetricCard({ value, label, subtitle, colorClass }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className={cn('text-2xl font-bold', colorClass || 'text-foreground')}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
      {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}