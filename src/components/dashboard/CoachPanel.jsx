import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CoachPanel({ coach }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
      <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{coach.emoji}</span>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-foreground">{coach.message}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{coach.suggestion}</p>
        {coach.action === 'add' && (
          <Link to="/add" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:underline">
            Add a habit <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}