import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CHALLENGES, getChallengeProgress } from '@/lib/challengeUtils';
import { ACHIEVEMENTS, getUnlockedAchievements } from '@/lib/achievementUtils';
import { cn } from '@/lib/utils';

function ChallengeCard({ challenge, habits, logs, index }) {
  const { current, target } = getChallengeProgress(challenge, habits, logs);
  const pct = Math.round((current / target) * 100);
  const isComplete = current >= target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'bg-card border border-border rounded-xl p-4 transition-all duration-150',
        isComplete && 'border-primary/30 bg-primary/5'
      )}
    >
      <div className="flex items-start justify-between mb-3">