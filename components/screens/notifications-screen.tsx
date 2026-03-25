'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import {
  ArrowLeft,
  Bell,
  Calendar,
  MessageCircle,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function NotificationsScreen() {
  const { language, t, goBack, navigate } = useApp();

  const isRu = language === 'ru';

  const items = useMemo(
    () => [
      {
        id: 'n1',
        icon: Calendar,
        title: isRu ? 'Напоминание о записи' : 'Booking reminder',
        text: isRu
          ? 'Маникюр с покрытием гель-лак сегодня в 15:00'
          : 'Gel polish manicure today at 15:00',
        time: isRu ? '5 мин назад' : '5 min ago',
        action: () => navigate('bookings'),
        unread: true,
        tone: 'emerald',
      },
      {
        id: 'n2',
        icon: MessageCircle,
        title: isRu ? 'Новое сообщение' : 'New message',
        text: isRu
          ? 'Анна Петрова ответила в чате'
          : 'Anna Petrova replied in chat',
        time: isRu ? '18 мин назад' : '18 min ago',
        action: () => navigate('chats'),
        unread: true,
        tone: 'indigo',
      },
      {
        id: 'n3',
        icon: FileText,
        title: isRu ? 'Отклик на заявку' : 'Request response',
        text: isRu
          ? 'На вашу заявку пришел новый отклик'
          : 'You received a new request response',
        time: isRu ? '1 час назад' : '1 hour ago',
        action: () => navigate('requests'),
        unread: false,
        tone: 'amber',
      },
    ],
    [isRu, navigate]
  );

  const unreadCount = items.filter((item) => item.unread).length;

  const getToneClasses = (tone?: string) => {
    switch (tone) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-surface-secondary text-text-secondary border-border';
    }
  };

  return (
    <div className="app-shell safe-bottom">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border bg-card p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-2.5 px-0.5 pb-1.5 pt-0.5">
              <button
                onClick={goBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-surface-secondary text-text-secondary transition hover:bg-surface"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <h1 className="truncate text-[12px] font-bold tracking-tight text-foreground">
                    {t('notifications')}
                  </h1>
                </div>

                <p className="mt-0.5 text-[12px] leading-[1.4] text-muted-foreground">
                  {isRu
                    ? 'Все важные обновления в одном месте'
                    : 'All important updates in one place'}
                </p>
              </div>

              <div className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[13px] font-semibold text-emerald-700">
                {isRu ? 'Новых: ' : 'Unread: '}
                {unreadCount}
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between rounded-[10px] border border-border bg-surface-tertiary px-2.5 py-1.5">
              <div className="flex items-center gap-1 text-[13px] text-text-secondary">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span>{isRu ? 'Быстрый доступ к событиям' : 'Quick access to updates'}</span>
              </div>

              <div className="text-[13px] font-medium text-text-muted">
                {items.length} {isRu ? 'уведомления' : 'notifications'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-2.5 px-3 py-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="group flex w-full items-start gap-2.5 rounded-[18px] border border-border bg-card p-2.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border ${getToneClasses(
                item.tone
              )}`}
            >
              <item.icon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-foreground">
                  {item.title}
                </p>
                {item.unread && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                )}
              </div>

              <p className="mt-0.5 text-[12px] leading-[1.4] text-muted-foreground">
                {item.text}
              </p>

              <p className="mt-1 text-[7px] text-text-muted">{item.time}</p>
            </div>

            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-text-muted transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
              <ChevronRight className="h-3 w-3" />
            </div>
          </button>
        ))}

        <div className="flex items-start gap-2.5 rounded-[14px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-emerald-100 bg-emerald-50 text-emerald-600">
            <Bell className="h-3.5 w-3.5" />
          </div>

          <p className="text-[12px] leading-[1.4] text-muted-foreground">
            {isRu
              ? 'Нажмите на уведомление, чтобы сразу открыть нужный раздел.'
              : 'Tap a notification to instantly open the relevant section.'}
          </p>
        </div>
      </main>
    </div>
  );
}
