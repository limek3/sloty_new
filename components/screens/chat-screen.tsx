'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type ChatMessage = {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
};

export function ChatScreen() {
  const { t, language, chats, selectedChatId, goBack } = useApp();

  const isRu = language === 'ru';
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: isRu ? 'Здравствуйте! Интересуют ваши услуги.' : 'Hello! I am interested in your services.',
      isOwn: true,
      time: '10:30',
    },
    {
      id: '2',
      text: isRu ? 'Здравствуйте! Конечно, чем могу помочь?' : 'Hello! Sure, how can I help?',
      isOwn: false,
      time: '10:32',
    },
    {
      id: '3',
      text: isRu ? 'Хотела бы записаться на маникюр.' : 'I would like to book a manicure.',
      isOwn: true,
      time: '10:33',
    },
    {
      id: '4',
      text: isRu ? 'Отлично! Когда вам удобно?' : 'Great! When would be convenient for you?',
      isOwn: false,
      time: '10:35',
    },
  ]);

  const chat = useMemo(
    () => chats.find((c) => c.id === selectedChatId),
    [chats, selectedChatId]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickReplies = isRu
    ? ['Сегодня вечером', 'Завтра', 'Какая стоимость?', 'Есть окна?']
    : ['This evening', 'Tomorrow', 'What is the price?', 'Any free slots?'];

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      isOwn: true,
      time: new Date().toLocaleTimeString(isRu ? 'ru-RU' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `${Date.now()}-reply`,
        text: isRu
          ? 'Спасибо! Уточню детали и отвечу вам.'
          : 'Thanks! I will check the details and reply to you.',
        isOwn: false,
        time: new Date().toLocaleTimeString(isRu ? 'ru-RU' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  const handleQuickReply = (text: string) => {
    setMessage(text);
  };

  if (!chat) {
    return (
      <div className="min-h-screen bg-surface-2 px-4 safe-top safe-bottom">
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-[16px] border border-border/70 bg-card px-4 py-6 text-center shadow-elevation-card">
            <p className="text-[14px] text-muted-foreground">{t('error')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-2 safe-top safe-bottom">
      <header className="shrink-0 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border/70 bg-card p-2.5 shadow-elevation-nav">
            <div className="flex items-start gap-2.5 px-0.5 pb-1 pt-0.5">
              <button
                onClick={goBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-surface-2 text-foreground transition hover:bg-card"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                {chat.participantAvatar ? (
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[12px] bg-surface-2">
                    <Image
                      src={chat.participantAvatar}
                      alt={chat.participantName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-emerald-100 text-[15px] font-bold text-emerald-700">
                    {chat.participantName.charAt(0)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h2 className="truncate text-[14px] font-bold tracking-tight text-foreground">
                      {chat.participantName}
                    </h2>
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
                      <Circle className="h-1.5 w-1.5 fill-white text-white" />
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[15px] text-muted-foreground">
                    {isRu ? 'В сети недавно' : 'Online recently'}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border/70 bg-surface-2 text-muted-foreground transition hover:bg-card hover:text-emerald-600"
                  aria-label={isRu ? 'Позвонить' : 'Call'}
                >
                  <Phone className="h-3.5 w-3.5" />
                </button>

                <button
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border/70 bg-surface-2 text-muted-foreground transition hover:bg-card"
                  aria-label={isRu ? 'Ещё' : 'More'}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between rounded-[10px] border border-border/70 bg-surface-1 px-2.5 py-1.5">
              <div className="flex items-center gap-1 text-[15px] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span>{isRu ? 'Чат активен' : 'Chat is active'}</span>
              </div>

              <div className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[15px] font-medium text-emerald-700">
                <CalendarDays className="h-2.5 w-2.5" />
                {isRu ? 'Сегодня' : 'Today'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden px-3 pb-3 pt-2.5">
        <div className="mb-2 flex items-center justify-center">
          <div className="rounded-full border border-border/70 bg-card px-2 py-0.5 text-[15px] font-medium text-muted-foreground shadow-premium-sm">
            {isRu ? 'Сегодня' : 'Today'}
          </div>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <div className="space-y-2 pb-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {!msg.isOwn && (
                    <div className="mb-0.5 px-1 text-[7px] font-medium text-muted-foreground">
                      {chat.participantName}
                    </div>
                  )}

                  <div
                    className={`rounded-[14px] px-2.5 py-2 shadow-premium-sm ${
                      msg.isOwn
                        ? 'rounded-br-[6px] bg-emerald-500 text-white'
                        : 'rounded-bl-[6px] border border-border/70 bg-card text-foreground'
                    }`}
                  >
                    <p className="text-[15px] leading-[1.5]">{msg.text}</p>

                    <div
                      className={`mt-0.5 flex items-center justify-end gap-0.5 text-[7px] ${
                        msg.isOwn ? 'text-white/75' : 'text-muted-foreground'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.isOwn && <CheckCheck className="h-2.5 w-2.5" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="shrink-0 rounded-full border border-border/70 bg-card px-2 py-1 text-[15px] font-medium text-muted-foreground transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="rounded-[18px] border border-border/70 bg-card p-2 shadow-elevation-nav">
            <div className="flex items-end gap-1.5">
              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-surface-2 text-muted-foreground transition hover:bg-card"
                aria-label={isRu ? 'Прикрепить' : 'Attach'}
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>

              <div className="relative min-w-0 flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={t('typeMessage')}
                  rows={1}
                  className="max-h-24 min-h-[36px] w-full resize-none rounded-[12px] border border-border/70 bg-surface-1 px-2.5 py-2 pr-9 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-200 focus:bg-card"
                />

                <button
                  className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition hover:bg-card hover:text-emerald-600"
                  aria-label={isRu ? 'Эмодзи' : 'Emoji'}
                >
                  <Smile className="h-3 w-3" />
                </button>
              </div>

              <Button
                size="icon"
                className="h-9 w-9 shrink-0 rounded-[12px] bg-emerald-500 text-white shadow-primary-glow hover:bg-emerald-600"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="mt-1.5 px-0.5 text-[7px] text-muted-foreground">
              {isRu
                ? 'Enter — отправить, Shift + Enter — новая строка'
                : 'Enter — send, Shift + Enter — new line'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
