import React from 'react';
import { Button } from '@/components/ui/button';

export default function EmptyState({ icon, title, description, primaryActionLabel, onPrimaryAction, secondaryActionLabel, onSecondaryAction, children }) {
  return (
    <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl p-6 text-center flex flex-col items-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-xs leading-relaxed">{description}</p>
      {children}
      {primaryActionLabel && (
        <Button onClick={onPrimaryAction} className="w-full max-w-xs bg-primary hover:bg-primary/90 mb-2">
          {primaryActionLabel}
        </Button>
      )}
      {secondaryActionLabel && (
        <Button variant="outline" onClick={onSecondaryAction} className="w-full max-w-xs">
          {secondaryActionLabel}
        </Button>
      )}
    </div>
  );
}