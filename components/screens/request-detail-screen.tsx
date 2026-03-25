'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice } from '@/lib/i18n';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  User,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RequestDetailScreen() {
  const {
    t,
    language,
    requests,
    selectedRequestId,
    userRole,
    goBack,
    navigate,
  } = useApp();

  const isRu = language === 'ru';

  const request = useMemo(
    () => requests.find((r) => r.id === selectedRequestId),
    [requests, selectedRequestId]
  );

  if (!request) {
    return (
      <div className="min-h-screen bg-background px-4 safe-top safe-bottom">
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-[16px] border border-border bg-card px-4 py-6 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[12px] text-muted-foreground">{t('error')}</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'in_progress':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'closed':
        return 'border-slate-200 bg-surface-secondary text-muted-foreground';
      default:
        return 'border-border bg-surface-secondary text-text-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return t('open');
      case 'in_progress':
        return t('inProgress');
      case 'closed':
        return t('closed');
      default:
        return status;
    }
  };

  return (
    <div className="app-shell safe-bottom">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border bg-card p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-2.5 px-0.5 pb-1 pt-0.5">
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
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <h1 className="truncate text-[12px] font-bold tracking-tight text-foreground">
                    {isRu ? 'Заявка' : 'Request'}
                  </h1>
                </div>

                <p className="mt-0.5 text-[12px] leading-[1.4] text-muted-foreground">
                  {isRu
                    ? 'Подробности заявки и информация по откликам'
                    : 'Request details and response information'}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[13px] font-medium ${getStatusColor(
                  request.status
                )}`}
              >
                {getStatusText(request.status)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-2.5 px-3 py-3">
        <section className="rounded-[18px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <span className="inline-flex rounded-full border border-border bg-surface-tertiary px-2 py-0.5 text-[13px] font-medium text-text-secondary">
            {request.category}
          </span>

          <h2 className="mt-2 text-[13px] font-bold leading-[1.4] tracking-tight text-foreground">
            {request.title}
          </h2>

          <p className="mt-2 text-[12px] leading-[1.5] text-text-secondary">
            {request.description}
          </p>
        </section>

        <section className="rounded-[18px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[13px] font-bold text-emerald-700">
              {request.authorName.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">
                {request.authorName}
              </p>
              <p className="text-[13px] text-muted-foreground">{request.createdAt}</p>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-secondary text-muted-foreground">
              <User className="h-3 w-3" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-[14px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[13px] text-muted-foreground">{t('budget')}</p>
            <p className="mt-1 text-[12px] font-bold tracking-tight text-emerald-600">
              {formatPrice(request.budget)}
            </p>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[13px] text-muted-foreground">{t('responses')}</p>
            <p className="mt-1 text-[12px] font-bold tracking-tight text-foreground">
              {request.responsesCount}
            </p>
          </div>
        </section>

        <section className="rounded-[18px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 rounded-[12px] bg-surface-secondary px-2.5 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-muted-foreground">
                <MapPin className="h-3 w-3" />
              </div>
              <div>
                <p className="text-[7px] text-text-muted">{t('location')}</p>
                <p className="text-[12px] font-medium text-foreground">{request.location}</p>
              </div>
            </div>

            {request.preferredDate && (
              <div className="flex flex-wrap items-center gap-2.5 rounded-[12px] bg-surface-secondary px-2.5 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-[7px] text-text-muted">{t('preferredDate')}</p>
                    <p className="text-[12px] font-medium text-foreground">
                      {request.preferredDate}
                    </p>
                  </div>
                </div>

                {request.preferredTime && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-muted-foreground">
                      <Clock className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-[7px] text-text-muted">{t('preferredTime')}</p>
                      <p className="text-[12px] font-medium text-foreground">
                        {request.preferredTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {userRole === 'master' && request.responsesCount > 0 && (
          <section className="rounded-[18px] border border-border bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-[13px] font-semibold text-foreground">
              {isRu ? 'Другие отклики' : 'Other responses'}
            </h3>

            <p className="mt-1 text-[12px] leading-[1.4] text-muted-foreground">
              {isRu
                ? `${request.responsesCount} мастеров уже откликнулись`
                : `${request.responsesCount} masters have already responded`}
            </p>
          </section>
        )}
      </main>

      {userRole === 'master' && request.status === 'open' && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 safe-bottom">
          <div className="rounded-[18px] border border-border bg-card p-2 shadow-[0_8px_26px_rgba(15,23,42,0.08)]">
            <Button
              className="h-10 w-full gap-1.5 rounded-[12px] bg-emerald-500 text-[13px] font-semibold text-white shadow-[0_12px_26px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
              onClick={() => {
                navigate('chats');
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {t('respond')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
