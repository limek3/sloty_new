'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/lib/app-context';
import { BottomNav } from '@/components/navigation/bottom-nav';
import {
  MessageCircle,
  Search,
  Sparkles,
  ArrowRight,
  CheckCheck,
  Circle,
} from 'lucide-react';
import Image from 'next/image';
import { StateCard } from '@/components/ui/state-card';

export function ChatsScreen() {
  const { t, language, chats, navigate, selectChat } = useApp();
  const [query, setQuery] = useState('');

  const isRu = language === 'ru';

  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;

    return chats.filter(
      (chat) =>
        chat.participantName.toLowerCase().includes(q) ||
        (chat.lastMessage || '').toLowerCase().includes(q)
    );
  }, [chats, query]);

  const unreadTotal = useMemo(
    () => chats.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0),
    [chats]
  );

  const handleChatClick = (chatId: string) => {
    selectChat(chatId);
    navigate('chat');
  };

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border bg-card p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between gap-2.5 px-0.5 pb-1.5 pt-0.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </div>
                  <h1 className="truncate text-[12px] font-bold tracking-tight text-foreground">
                    {t('chats')}
                  </h1>
                </div>

                <p className="mt-0.5 text-[12px] leading-[1.4] text-muted-foreground">
                  {isRu
                    ? 'Общайтесь с мастерами и следите за сообщениями'
                    : 'Chat with masters and track messages'}
                </p>
              </div>

              <div className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[13px] font-semibold text-emerald-700">
                {isRu ? 'Новых: ' : 'Unread: '}
                {unreadTotal}
              </div>
            </div>

            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isRu ? 'Поиск по чатам...' : 'Search chats...'}
                className="h-9 w-full rounded-[12px] border border-border bg-surface-secondary pl-9 pr-3 text-[13px] text-foreground outline-none transition placeholder:text-text-muted focus:border-emerald-200 focus:bg-card"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-3 py-3">
        {filteredChats.length > 0 ? (
          <div className="space-y-2.5">
            {filteredChats.map((chat) => {
              const hasUnread = chat.unreadCount > 0;

              return (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className="group flex w-full items-center gap-2.5 rounded-[18px] border border-border bg-card p-2.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative shrink-0">
                    {chat.participantAvatar ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-[12px] bg-surface-secondary">
                        <Image
                          src={chat.participantAvatar}
                          alt={chat.participantName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-100 text-[13px] font-bold text-emerald-700">
                        {chat.participantName.charAt(0)}
                      </div>
                    )}

                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                      <Circle className="h-1.5 w-1.5 fill-white text-white" />
                    </span>

                    {hasUnread && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[7px] font-bold text-white shadow-[0_6px_14px_rgba(244,63,94,0.22)]">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="min-w-0">
                        <h3
                          className={`truncate text-[13px] font-semibold ${
                            hasUnread ? 'text-foreground' : 'text-foreground'
                          }`}
                        >
                          {chat.participantName}
                        </h3>

                        <div className="mt-0.5 flex items-center gap-0.5 text-[13px] text-text-muted">
                          <Sparkles className="h-2.5 w-2.5" />
                          <span>{isRu ? 'Активный чат' : 'Active chat'}</span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[13px] font-medium text-text-muted">
                          {chat.lastMessageTime}
                        </div>
                        {!hasUnread && (
                          <div className="mt-0.5 inline-flex items-center gap-0.5 text-[7px] text-text-muted">
                            <CheckCheck className="h-2.5 w-2.5" />
                            <span>{isRu ? 'Прочитано' : 'Read'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5">
                      <p
                        className={`min-w-0 flex-1 truncate text-[12px] ${
                          hasUnread
                            ? 'font-medium text-text-secondary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {chat.lastMessage ||
                          (isRu ? 'Начните общение' : 'Start a conversation')}
                      </p>

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-muted-foreground transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <StateCard
            icon={MessageCircle}
            title={t('noChats')}
            description={t('startChat')}
            primaryAction={{
              label: isRu ? 'Начать разговор' : 'Start conversation',
              onClick: () => navigate('search'),
            }}
            secondaryAction={{
              label: isRu ? 'Смотреть заявки' : 'Browse requests',
              onClick: () => navigate('requests'),
            }}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}
