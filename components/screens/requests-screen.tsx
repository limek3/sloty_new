'use client';

import { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice } from '@/lib/i18n';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { MobileAppHeader } from '@/components/ui/mobile-app-header';
import { MobileAppShell, MobileCardStack, MobileContent } from '@/components/ui/mobile-layout';
import {
  Plus,
  MapPin,
  Calendar,
  MessageCircle,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RequestsScreen() {
  const { t, language, requests, navigate, selectRequest } = useApp();

  const [activeTab, setActiveTab] = useState<'browse' | 'my'>('browse');

  const isRu = language === 'ru';

  const myRequests = requests.filter(
    (r) => r.authorName === 'Пользователь' || r.authorName === 'User'
  );
  const allRequests = requests;

  const displayRequests = activeTab === 'browse' ? allRequests : myRequests;

  const handleRequestClick = (requestId: string) => {
    selectRequest(requestId);
    navigate('request-detail');
  };

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
    <MobileAppShell>
      <MobileAppHeader
        title={
          <span className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FileText className="h-3.5 w-3.5" />
            </span>
            {t('requests')}
          </span>
        }
        description={
          isRu
            ? 'Смотрите актуальные заявки или управляйте своими'
            : 'Browse active requests or manage your own'
        }
        actions={
          <Button
            size="sm"
            onClick={() => navigate('create-request')}
            className="h-9 radius-chip bg-emerald-500 px-2.5 text-[14px] font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            {t('newRequest')}
          </Button>
        }
      >

            <div className="mt-1 grid grid-cols-2 gap-1.5 radius-card border border-border/70 bg-[#fafaf8] p-1">
              <button
                onClick={() => setActiveTab('browse')}
                className={`radius-chip flex items-center justify-center gap-1 px-2.5 py-2 text-[14px] font-medium transition-all ${
                  activeTab === 'browse'
                    ? 'bg-card text-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.05)]'
                    : 'text-slate-500'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                {t('browseRequests')}
              </button>

              <button
                onClick={() => setActiveTab('my')}
                className={`radius-chip flex items-center justify-center gap-1 px-2.5 py-2 text-[14px] font-medium transition-all ${
                  activeTab === 'my'
                    ? 'bg-card text-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.05)]'
                    : 'text-slate-500'
                }`}
              >
                <FileText className="h-3 w-3" />
                {t('myRequests')}
              </button>
            </div>
      </MobileAppHeader>

      <MobileContent className="py-3">
        {displayRequests.length > 0 ? (
          <MobileCardStack>
            {displayRequests.map((request) => (
              <button
                key={request.id}
                onClick={() => handleRequestClick(request.id)}
                className="group list-card density-list w-full transition-all hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <h3 className="line-clamp-2 pr-2 text-[14px] font-semibold leading-[1.4] text-slate-900 transition-colors group-hover:text-emerald-600">
                    {request.title}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[15px] font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-slate-500">
                  {request.description}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-1">
                  <span className="rounded-full border border-border/70 bg-[#fafaf8] px-2 py-0.5 text-[15px] font-medium text-slate-700">
                    {request.category}
                  </span>

                  <div className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[15px] text-slate-600">
                    <MapPin className="h-2.5 w-2.5" />
                    <span>{request.location}</span>
                  </div>

                  {request.preferredDate && (
                    <div className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[15px] text-slate-600">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{request.preferredDate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-border/70 pt-2.5">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[14px] font-bold text-emerald-700">
                      {request.authorName.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-slate-700">
                        {request.authorName}
                      </div>
                      <div className="text-[15px] text-slate-400">{request.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-[15px] font-bold tracking-tight text-emerald-600">
                      {formatPrice(request.budget)}
                    </span>

                    <div className="inline-flex items-center gap-0.5 rounded-full border border-border/70 bg-[#fafaf8] px-1.5 py-0.5 text-slate-500">
                      <MessageCircle className="h-2.5 w-2.5" />
                      <span className="text-[15px] font-medium">{request.responsesCount}</span>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f7f7f5] text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </MobileCardStack>
        ) : (
          <div className="rounded-[18px] border border-border/70 bg-card px-4 py-10 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f5f5f2]">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>

            <h3 className="mt-3 text-[15px] font-semibold text-slate-900">
              {activeTab === 'my'
                ? isRu
                  ? 'У вас пока нет заявок'
                  : 'You have no requests yet'
                : isRu
                  ? 'Заявок пока нет'
                  : 'No requests yet'}
            </h3>

            <p className="mx-auto mt-1.5 max-w-xs text-[14px] leading-[1.4] text-slate-500">
              {isRu
                ? 'Создайте заявку, чтобы получить отклики от мастеров'
                : 'Create a request to get responses from masters'}
            </p>

            <Button
              onClick={() => navigate('create-request')}
              className="mt-3 h-9 rounded-[12px] bg-emerald-500 px-3 text-[14px] font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              {t('createRequest')}
            </Button>
          </div>
        )}
      </MobileContent>

      <BottomNav />
    </MobileAppShell>
  );
}
