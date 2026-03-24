'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice } from '@/lib/i18n';
import {
  User,
  Calendar,
  Settings,
  MessageCircle,
  FileText,
  Share2,
  TrendingUp,
  ChevronRight,
  ArrowLeft,
  BadgeCheck,
  Sparkles,
  Briefcase,
  ArrowRight,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/navigation/bottom-nav';

export function MasterDashboardScreen() {
  const {
    t,
    language,
    setLanguage,
    navigate,
    requests,
    bookings,
    selectInfoPage,
    setUserRole,
  } = useApp();

  const isRu = language === 'ru';

  const upcomingBookings = useMemo(
    () => bookings.filter((b) => b.status === 'upcoming'),
    [bookings]
  );

  const openRequests = useMemo(
    () => requests.filter((r) => r.status === 'open'),
    [requests]
  );

  const stats = [
    {
      label: isRu ? 'Записи' : 'Bookings',
      value: upcomingBookings.length,
      icon: Calendar,
      tone: 'emerald',
    },
    {
      label: isRu ? 'Заявки' : 'Requests',
      value: openRequests.length,
      icon: FileText,
      tone: 'amber',
    },
    {
      label: isRu ? 'Сообщения' : 'Messages',
      value: 3,
      icon: MessageCircle,
      tone: 'indigo',
    },
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: isRu ? 'Мое расписание' : 'My schedule',
      description: isRu ? 'Управляйте слотами и рабочими днями' : 'Manage slots and working days',
      onClick: () => {
        selectInfoPage('my-schedule');
        navigate('info-detail');
      },
      tone: 'emerald',
    },
    {
      icon: Briefcase,
      title: isRu ? 'Мои услуги' : 'My services',
      description: isRu ? 'Редактируйте услуги и цены' : 'Edit services and pricing',
      onClick: () => {
        selectInfoPage('my-services');
        navigate('info-detail');
      },
      tone: 'amber',
    },
  ];

  const menuItems = [
    {
      icon: User,
      label: t('myProfile'),
      description: isRu ? 'Редактировать профиль' : 'Edit your profile',
      onClick: () => {
        selectInfoPage('my-profile');
        navigate('info-detail');
      },
      tone: 'emerald',
    },
    {
      icon: Settings,
      label: t('myServices'),
      description: isRu ? 'Управление услугами' : 'Manage services',
      onClick: () => {
        selectInfoPage('my-services');
        navigate('info-detail');
      },
      tone: 'slate',
    },
    {
      icon: Calendar,
      label: t('mySchedule'),
      description: isRu ? 'Настройка расписания' : 'Schedule settings',
      onClick: () => {
        selectInfoPage('my-schedule');
        navigate('info-detail');
      },
      tone: 'blue',
    },
    {
      icon: TrendingUp,
      label: t('earnings'),
      description: `${formatPrice(45000)}${isRu ? ' в этом месяце' : ' this month'}`,
      onClick: () => {
        selectInfoPage('earnings');
        navigate('info-detail');
      },
      tone: 'amber',
    },
    {
      icon: FileText,
      label: t('clientRequests'),
      description: `${openRequests.length} ${isRu ? 'открытых заявок' : 'open requests'}`,
      onClick: () => navigate('requests'),
      tone: 'violet',
    },
    {
      icon: Share2,
      label: t('shareProfile'),
      description: isRu ? 'Поделиться или QR-код' : 'Share or QR code',
      onClick: () => {
        selectInfoPage('share-profile');
        navigate('info-detail');
      },
      tone: 'indigo',
    },
  ];

  const getToneClasses = (tone?: string) => {
    switch (tone) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'violet':
        return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'slate':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-[#f7f7f5] text-slate-600 border-black/6';
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f3] pb-24 safe-top safe-bottom">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-black/5 bg-white p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-2.5 px-0.5 pb-1.5 pt-0.5">
              <button
                onClick={() => {
                  setUserRole('client');
                  navigate('home');
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-black/6 bg-[#f7f7f5] text-slate-700 transition hover:bg-white"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-emerald-100 bg-emerald-50">
                  <Briefcase className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                  <BadgeCheck className="h-2.5 w-2.5 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-[13px] font-bold tracking-tight text-slate-900">
                    {isRu ? 'Панель мастера' : 'Master Dashboard'}
                  </h1>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700">
                    <Sparkles className="h-2 w-2" />
                    {isRu ? 'Мастер' : 'Master'}
                  </span>
                </div>

                <p className="mt-0.5 text-[9px] leading-[1.4] text-slate-500">
                  {isRu
                    ? 'Управляйте профилем, расписанием, заявками'
                    : 'Manage profile, schedule, requests'}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-black/6 bg-[#f7f7f5] text-[8px] font-bold text-slate-600 transition hover:bg-white"
                >
                  {language.toUpperCase()}
                </button>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between rounded-[12px] border border-black/6 bg-[#fafaf8] px-2.5 py-1.5">
              <div>
                <p className="text-[9px] font-semibold text-slate-900">
                  {isRu ? 'Профессиональный режим' : 'Professional mode'}
                </p>
                <p className="mt-0.5 text-[8px] text-slate-500">
                  {isRu ? 'Панель управления мастера' : 'Master management panel'}
                </p>
              </div>

              <button
                onClick={() => {
                  setUserRole('client');
                  navigate('home');
                }}
                className="rounded-[10px] bg-emerald-50 px-2.5 py-1.5 text-[8px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                {isRu ? 'К клиенту' : 'Client mode'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 px-3 py-3">
        <section className="grid grid-cols-3 gap-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-[14px] border border-black/6 bg-white p-2.5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-[10px] border ${getToneClasses(
                  stat.tone
                )}`}
              >
                <stat.icon className="h-3.5 w-3.5" />
              </div>
              <p className="text-[13px] font-bold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[8px] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-2">
          {quickActions.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="group overflow-hidden rounded-[14px] border border-black/6 bg-white p-2.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border ${getToneClasses(
                    item.tone
                  )}`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                </div>

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7f7f5] text-slate-400 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              <div className="mt-2">
                <p className="text-[10px] font-semibold text-slate-900 transition group-hover:text-emerald-600">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[8px] leading-[1.4] text-slate-500">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </section>

        {upcomingBookings.length > 0 && (
          <section className="rounded-[18px] border border-black/6 bg-white p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[10px] font-semibold text-slate-900">
                {isRu ? 'Ближайшие записи' : 'Upcoming Bookings'}
              </h3>
              <button
                onClick={() => navigate('bookings')}
                className="inline-flex items-center gap-0.5 text-[8px] font-medium text-emerald-600"
              >
                {t('viewAll')}
                <ChevronRight className="h-2.5 w-2.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {upcomingBookings.slice(0, 2).map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-[12px] border border-black/6 bg-[#fafaf8] p-2.5"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-medium text-slate-900">
                        {booking.service.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-[8px] text-slate-500">
                        <Clock3 className="h-2.5 w-2.5" />
                        <span>
                          {booking.date} • {booking.time}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-emerald-600">
                      {formatPrice(booking.service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="mb-2 px-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400">
            {isRu ? 'Управление' : 'Management'}
          </h3>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="group flex w-full items-center justify-between rounded-[14px] border border-black/6 bg-white p-2.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border ${getToneClasses(
                      item.tone
                    )}`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-medium text-slate-900 transition group-hover:text-emerald-600">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[8px] text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:text-emerald-600" />
              </button>
            ))}
          </div>
        </section>

        <section className="pb-2">
          <Button
            variant="outline"
            className="h-9 w-full rounded-[12px] border-black/6 bg-white text-[9px] font-medium shadow-none hover:bg-slate-50"
            onClick={() => {
              setUserRole('client');
              navigate('home');
            }}
          >
            {isRu ? 'Переключиться на клиента' : 'Switch to Client Mode'}
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
