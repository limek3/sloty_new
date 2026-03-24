'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useApp } from '@/lib/app-context';
import {
  ArrowLeft,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  Circle,
  CalendarDays,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function ChatScreen() {
  const {
    t,
    language,
    userRole,
    chats,
    selectedChatId,
    chatThreads,
    navigate,
    goBack,
    setChatDraft,
    sendChatMessage,
    retryChatMessage,
    applyQuickReplyTemplate,
  } = useApp();

  const isRu = language === 'ru';
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const chat = useMemo(
    () => chats.find((c) => c.id === selectedChatId),
    [chats, selectedChatId]
  );
  const thread = selectedChatId ? chatThreads[selectedChatId] : null;
  const composerMode = useMemo(() => {
    if (!chat || !thread) return 'disabled';
    if (thread.composerState === 'sending') return 'sending';
    if (thread.composerState === 'error') return 'error';
    if (thread.composerState === 'retry') return 'retry';
    if (!thread.draft.trim()) return 'disabled';
    return 'ready';
  }, [chat, thread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages]);

  const quickReplyTemplates = isRu
    ? [
        { id: 'time-evening', label: 'Сегодня вечером', value: 'Сегодня вечером', category: 'time' },
        { id: 'time-tomorrow', label: 'Завтра', value: 'Завтра', category: 'time' },
        { id: 'price', label: 'Какая стоимость?', value: 'Какая стоимость?', category: 'pricing' },
        { id: 'slots', label: 'Есть окна?', value: 'Есть свободные окна?', category: 'availability' },
      ]
    : [
        { id: 'time-evening', label: 'This evening', value: 'This evening', category: 'time' },
        { id: 'time-tomorrow', label: 'Tomorrow', value: 'Tomorrow', category: 'time' },
        { id: 'price', label: 'What is the price?', value: 'What is the price?', category: 'pricing' },
        { id: 'slots', label: 'Any free slots?', value: 'Any free slots?', category: 'availability' },
      ];

  const contextualActions = isRu
    ? userRole === 'master'
      ? [
          { id: 'share-availability', label: 'Поделиться окнами', text: 'Отправляю доступные окна на этой неделе.' },
          { id: 'send-services', label: 'Отправить услуги', text: 'Отправляю актуальный список услуг и цены.' },
        ]
      : [
          { id: 'book-slot', label: 'Забронировать слот', text: 'Хочу забронировать ближайший свободный слот.' },
          { id: 'share-availability', label: 'Запросить окна', text: 'Подскажите, пожалуйста, ближайшие свободные окна.' },
          { id: 'send-services', label: 'Запросить услуги', text: 'Пришлите, пожалуйста, полный список услуг.' },
        ]
    : userRole === 'master'
      ? [
          { id: 'share-availability', label: 'Share availability', text: 'Sharing my available slots for this week.' },
          { id: 'send-services', label: 'Send service list', text: 'Sharing my current services and pricing list.' },
        ]
      : [
          { id: 'book-slot', label: 'Book a slot', text: 'I would like to book your nearest available slot.' },
          { id: 'share-availability', label: 'Request availability', text: 'Could you share your nearest available slots?' },
          { id: 'send-services', label: 'Request services', text: 'Please share your full service list.' },
        ];

  if (!chat) {
    return (
      <div className="min-h-screen bg-[#f6f6f3] px-4 safe-top safe-bottom">
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-[16px] border border-border/70 bg-card px-4 py-6 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-slate-700">
              {isRu ? 'Чат недоступен или участник не найден.' : 'Chat is unavailable or participant was not found.'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isRu ? 'Проверьте список чатов и откройте диалог снова.' : 'Go back to chats and reopen the conversation.'}
            </p>
            <Button
              onClick={() => navigate('chats')}
              className="mt-3 h-9 rounded-[12px] bg-emerald-500 px-3 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              {isRu ? 'К списку чатов' : 'Back to chats'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#f6f6f3] safe-top safe-bottom safe-bottom-keyboard">
      <header className="shrink-0 px-3 pt-3">
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

              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                {chat.participantAvatar ? (
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[12px] bg-slate-100">
                    <Image
                      src={chat.participantAvatar}
                      alt={chat.participantName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-emerald-100 text-[13px] font-bold text-emerald-700">
                    {chat.participantName.charAt(0)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h2 className="truncate text-[12px] font-bold tracking-tight text-slate-900">
                      {chat.participantName}
                    </h2>
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
                      <Circle className="h-1.5 w-1.5 fill-white text-white" />
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[13px] text-slate-500">
                    {isRu ? 'В сети недавно' : 'Online recently'}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border/70 bg-[#f7f7f5] text-slate-500 transition hover:bg-card hover:text-emerald-600"
                  aria-label={isRu ? 'Позвонить' : 'Call'}
                >
                  <Phone className="h-3.5 w-3.5" />
                </button>

                <button
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border/70 bg-[#f7f7f5] text-slate-500 transition hover:bg-card"
                  aria-label={isRu ? 'Ещё' : 'More'}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between rounded-[10px] border border-border/70 bg-[#fafaf8] px-2.5 py-1.5">
              <div className="flex items-center gap-1 text-[13px] text-slate-600">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span>{isRu ? 'Чат активен' : 'Chat is active'}</span>
              </div>

              <div className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[13px] font-medium text-emerald-700">
                <CalendarDays className="h-2.5 w-2.5" />
                {isRu ? 'Сегодня' : 'Today'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden px-3 pb-3 pt-2.5">
        <div className="mb-2 flex items-center justify-center">
          <div className="rounded-full border border-border/70 bg-card px-2 py-0.5 text-[13px] font-medium text-slate-500 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
            {isRu ? 'Сегодня' : 'Today'}
          </div>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <div className="space-y-2 pb-2">
            {thread?.isLoading ? (
              <div className="rounded-[14px] border border-border/70 bg-card px-3 py-4 text-center text-sm text-slate-500">
                <Loader2 className="mx-auto mb-2 h-4 w-4 animate-spin text-slate-400" />
                {isRu ? 'Загружаем сообщения…' : 'Loading messages…'}
              </div>
            ) : thread && thread.messages.length > 0 ? (
              thread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {!msg.isOwn && (
                    <div className="mb-1 px-1 text-xs font-medium text-slate-500">
                      {chat.participantName}
                    </div>
                  )}

                  <div
                    className={`rounded-[14px] px-2.5 py-2 shadow-[0_4px_16px_rgba(15,23,42,0.03)] ${
                      msg.isOwn
                        ? 'rounded-br-[6px] bg-emerald-500 text-white'
                        : 'rounded-bl-[6px] border border-border/70 bg-card text-slate-800'
                    }`}
                  >
                    <p className="text-[13px] leading-[1.5]">{msg.text}</p>

                    <div
                      className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                        msg.isOwn ? 'text-white/75' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.isOwn && (
                        <>
                          {msg.status === 'failed' ? (
                            <AlertCircle className="h-3.5 w-3.5" />
                          ) : (
                            <CheckCheck className="h-3.5 w-3.5" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="rounded-[14px] border border-dashed border-border/70 bg-card px-3 py-5 text-center">
                <p className="text-sm font-medium text-slate-700">
                  {isRu ? 'Сообщений пока нет' : 'No messages yet'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isRu ? 'Начните диалог с шаблона или своего сообщения.' : 'Start the conversation with a template or your own message.'}
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-2 keyboard-inset-bottom">
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {quickReplyTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => selectedChatId && applyQuickReplyTemplate(selectedChatId, template.value)}
                className="shrink-0 rounded-full border border-border/70 bg-card px-2 py-1 text-[13px] font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                {template.label}
              </button>
            ))}
          </div>
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {contextualActions.map((action) => (
              <button
                key={action.id}
                onClick={() => selectedChatId && applyQuickReplyTemplate(selectedChatId, action.text)}
                className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[13px] font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="rounded-[18px] border border-border/70 bg-card p-2 shadow-[0_8px_26px_rgba(15,23,42,0.06)]">
            <div className="flex items-end gap-1.5">
              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-[#f7f7f5] text-slate-500 transition hover:bg-card"
                aria-label={isRu ? 'Прикрепить' : 'Attach'}
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>

              <div className="relative min-w-0 flex-1">
                <textarea
                  value={thread?.draft ?? ''}
                  onChange={(e) => selectedChatId && setChatDraft(selectedChatId, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (selectedChatId) sendChatMessage(selectedChatId);
                    }
                  }}
                  placeholder={t('typeMessage')}
                  rows={1}
                  disabled={!chat || composerMode === 'sending'}
                  className="max-h-24 min-h-[36px] w-full resize-none rounded-[12px] border border-border/70 bg-[#fafaf8] px-2.5 py-2 pr-9 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-200 focus:bg-card"
                />

                <button
                  className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-card hover:text-emerald-600"
                  aria-label={isRu ? 'Эмодзи' : 'Emoji'}
                >
                  <Smile className="h-3 w-3" />
                </button>
              </div>

              <Button
                size="icon"
                className="h-9 w-9 shrink-0 rounded-[12px] bg-emerald-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
                onClick={() => selectedChatId && sendChatMessage(selectedChatId)}
                disabled={composerMode === 'disabled' || composerMode === 'sending'}
              >
                {composerMode === 'sending' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 px-0.5 text-xs text-slate-500">
              <span>
                {isRu
                  ? 'Enter — отправить, Shift + Enter — новая строка'
                  : 'Enter — send, Shift + Enter — new line'}
              </span>
              {composerMode === 'error' && selectedChatId && (
                <button
                  onClick={() => retryChatMessage(selectedChatId)}
                  className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  {isRu ? 'Повторить' : 'Retry'}
                </button>
              )}
              {composerMode === 'retry' && (
                <span className="text-amber-700">{isRu ? 'Готово к повторной отправке' : 'Ready to resend'}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
