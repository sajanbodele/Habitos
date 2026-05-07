import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PlusCircle, CalendarDays, BarChart3, Trophy, Settings, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/themeContext';
import { Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: BookOpen },
  { path: '/add', label: 'Add', icon: PlusCircle },
  { path: '/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/insights', label: 'Insights', icon: BarChart3 },
];

const SIDEBAR_EXTRA = [
  { path: '/challenges', label: 'Challenges', icon: Trophy },
  { path: '/timeline', label: 'Journey', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

function NavItem({ item, isActive, mobile }) {
  return (
    <Link
      to={item.path}
      className={cn(
        'flex items-center transition-all duration-150',
        mobile
          ? 'flex-col gap-0.5 px-2 py-2 rounded-xl text-[10px] font-medium min-w-0'
          : 'flex-row gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full',
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
      )}
    >
      <item.icon className={cn(
        'flex-shrink-0',
        mobile ? 'w-5 h-5' : 'w-4 h-4',
        isActive && 'text-primary'
      )} />
      <span>{item.label}</span>
    </Link>
  );
}

export default function AppLayout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-border bg-card fixed h-full z-30">
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="text-primary">Habitos</span>
              </h1>
              <p className="text-[11px] text-muted-foreground">Build better habits</p>
            </div>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          {[...NAV_ITEMS, ...SIDEBAR_EXTRA].map(item => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} mobile={false} />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-56 pb-20 lg:pb-8 min-h-screen">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map(item => (
          <NavItem key={item.path} item={item} isActive={location.pathname === item.path} mobile={true} />
        ))}
      </nav>
    </div>
  );
}