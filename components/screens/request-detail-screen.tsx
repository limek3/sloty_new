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
      <div className="min-h-screen bg-[#f6f6f3] px-4 safe-top safe-bottom">
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-[16px] border border-border/70 bg-card px-4 py-6 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[14px] text-slate-500">{t('error')}</p>
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
        return 'border-slate-200 bg-slate-100 text-slate-500';
      default:
        return 'border-border/70 bg-[#f7f7f5] text-slate-600';
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
          <div className="rounded-[22px] border border-border/70 bg-card p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-2.5 px-0.5 pb-1 pt-0.5">
              <button
                onClick={goBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-[#f7f7f5] text-slate-700 transition hover:bg-card"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <h1 className="truncate text-[16px] font-bold tracking-tight text-slate-900">
                    {isRu ? 'Заявка' : 'Request'}
                  </h1>
                </div>

                <p className="mt-0.5 text-[14px] leading-[1.4] text-slate-500">
                  {isRu
                    ? 'Подробности заявки и информация по откликам'
                    : 'Request details and response information'}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[15px] font-medium ${getStatusColor(
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
        <section className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <span className="inline-flex rounded-full border border-border/70 bg-[#fafaf8] px-2 py-0.5 text-[15px] font-medium text-slate-700">
            {request.category}
          </span>

          <h2 className="mt-2 text-[15px] font-bold leading-[1.4] tracking-tight text-slate-900">
            {request.title}
          </h2>

          <p className="mt-2 text-[14px] leading-[1.5] text-slate-600">
            {request.description}
          </p>
        </section>

        <section className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[15px] font-bold text-emerald-700">
              {request.authorName.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-slate-900">
                {request.authorName}
              </p>
              <p className="text-[15px] text-slate-500">{request.createdAt}</p>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f7f7f5] text-slate-500">
              <User className="h-3 w-3" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-[14px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[15px] text-slate-500">{t('budget')}</p>
            <p className="mt-1 text-[16px] font-bold tracking-tight text-emerald-600">
              {formatPrice(request.budget)}
            </p>
          </div>

          <div className="rounded-[14px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-[15px] text-slate-500">{t('responses')}</p>
            <p className="mt-1 text-[16px] font-bold tracking-tight text-slate-900">
              {request.responsesCount}
            </p>
          </div>
        </section>

        <section className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 rounded-[12px] bg-[#f7f7f5] px-2.5 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-slate-500">
                <MapPin className="h-3 w-3" />
              </div>
              <div>
                <p className="text-[7px] text-slate-400">{t('location')}</p>
                <p className="text-[14px] font-medium text-slate-800">{request.location}</p>
              </div>
            </div>

            {request.preferredDate && (
              <div className="flex flex-wrap items-center gap-2.5 rounded-[12px] bg-[#f7f7f5] px-2.5 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-slate-500">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-400">{t('preferredDate')}</p>
                    <p className="text-[14px] font-medium text-slate-800">
                      {request.preferredDate}
                    </p>
                  </div>
                </div>

                {request.preferredTime && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-slate-500">
                      <Clock className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-[7px] text-slate-400">{t('preferredTime')}</p>
                      <p className="text-[14px] font-medium text-slate-800">
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
          <section className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-[15px] font-semibold text-slate-900">
              {isRu ? 'Другие отклики' : 'Other responses'}
            </h3>

            <p className="mt-1 text-[14px] leading-[1.4] text-slate-500">
              {isRu
                ? `${request.responsesCount} мастеров уже откликнулись`
                : `${request.responsesCount} masters have already responded`}
            </p>
          </section>
        )}
      </main>

      {userRole === 'master' && request.status === 'open' && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 safe-bottom">
          <div className="rounded-[18px] border border-border/70 bg-card p-2 shadow-[0_8px_26px_rgba(15,23,42,0.08)]">
            <Button
              className="h-10 w-full gap-1.5 rounded-[12px] bg-emerald-500 text-[15px] font-semibold text-white shadow-[0_12px_26px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
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
