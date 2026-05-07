import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CATEGORY_MAP } from '@/lib/habitUtils';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const FREQUENCIES = [
  { value: 'daily', label: 'Daily', sub: 'Every day' },
  { value: '5x-week', label: '5x / week', sub: 'Mon – Fri' },
  { value: '3x-week', label: '3x / week', sub: 'Mon, Wed, Fri' },
  { value: 'weekly', label: 'Weekly', sub: 'Once a week' },
  { value: 'custom', label: 'Custom', sub: 'Pick your days' },
];

const DIFFICULTIES = [