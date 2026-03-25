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
  Plus,
  PencilLine,
  ShieldCheck,
  CircleCheckBig,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { StateCard } from '@/components/ui/state-card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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

  const completedBookings = useMemo(
    () => bookings.filter((b) => b.status === 'completed'),
    [bookings]
  );

  const openRequests = useMemo(
    () => requests.filter((r) => r.status === 'open'),
    [requests]
  );

  const monthlyRevenue = useMemo(
    () => completedBookings.reduce((sum, booking) => sum + booking.service.price, 0),
    [completedBookings]
  );

  const chartData = [
    { day: isRu ? 'Пн' : 'Mon', bookings: 3, revenue: 7200 },
    { day: isRu ? 'Вт' : 'Tue', bookings: 4, revenue: 9400 },
    { day: isRu ? 'Ср' : 'Wed', bookings: 2, revenue: 5600 },
    { day: isRu ? 'Чт' : 'Thu', bookings: 5, revenue: 12100 },
    { day: isRu ? 'Пт' : 'Fri', bookings: 4, revenue: 10300 },
    { day: isRu ? 'Сб' : 'Sat', bookings: 6, revenue: 15400 },
    { day: isRu ? 'Вс' : 'Sun', bookings: 3, revenue: 7400 },
  ];

  const stats = [
    {
      label: isRu ? 'Сегодня' : 'Today',
      value: upcomingBookings.slice(0, 3).length,
      subtitle: isRu ? 'активных записей' : 'active bookings',
      icon: Calendar,
      tone: 'emerald',
    },
    {
      label: isRu ? 'Скоро' : 'Upcoming',
      value: upcomingBookings.length,
      subtitle: isRu ? 'в календаре' : 'in schedule',
      icon: Clock3,
      tone: 'amber',
    },
    {
      label: isRu ? 'Завершено' : 'Completed',
      value: completedBookings.length,
      subtitle: isRu ? 'за период' : 'for period',
      icon: CircleCheckBig,
      tone: 'indigo',
    },
    {
      label: isRu ? 'Выручка' : 'Revenue',
      value: formatPrice(monthlyRevenue || 45000),
      subtitle: isRu ? 'за этот месяц' : 'this month',
      icon: TrendingUp,
      tone: 'violet',
      isPrice: true,
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      title: isRu ? 'Добавить слот' : 'Add slot',
      description: isRu ? 'Открыть новое время для записи' : 'Open new available time',
      onClick: () => {
        selectInfoPage('my-schedule');
        navigate('info-detail');
      },
      tone: 'emerald',
    },
    {
      icon: PencilLine,
      title: isRu ? 'Редактировать график' : 'Edit schedule',
      description: isRu ? 'Обновить рабочие часы и блоки' : 'Adjust hours and time blocks',
      onClick: () => {
        selectInfoPage('my-schedule');
        navigate('info-detail');
      },
      tone: 'blue',
    },
    {
      icon: Settings,
      title: isRu ? 'Управлять услугами' : 'Manage services',
      description: isRu ? 'Цены, длительность и описание' : 'Pricing, duration, and details',
      onClick: () => {
        selectInfoPage('my-services');
        navigate('info-detail');
      },
      tone: 'amber',
    },
    {
      icon: User,
      title: isRu ? 'Профиль мастера' : 'Master profile',
      description: isRu ? 'Био, специализация, портфолио' : 'Bio, specialization, portfolio',
      onClick: () => {
        selectInfoPage('my-profile');
        navigate('info-detail');
      },
      tone: 'slate',
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
        return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30';
      case 'violet':
        return 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30';
      case 'slate':
        return 'bg-surface-secondary text-text-secondary border-slate-200 dark:bg-slate-500/15 dark:text-muted-foreground dark:border-slate-400/30';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  return (
    <div className="app-shell safe-bottom">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="premium-panel glass p-3">
            <div className="flex items-start gap-2.5">
              <button
                onClick={() => {
                  setUserRole('client');
                  navigate('home');
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition hover:bg-accent"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200/70 bg-emerald-50 dark:bg-emerald-500/15 dark:border-emerald-500/30">
                  <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
                  <BadgeCheck className="h-2.5 w-2.5 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">
                    {isRu ? 'Панель мастера' : 'Master Dashboard'}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                    <Sparkles className="h-2.5 w-2.5" />
                    {isRu ? 'PRO' : 'PRO'}
                  </span>
                </div>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {isRu
                    ? 'Сегодня, расписание, заявки и рост выручки'
                    : 'Today plan, requests, and revenue growth'}
                </p>
              </div>

              <button
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-xs font-bold text-muted-foreground transition hover:bg-accent"
              >
                {language.toUpperCase()}
              </button>
            </div>

            <div className="mt-2.5 flex items-center justify-between rounded-xl border border-border bg-secondary/70 px-3 py-2">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {isRu ? 'Профессиональный режим активен' : 'Professional mode is active'}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {isRu ? 'Клиент видит ваш график и услуги в реальном времени' : 'Clients see your schedule and services in real time'}
                </p>
              </div>

              <button
                onClick={() => {
                  setUserRole('client');
                  navigate('home');
                }}
                className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
              >
                {isRu ? 'К клиенту' : 'Client mode'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3.5 px-3 py-3.5">
        <section className="grid grid-cols-2 gap-2.5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="interactive-tile rounded-2xl border border-border bg-card p-3 shadow-premium-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border ${getToneClasses(
                    stat.tone
                  )}`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
              </div>

              <p className={`mt-2 font-semibold tracking-tight text-foreground ${stat.isPrice ? 'text-base' : 'text-2xl'}`}>
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{stat.subtitle}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card p-3 shadow-premium-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {isRu ? 'Активность за неделю' : 'Weekly activity'}
            </h3>
            <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
              {isRu ? 'обновляется каждый день' : 'updated daily'}
            </span>
          </div>

          <ChartContainer
            className="h-[190px] w-full"
            config={{
              bookings: {
                label: isRu ? 'Записи' : 'Bookings',
                color: 'var(--color-chart-1)',
              },
            }}
          >
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 4" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="bookings"
                type="natural"
                fill="var(--color-bookings)"
                fillOpacity={0.16}
                stroke="var(--color-bookings)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </section>

        <section>
          <h3 className="mb-2 px-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {isRu ? 'Быстрые действия' : 'Quick actions'}
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="group interactive-tile rounded-2xl border border-border bg-card p-3 text-left shadow-premium-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${getToneClasses(
                      item.tone
                    )}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                <p className="mt-3 text-[13px] font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-3 shadow-premium-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {isRu ? 'Сегодняшнее расписание' : 'Today schedule'}
            </h3>
            <button
              onClick={() => navigate('bookings')}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary"
            >
              {t('viewAll')}
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="space-y-2">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-border bg-secondary/50 p-2.5"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {booking.service.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock3 className="h-3 w-3" />
                        <span>
                          {booking.date} • {booking.time}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[13px] font-semibold text-emerald-600 dark:text-emerald-300">
                      {formatPrice(booking.service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <StateCard
              icon={Calendar}
              className="border-0 bg-transparent px-2 py-6 shadow-none"
              title={isRu ? 'Записей пока нет' : 'No bookings yet'}
              description={
                isRu
                  ? 'Добавьте услуги и откройте расписание, чтобы получать новые записи.'
                  : 'Add services and open your schedule to receive new bookings.'
              }
              primaryAction={{
                label: isRu ? 'Управлять расписанием' : 'Manage schedule',
                onClick: () => {
                  selectInfoPage('my-schedule');
                  navigate('info-detail');
                },
              }}
              secondaryAction={{
                label: isRu ? 'Редактировать услуги' : 'Edit services',
                onClick: () => {
                  selectInfoPage('my-services');
                  navigate('info-detail');
                },
              }}
            />
          )}
        </section>

        <section>
          <h3 className="mb-2 px-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {isRu ? 'Управление' : 'Management'}
          </h3>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="group interactive-tile flex w-full items-center justify-between rounded-2xl border border-border bg-card p-3 text-left shadow-premium-sm"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${getToneClasses(
                      item.tone
                    )}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
              </button>
            ))}
          </div>
        </section>

        <section className="pb-2">
          <Button
            variant="outline"
            className="h-10 w-full rounded-xl border-border bg-card text-xs font-medium shadow-none hover:bg-secondary"
            onClick={() => {
              setUserRole('client');
              navigate('home');
            }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {isRu ? 'Переключиться на клиента' : 'Switch to Client Mode'}
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
