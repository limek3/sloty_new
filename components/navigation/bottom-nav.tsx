'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Home, Search, MessageCircle, User, FileText, CalendarCheck } from 'lucide-react';
import type { AppScreen } from '@/lib/types';

interface NavItem {
  id: 'home' | 'search' | 'bookings' | 'requests' | 'chats' | 'profile' | 'dashboard';
  screen: AppScreen;
  icon: typeof Home;
  label: string;
  a11yLabel: string;
  segment: 'home' | 'search' | 'bookings' | 'requests' | 'chats' | 'profile' | 'dashboard';
}

type BadgeStyle = 'destructive' | 'primary' | 'muted';

interface BadgeConfig {
  count: number;
  style?: BadgeStyle;
  max?: number;
}

export function BottomNav() {
  const pathname = usePathname();
  const { t, language, currentScreen, navigate, chats, userRole, bookings, requests } = useApp();
  const isRu = language === 'ru';

  const screenToSegment: Record<AppScreen, NavItem['segment']> = {
    splash: 'home',
    'role-selection': 'home',
    home: 'home',
    search: 'search',
    map: 'search',
    'master-profile': 'home',
    booking: 'bookings',
    bookings: 'bookings',
    requests: 'requests',
    'create-request': 'requests',
    'request-detail': 'requests',
    chats: 'chats',
    chat: 'chats',
    profile: 'profile',
    settings: 'profile',
    'info-detail': 'profile',
    notifications: 'profile',
    'master-dashboard': 'dashboard',
  };

  const segmentFromPath = pathname.split('/').filter(Boolean)[0] as NavItem['segment'] | undefined;
  const currentSegment = segmentFromPath ?? screenToSegment[currentScreen];

  const navItems: NavItem[] =
    userRole === 'master'
      ? [
          {
            id: 'dashboard',
            screen: 'master-dashboard',
            icon: Home,
            label: isRu ? 'Сводка' : 'Dashboard',
            a11yLabel: isRu ? 'Панель мастера' : 'Master dashboard',
            segment: 'dashboard',
          },
          {
            id: 'bookings',
            screen: 'bookings',
            icon: CalendarCheck,
            label: isRu ? 'Записи' : 'Bookings',
            a11yLabel: isRu ? 'Записи клиентов' : 'Client bookings',
            segment: 'bookings',
          },
          {
            id: 'requests',
            screen: 'requests',
            icon: FileText,
            label: isRu ? 'Заявки' : 'Requests',
            a11yLabel: isRu ? 'Заявки клиентов' : 'Client requests',
            segment: 'requests',
          },
          {
            id: 'chats',
            screen: 'chats',
            icon: MessageCircle,
            label: isRu ? 'Чаты' : 'Chats',
            a11yLabel: isRu ? 'Диалоги и сообщения' : 'Conversations and messages',
            segment: 'chats',
          },
          {
            id: 'profile',
            screen: 'profile',
            icon: User,
            label: isRu ? 'Профиль' : 'Profile',
            a11yLabel: isRu ? 'Ваш профиль мастера' : 'Your master profile',
            segment: 'profile',
          },
        ]
      : [
          {
            id: 'home',
            screen: 'home',
            icon: Home,
            label: t('home'),
            a11yLabel: isRu ? 'Главная' : 'Home',
            segment: 'home',
          },
          {
            id: 'search',
            screen: 'search',
            icon: Search,
            label: t('search'),
            a11yLabel: isRu ? 'Поиск мастеров' : 'Search masters',
            segment: 'search',
          },
          {
            id: 'requests',
            screen: 'requests',
            icon: FileText,
            label: t('requests'),
            a11yLabel: isRu ? 'Ваши заявки' : 'Your requests',
            segment: 'requests',
          },
          {
            id: 'chats',
            screen: 'chats',
            icon: MessageCircle,
            label: t('chats'),
            a11yLabel: isRu ? 'Ваши чаты' : 'Your chats',
            segment: 'chats',
          },
          {
            id: 'profile',
            screen: 'profile',
            icon: User,
            label: t('profile'),
            a11yLabel: isRu ? 'Ваш профиль' : 'Your profile',
            segment: 'profile',
          },
        ];

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  const openRequestsCount = requests.filter((request) => request.status === 'open').length;
  const upcomingBookingsCount = bookings.filter((booking) => booking.status === 'upcoming').length;

  const badgeStyles: Record<BadgeStyle, string> = {
    destructive: 'bg-destructive text-destructive-foreground',
    primary: 'bg-primary text-primary-foreground',
    muted: 'bg-secondary text-secondary-foreground',
  };

  const badgeByItem: Partial<Record<NavItem['id'], BadgeConfig>> = {
    chats: { count: totalUnread, style: 'destructive', max: 99 },
    requests: { count: openRequestsCount, style: 'primary', max: 99 },
    bookings: { count: upcomingBookingsCount, style: 'muted', max: 99 },
  };

  const renderBadge = (itemId: NavItem['id']) => {
    const badge = badgeByItem[itemId];
    if (!badge || badge.count <= 0) return null;

    const max = badge.max ?? 99;
    const value = badge.count > max ? `${max}+` : badge.count.toString();
    const tone = badgeStyles[badge.style ?? 'destructive'];

    return (
      <span
        className={`absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold shadow-sm ring-2 ring-card ${tone}`}
        aria-hidden="true"
      >
        {value}
      </span>
    );
  };

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-4 safe-bottom safe-bottom-keyboard">
      <div className="mx-auto max-w-md">
        <div className="pointer-events-auto relative overflow-hidden rounded-[26px] border border-border/70 bg-card/95 px-2 py-2 shadow-premium backdrop-blur-xl">
          {/* Top gradient line */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div
            className={`grid items-center gap-0.5 ${
              userRole === 'master' ? 'grid-cols-5' : 'grid-cols-5'
            }`}
          >
            {navItems.map(({ id, screen, icon: Icon, label, a11yLabel, segment }) => {
              const isActive = currentSegment === segment;
              const badge = badgeByItem[id];
              const badgeLabel = badge && badge.count > 0 ? `, ${badge.count} new` : '';

              return (
                <button
                  key={screen}
                  onClick={() => navigate(screen)}
                  className="relative flex h-[60px] items-center justify-center rounded-xl transition-colors active:bg-accent/45"
                  aria-label={`${a11yLabel}${badgeLabel}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-pressed={isActive}
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
                          {renderBadge(id)}
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
                        {label}
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
