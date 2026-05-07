import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import CoachPanel from '@/components/dashboard/CoachPanel';
import HabitCheckCard from '@/components/dashboard/HabitCheckCard';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import StarterPackCard from '@/components/onboarding/StarterPackCard';
import {
  isHabitScheduledForDay,
  calculateStreak,
  getTodayCompletionPercent,
  getGreeting,
} from '@/lib/habitUtils';

const ONBOARDING_KEY = 'habitos_onboarding_done';

export default function Dashboard() {