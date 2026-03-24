'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/app-context';
import { Home, Search, MessageCircle, User, FileText } from 'lucide-react';
import type { AppScreen } from '@/lib/types';

interface NavItem {
  screen: AppScreen;
  icon: typeof Home;
  labelKey: 'home' | 'search' | 'requests' | 'chats' | 'profile';
  activeScreens?: AppScreen[];
}

export function BottomNav() {
  const { t, currentScreen, navigate, chats, userRole } = useApp();

  const navItems: NavItem[] =
    userRole === 'master'
      ? [
          {
            screen: 'master-dashboard',
            icon: Home,
            labelKey: 'home',
            activeScreens: ['master-dashboard'],
          },
          {
            screen: 'requests',
            icon: FileText,
            labelKey: 'requests',
            activeScreens: ['requests', 'create-request', 'request-detail'],
          },
          {
            screen: 'chats',
            icon: MessageCircle,
            labelKey: 'chats',
            activeScreens: ['chats', 'chat'],
          },
          {
            screen: 'profile',
            icon: User,
            labelKey: 'profile',
            activeScreens: ['profile', 'info-detail', 'notifications'],
          },
        ]
      : [
          {
            screen: 'home',
            icon: Home,
            labelKey: 'home',
            activeScreens: ['home', 'master-profile', 'booking', 'bookings', 'favorites'],
          },
          {
            screen: 'search',
            icon: Search,
            labelKey: 'search',
            activeScreens: ['search', 'map'],
          },
          {
            screen: 'requests',
            icon: FileText,
            labelKey: 'requests',
            activeScreens: ['requests', 'create-request', 'request-detail'],
          },
          {
            screen: 'chats',
            icon: MessageCircle,
            labelKey: 'chats',
            activeScreens: ['chats', 'chat'],
          },
          {
            screen: 'profile',
            icon: User,
            labelKey: 'profile',
            activeScreens: ['profile', 'info-detail', 'notifications'],
          },
        ];

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-4 safe-bottom">
      <div className="mx-auto max-w-md">
        <div className="pointer-events-auto relative overflow-hidden rounded-[26px] border border-border/70 bg-card/95 px-2 py-2 shadow-premium backdrop-blur-xl">
          {/* Top gradient line */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div
            className={`grid items-center gap-0.5 ${
              userRole === 'master' ? 'grid-cols-4' : 'grid-cols-5'
            }`}
          >
            {navItems.map(({ screen, icon: Icon, labelKey, activeScreens }) => {
              const isActive = activeScreens ? activeScreens.includes(currentScreen) : currentScreen === screen;
              const showBadge = labelKey === 'chats' && totalUnread > 0;

              return (
                <button
                  key={screen}
                  onClick={() => navigate(screen)}
                  className="relative flex h-[60px] items-center justify-center rounded-xl transition-colors active:bg-accent/45"
                >
                  <div className="relative flex w-full items-center justify-center">
                    {isActive && (
                      <motion.div
                        layoutId="bottom-nav-active-shell"
                        className="absolute left-1/2 top-1/2 h-12 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/20 to-primary/8 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }}
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                      <motion.div
                        animate={{
                          y: isActive ? -1 : 0,
                          scale: isActive ? 1.05 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 24,
                        }}
                        className={`relative ${
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <div className="relative flex items-center justify-center">
                          <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.9} />
                          {showBadge && (
                            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground shadow-sm">
                              {totalUnread > 9 ? '9+' : totalUnread}
                            </span>
                          )}
                        </div>
                      </motion.div>

                      <motion.span
                        animate={{
                          y: isActive ? -1 : 0,
                          opacity: isActive ? 1 : 0.7,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 24,
                        }}
                        className={`text-[11px] font-semibold tracking-tight ${
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {t(labelKey)}
                      </motion.span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
