'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { BottomNav } from '@/components/navigation/bottom-nav';
import {
  User,
  Heart,
  Calendar,
  MessageCircle,
  Bell,
  Globe,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  Briefcase,
  BadgeCheck,
  Sparkles,
  Star,
  Settings2,
  Sun,
  Moon,
} from 'lucide-react';

export function ProfileScreen() {
  const {
    t,
    language,
    setLanguage,
    userRole,
    userName,
    navigate,
    favorites,
    bookings,
    selectInfoPage,
    setUserRole,
    theme,
    setTheme,
  } = useApp();

  const isRu = language === 'ru';
  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;

  const profileName = userName || (isRu ? 'Пользователь' : 'User');

  const menuSections = useMemo(
    () => [
      {
        title: isRu ? 'Мои данные' : 'My Data',
        items: [
          {
            icon: Heart,
            label: t('favorites'),
            value: `${favorites.length}`,
            onClick: () => navigate('favorites'),
            tone: 'rose',
          },
          {
            icon: Calendar,
            label: t('bookings'),
            value: `${upcomingCount} ${t('upcoming').toLowerCase()}`,
            onClick: () => navigate('bookings'),
            tone: 'emerald',
          },
          {
            icon: MessageCircle,
            label: t('chats'),
            onClick: () => navigate('chats'),
            tone: 'indigo',
          },
          {
            icon: FileText,
            label: t('requests'),
            onClick: () => navigate('requests'),
            tone: 'amber',
          },
        ],
      },
      {
        title: t('settings'),
        items: [
          {
            icon: Bell,
            label: t('notificationSettings'),
            onClick: () => {
              selectInfoPage('notification-settings');
              navigate('info-detail');
            },
            tone: 'blue',
          },
          {
            icon: Shield,
            label: t('privacySettings'),
            onClick: () => {
              selectInfoPage('privacy-settings');
              navigate('info-detail');
            },
            tone: 'slate',
          },
        ],
      },
      {
        title: isRu ? 'Помощь' : 'Help',
        items: [
          {
            icon: HelpCircle,
            label: t('helpSupport'),
            onClick: () => {
              selectInfoPage('help-support');
              navigate('info-detail');
            },
            tone: 'violet',
          },
          {
            icon: FileText,
            label: t('termsConditions'),
            onClick: () => {
              selectInfoPage('terms-conditions');
              navigate('info-detail');
            },
            tone: 'amber',
          },
          {
            icon: Shield,
            label: t('privacyPolicy'),
            onClick: () => {
              selectInfoPage('privacy-policy');
              navigate('info-detail');
            },
            tone: 'slate',
          },
        ],
      },
    ],
    [favorites.length, upcomingCount, isRu, navigate, selectInfoPage, t]
  );

  const getToneClasses = (tone?: string) => {
    switch (tone) {
      case 'rose':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'violet':
        return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'slate':
        return 'bg-surface-2 text-muted-foreground border-border';
      default:
        return 'bg-surface-2 text-muted-foreground border-border/70';
    }
  };

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border/70 bg-card p-2.5 shadow-elevation-nav">
            <div className="flex items-start gap-2.5 px-0.5 pb-1.5 pt-0.5">
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-emerald-100 bg-emerald-50 shadow-premium-sm">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm">
                  <BadgeCheck className="h-2.5 w-2.5 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-[16px] font-bold tracking-tight text-foreground">
                    {profileName}
                  </h1>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[15px] font-medium text-emerald-700">
                    <Sparkles className="h-2 w-2" />
                    {userRole === 'client'
                      ? isRu
                        ? 'Клиент'
                        : 'Client'
                      : isRu
                        ? 'Мастер'
                        : 'Master'}
                  </span>
                </div>

                <p className="mt-0.5 text-[14px] leading-[1.4] text-muted-foreground">
                  {isRu
                    ? 'Управляйте профилем, записями, заявками'
                    : 'Manage profile, bookings, requests'}
                </p>
              </div>

              <button
                onClick={() => navigate('notifications')}
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-surface-2 text-muted-foreground transition hover:bg-card hover:text-emerald-600"
                aria-label={isRu ? 'Уведомления' : 'Notifications'}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[7px] font-bold text-white">
                  2
                </span>
              </button>
            </div>

            <div className="mt-1 grid grid-cols-3 gap-2">
              <div className="rounded-[12px] border border-border/70 bg-surface-1 p-2 text-center">
                <p className="text-[16px] font-bold tracking-tight text-foreground">
                  {favorites.length}
                </p>
                <p className="mt-0.5 text-[15px] text-muted-foreground">
                  {isRu ? 'Избранное' : 'Favorites'}
                </p>
              </div>

              <div className="rounded-[12px] border border-border/70 bg-surface-1 p-2 text-center">
                <p className="text-[16px] font-bold tracking-tight text-foreground">
                  {upcomingCount}
                </p>
                <p className="mt-0.5 text-[15px] text-muted-foreground">
                  {isRu ? 'Записи' : 'Bookings'}
                </p>
              </div>

              <div className="rounded-[12px] border border-border/70 bg-surface-1 p-2 text-center">
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <p className="text-[16px] font-bold tracking-tight text-foreground">4.9</p>
                </div>
                <p className="mt-0.5 text-[15px] text-muted-foreground">
                  {isRu ? 'Рейтинг' : 'Rating'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 px-3 py-3">
        <section className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-elevation-card">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
              <Settings2 className="h-3 w-3" />
            </div>
            <h2 className="text-[14px] font-semibold text-foreground">
              {t('settings')}
            </h2>
          </div>

          <div className="space-y-2">
            <div className="rounded-[14px] border border-border/70 bg-surface-1 p-2.5">
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-card text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-foreground">
                      {t('language')}
                    </p>
                    <p className="text-[15px] text-muted-foreground">
                      {language === 'ru' ? 'Русский' : 'English'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center rounded-[10px] border border-border/70 bg-card p-0.5">
                  <button
                    onClick={() => setLanguage('ru')}
                    className={`rounded-[8px] px-2 py-1 text-[14px] font-semibold transition ${
                      language === 'ru'
                        ? 'bg-emerald-500 text-white shadow-primary-glow'
                        : 'text-muted-foreground'
                    }`}
                  >
                    RU
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`rounded-[8px] px-2 py-1 text-[14px] font-semibold transition ${
                      language === 'en'
                        ? 'bg-emerald-500 text-white shadow-primary-glow'
                        : 'text-muted-foreground'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-border/70 bg-surface-1 p-2.5">
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-card text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-foreground">
                      {isRu ? 'Режим' : 'Mode'}
                    </p>
                    <p className="text-[15px] text-muted-foreground">
                      {userRole === 'client'
                        ? isRu
                          ? 'Клиент'
                          : 'Client'
                        : isRu
                          ? 'Мастер'
                          : 'Master'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center rounded-[10px] border border-border/70 bg-card p-0.5">
                  <button
                    onClick={() => setUserRole('client')}
                    className={`rounded-[8px] px-2 py-1 text-[14px] font-semibold transition ${
                      userRole === 'client'
                        ? 'bg-emerald-500 text-white shadow-primary-glow'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {isRu ? 'Клиент' : 'Client'}
                  </button>
                  <button
                    onClick={() => setUserRole('master')}
                    className={`rounded-[8px] px-2 py-1 text-[14px] font-semibold transition ${
                      userRole === 'master'
                        ? 'bg-emerald-500 text-white shadow-primary-glow'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {isRu ? 'Мастер' : 'Master'}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-border/70 bg-surface-1 p-2.5">
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-card text-muted-foreground">
                    {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-foreground">{t('theme')}</p>
                    <p className="text-[15px] text-muted-foreground">{theme === 'dark' ? t('darkMode') : t('lightMode')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-[10px] border border-border/70 bg-card px-3 py-1.5 text-[14px] font-semibold text-foreground transition hover:state-hover"
                >
                  {theme === 'dark' ? (isRu ? 'Светлая' : 'Light') : (isRu ? 'Темная' : 'Dark')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {menuSections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="mb-2 px-0.5 text-[14px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {section.title}
            </h2>

            <div className="overflow-hidden rounded-[18px] border border-border/70 bg-card shadow-elevation-card">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.onClick}
                  className={`flex w-full items-center gap-2.5 px-2.5 py-2.5 text-left transition hover:bg-surface-1 ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-border/70' : ''
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border ${getToneClasses(
                      item.tone
                    )}`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-foreground">
                      {item.label}
                    </p>
                    {item.value && (
                      <p className="mt-0.5 text-[15px] text-muted-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <button className="flex w-full items-center justify-center gap-1.5 rounded-[14px] border border-rose-200 bg-rose-50 p-2.5 text-[15px] font-medium text-rose-600 transition hover:bg-rose-100">
          <LogOut className="h-4 w-4" />
          {isRu ? 'Выйти' : 'Log out'}
        </button>

        <p className="pb-1 text-center text-[15px] text-muted-foreground">Sloty v1.0.0</p>
      </main>

      <BottomNav />
    </div>
  );
}
