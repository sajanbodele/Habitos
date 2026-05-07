import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

function SkeletonChart({ height = 120 }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted/30" style={{ height }}>
      <div className="absolute inset-0 flex items-end gap-1.5 px-3 pb-3">
        {[60, 45, 75, 55, 80, 40, 70, 50].map((h, i) => (
          <div key={i} className="flex-1 bg-muted/60 rounded-t-sm animate-pulse" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function LockedCard({ title, description }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 opacity-70">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3" /> Locked
        </div>
      </div>
      <SkeletonChart />
      {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}

export default function LockedInsights() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-6 lg:px-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Insights</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your behavioral analytics</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5 text-center">
        <p className="font-semibold text-foreground text-sm">📊 Your habits need 3–5 days of data to generate insights</p>
        <p className="text-xs text-muted-foreground mt-1">Start tracking to unlock your personal dashboard</p>
      </div>

      <div className="space-y-3">
        <LockedCard title="Consistency Score 🔒" description="Complete habits daily to unlock your consistency trend" />
        <LockedCard title="Streak Growth 🔒" description="Build streaks to visualize your momentum over time" />
        <LockedCard title="Category Performance 🔒" description="Log across categories to compare your focus areas" />
      </div>

      <div className="mt-5">
        <Button className="w-full" onClick={() => navigate('/')}>
          Start Your First Habit →
        </Button>
      </div>
    </div>
  );
}