const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const STARTER_HABITS = [
  { name: 'Drink 2L Water', category: 'health', frequency: 'daily', difficulty: 'easy', status: 'active' },
  { name: '5 min Meditation', category: 'mindfulness', frequency: 'daily', difficulty: 'easy', status: 'active' },
  { name: '10 min Walk', category: 'fitness', frequency: 'daily', difficulty: 'easy', status: 'active' },
];

export default function StarterPackCard() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleAddAll = async () => {
    setLoading(true);
    await Promise.all(STARTER_HABITS.map(h => db.entities.Habit.create(h)));
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    toast.success('Starter pack added! Let\'s go 🚀');
    setLoading(false);