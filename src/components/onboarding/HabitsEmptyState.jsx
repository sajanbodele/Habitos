import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'fitness', emoji: '🏃', label: 'Fitness' },
  { id: 'mindfulness', emoji: '🧠', label: 'Focus' },
  { id: 'health', emoji: '💧', label: 'Health' },
  { id: 'learning', emoji: '📚', label: 'Learning' },
];

const TEMPLATES = [
  { name: 'Drink 2L Water', category: 'health', frequency: 'daily', difficulty: 'easy' },
  { name: 'Morning Walk', category: 'fitness', frequency: 'daily', difficulty: 'easy' },
  { name: '5 min Meditation', category: 'mindfulness', frequency: 'daily', difficulty: 'easy' },
  { name: 'Read 10 min', category: 'learning', frequency: 'daily', difficulty: 'easy' },
];

export default function HabitsEmptyState() {
  const [selected, setSelected] = useState([]);