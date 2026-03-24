'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/lib/app-context';
import {
  ArrowLeft,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  User,
  Settings,
  Calendar,
  TrendingUp,
  Share2,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Lock,
  Clock3,
  CircleCheckBig,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/i18n';

type SlotStatus = 'free' | 'booked' | 'blocked';

interface ScheduleSlot {
  id: string;
  time: string;
  status: SlotStatus;
  clientName?: string;
  service?: string;
}

interface ManagedService {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export function InfoDetailScreen() {
  const { selectedInfoPage, language, goBack, navigate, masters } = useApp();
  const isRu = language === 'ru';

  const defaultServices = useMemo<ManagedService[]>(() => {
    const fallback = [
      {
        id: 's1',
        name: isRu ? 'Маникюр с покрытием' : 'Manicure with coating',
        price: 2500,
        duration: 90,
        description: isRu ? 'Комплексный уход и покрытие гель-лаком' : 'Full care and gel-polish coverage',
      },
      {
        id: 's2',
        name: isRu ? 'Коррекция бровей' : 'Brow correction',
        price: 1200,
        duration: 45,
        description: isRu ? 'Форма, архитектура и окрашивание' : 'Shape, architecture, and tinting',
      },
    ];

    return masters[0]?.services?.length
      ? masters[0].services.map((service) => ({
          id: service.id,
          name: service.name,
          price: service.price,
          duration: service.duration,
          description:
            service.description ||
            (isRu ? 'Описание услуги отсутствует. Добавьте детали для клиентов.' : 'No description yet. Add details for clients.'),
        }))
      : fallback;
  }, [masters, isRu]);

  const [services, setServices] = useState<ManagedService[]>(defaultServices);
  const [newService, setNewService] = useState({ name: '', price: '', duration: '', description: '' });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [slots, setSlots] = useState<ScheduleSlot[]>([
    { id: 'sl-1', time: '09:00', status: 'free' },
    { id: 'sl-2', time: '10:30', status: 'booked', clientName: isRu ? 'Анна Петрова' : 'Anna Petrova', service: isRu ? 'Маникюр' : 'Manicure' },
    { id: 'sl-3', time: '12:00', status: 'blocked' },
    { id: 'sl-4', time: '14:30', status: 'free' },
    { id: 'sl-5', time: '16:00', status: 'booked', clientName: isRu ? 'Мария И.' : 'Maria I.', service: isRu ? 'Брови' : 'Brows' },
  ]);
  const [newSlot, setNewSlot] = useState('');

  const content = useMemo(() => {
    switch (selectedInfoPage) {
      case 'notification-settings':
        return {
          title: isRu ? 'Настройки уведомлений' : 'Notification Settings',
          icon: Bell,
          blocks: [
            { title: isRu ? 'Записи и напоминания' : 'Bookings & reminders', text: isRu ? 'Включите пуши о предстоящих визитах, изменениях времени и подтверждениях.' : 'Turn on pushes for upcoming visits, reschedules, and confirmations.' },
            { title: isRu ? 'Сообщения и отклики' : 'Messages & responses', text: isRu ? 'Получайте уведомления о новых сообщениях и откликах на ваши заявки.' : 'Receive alerts about new messages and request responses.' },
          ],
        };
      case 'privacy-settings':
        return {
          title: isRu ? 'Настройки приватности' : 'Privacy Settings',
          icon: Shield,
          blocks: [
            { title: isRu ? 'Публичный профиль' : 'Public profile', text: isRu ? 'Управляйте видимостью профиля, фото и контактной информации.' : 'Manage visibility of your profile, photos, and contact details.' },
            { title: isRu ? 'Данные и безопасность' : 'Data & security', text: isRu ? 'Выберите, какие данные использовать для персонализации и рекомендаций.' : 'Choose what data can be used for personalization and recommendations.' },
          ],
        };
      case 'help-support':
        return {
          title: isRu ? 'Помощь и поддержка' : 'Help & Support',
          icon: HelpCircle,
          blocks: [
            { title: isRu ? 'Написать в поддержку' : 'Contact support', text: isRu ? 'Мы поможем с записью, платежами, чатом и любыми техническими вопросами.' : 'We can help with bookings, payments, chat, and any technical issues.' },
            { title: isRu ? 'Частые вопросы' : 'FAQ', text: isRu ? 'Как записаться, как создать заявку, как откликнуться и как отменить визит.' : 'How to book, create a request, respond, or cancel a visit.' },
          ],
        };
      case 'terms-conditions':
        return {
          title: isRu ? 'Условия использования' : 'Terms & Conditions',
          icon: FileText,
          blocks: [
            { title: isRu ? 'Платформа Sloty' : 'Sloty platform', text: isRu ? 'Используя приложение, вы соглашаетесь с правилами записи, общения и публикации заявок.' : 'By using the app, you agree to the rules for bookings, communication, and request posting.' },
            { title: isRu ? 'Ответственность сторон' : 'Responsibility', text: isRu ? 'Мастера отвечают за качество услуг, а клиенты — за корректность заявок и посещений.' : 'Masters are responsible for service quality, clients for accurate requests and attendance.' },
          ],
        };
      case 'privacy-policy':
        return {
          title: isRu ? 'Политика конфиденциальности' : 'Privacy Policy',
          icon: Shield,
          blocks: [
            { title: isRu ? 'Какие данные мы храним' : 'What data we store', text: isRu ? 'Контакты, историю записей, избранное, чаты и настройки интерфейса.' : 'Contacts, booking history, favorites, chats, and interface settings.' },
            { title: isRu ? 'Как используются данные' : 'How data is used', text: isRu ? 'Для подбора мастеров, маршрутов, уведомлений и улучшения пользовательского опыта.' : 'To suggest providers, build routes, send notifications, and improve UX.' },
          ],
        };
      case 'my-profile':
        return {
          title: isRu ? 'Мой профиль' : 'My Profile',
          icon: User,
          blocks: [
            { title: isRu ? 'Профиль мастера' : 'Master profile', text: isRu ? 'Обновите фото, описание, адрес, специализацию, портфолио и настройки видимости.' : 'Update photo, bio, address, specialization, portfolio, and visibility settings.' },
            { title: isRu ? 'Доступность' : 'Availability', text: isRu ? 'Укажите рабочие дни и время, когда вы точно принимаете клиентов.' : 'Set workdays and hours when clients can book with confidence.' },
          ],
        };
      case 'my-services':
        return {
          title: isRu ? 'Мои услуги' : 'My Services',
          icon: Settings,
          blocks: [],
        };
      case 'my-schedule':
        return {
          title: isRu ? 'Мое расписание' : 'My Schedule',
          icon: Calendar,
          blocks: [],
        };
      case 'earnings':
        return {
          title: isRu ? 'Заработок' : 'Earnings',
          icon: TrendingUp,
          blocks: [
            { title: isRu ? 'Статистика за месяц' : 'Monthly stats', text: isRu ? 'Выручка: 45 000 ₽. Средний чек: 2 250 ₽. Повторные клиенты: 38%.' : 'Revenue: ₽45,000. Average ticket: ₽2,250. Returning clients: 38%.' },
          ],
        };
      case 'share-profile':
        return {
          title: isRu ? 'Поделиться профилем' : 'Share Profile',
          icon: Share2,
          blocks: [
            { title: isRu ? 'Ссылка и QR-код' : 'Link & QR code', text: isRu ? 'Поделитесь профилем мастера в Telegram, соцсетях или покажите QR-код клиенту.' : 'Share your profile in Telegram, social media, or with a quick QR code.' },
          ],
        };
      default:
        return {
          title: isRu ? 'Информация' : 'Information',
          icon: FileText,
          blocks: [{ title: isRu ? 'Раздел' : 'Section', text: isRu ? 'Выберите раздел из профиля или панели мастера.' : 'Choose a section from profile or dashboard.' }],
        };
    }
  }, [selectedInfoPage, isRu]);

  const addOrUpdateService = () => {
    if (!newService.name || !newService.price || !newService.duration) return;

    if (editingServiceId) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingServiceId
            ? {
                ...service,
                name: newService.name,
                price: Number(newService.price),
                duration: Number(newService.duration),
                description: newService.description,
              }
            : service
        )
      );
      setEditingServiceId(null);
    } else {
      setServices((prev) => [
        {
          id: `service-${Date.now()}`,
          name: newService.name,
          price: Number(newService.price),
          duration: Number(newService.duration),
          description: newService.description,
        },
        ...prev,
      ]);
    }

    setNewService({ name: '', price: '', duration: '', description: '' });
  };

  const editService = (service: ManagedService) => {
    setEditingServiceId(service.id);
    setNewService({
      name: service.name,
      price: String(service.price),
      duration: String(service.duration),
      description: service.description,
    });
  };

  const removeService = (serviceId: string) => {
    setServices((prev) => prev.filter((service) => service.id !== serviceId));
    if (editingServiceId === serviceId) {
      setEditingServiceId(null);
      setNewService({ name: '', price: '', duration: '', description: '' });
    }
  };

  const addSlot = () => {
    if (!newSlot) return;
    setSlots((prev) => [{ id: `slot-${Date.now()}`, time: newSlot, status: 'free' }, ...prev]);
    setNewSlot('');
  };

  const cycleSlotStatus = (slotId: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id !== slotId) return slot;
        if (slot.status === 'free') return { ...slot, status: 'blocked', clientName: undefined, service: undefined };
        if (slot.status === 'blocked') {
          return {
            ...slot,
            status: 'booked',
            clientName: isRu ? 'Демо клиент' : 'Demo client',
            service: isRu ? 'Услуга' : 'Service',
          };
        }
        return { ...slot, status: 'free', clientName: undefined, service: undefined };
      })
    );
  };

  const deleteSlot = (slotId: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const slotTone = (status: SlotStatus) => {
    if (status === 'booked') return 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-300';
    if (status === 'blocked') return 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-500/15 dark:border-rose-500/30 dark:text-rose-300';
    return 'bg-secondary border-border text-foreground';
  };

  const statusLabel = (status: SlotStatus) => {
    if (status === 'booked') return isRu ? 'Занято' : 'Booked';
    if (status === 'blocked') return isRu ? 'Блок' : 'Blocked';
    return isRu ? 'Свободно' : 'Free';
  };

  return (
    <div className="app-shell safe-top safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 px-3 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            onClick={goBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <content.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-foreground">{content.title}</h1>
              <p className="text-xs text-muted-foreground">
                {isRu ? 'Профессиональные настройки мастера' : 'Professional master settings'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 px-3 py-3.5">
        {selectedInfoPage === 'my-schedule' && (
          <>
            <section className="rounded-2xl border border-border/70 bg-card p-3 shadow-premium-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{isRu ? 'Управление слотами' : 'Slot management'}</h2>
                  <p className="text-xs text-muted-foreground">{isRu ? 'Добавляйте, блокируйте и редактируйте время' : 'Add, block, and update available time'}</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[11px] text-muted-foreground">
                  <Clock3 className="h-3 w-3" />
                  {isRu ? 'Нажмите на слот для смены статуса' : 'Tap slot to switch status'}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Input
                  type="time"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button size="sm" onClick={addSlot}>
                  <Plus className="h-3.5 w-3.5" />
                  {isRu ? 'Добавить' : 'Add'}
                </Button>
              </div>
            </section>

            <section className="space-y-2">
              {slots.map((slot) => (
                <div key={slot.id} className={`rounded-xl border p-2.5 ${slotTone(slot.status)}`}>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => cycleSlotStatus(slot.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <span className="rounded-lg bg-card/70 px-2 py-1 text-xs font-semibold text-foreground/90">{slot.time}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">{statusLabel(slot.status)}</p>
                        <p className="truncate text-[11px] opacity-80">
                          {slot.clientName ? `${slot.clientName} • ${slot.service}` : isRu ? 'Доступно для новых клиентов' : 'Available for new clients'}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => deleteSlot(slot.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-current/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {selectedInfoPage === 'my-services' && (
          <>
            <section className="rounded-2xl border border-border/70 bg-card p-3 shadow-premium-sm">
              <h2 className="text-sm font-semibold text-foreground">{isRu ? 'Редактор услуг' : 'Service editor'}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isRu ? 'Добавляйте и обновляйте услуги, цену, длительность и описание.' : 'Add and update service name, price, duration, and description.'}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  placeholder={isRu ? 'Название услуги' : 'Service name'}
                  value={newService.name}
                  onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-9 text-xs"
                />
                <Input
                  type="number"
                  placeholder={isRu ? 'Цена' : 'Price'}
                  value={newService.price}
                  onChange={(e) => setNewService((prev) => ({ ...prev, price: e.target.value }))}
                  className="h-9 text-xs"
                />
                <Input
                  type="number"
                  placeholder={isRu ? 'Длительность (мин)' : 'Duration (min)'}
                  value={newService.duration}
                  onChange={(e) => setNewService((prev) => ({ ...prev, duration: e.target.value }))}
                  className="h-9 text-xs"
                />
                <Input
                  placeholder={isRu ? 'Описание' : 'Description'}
                  value={newService.description}
                  onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                  className="h-9 text-xs"
                />
              </div>

              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={addOrUpdateService}>
                  <Plus className="h-3.5 w-3.5" />
                  {editingServiceId ? (isRu ? 'Сохранить' : 'Save') : isRu ? 'Добавить услугу' : 'Add service'}
                </Button>
                {editingServiceId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingServiceId(null);
                      setNewService({ name: '', price: '', duration: '', description: '' });
                    }}
                  >
                    {isRu ? 'Отменить' : 'Cancel'}
                  </Button>
                )}
              </div>
            </section>

            <section className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="rounded-xl border border-border/70 bg-card p-2.5 shadow-premium-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-foreground">{service.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{service.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                          {formatPrice(service.price)}
                        </span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                          {service.duration} {isRu ? 'мин' : 'min'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => editService(service)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeService(service.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {selectedInfoPage !== 'my-services' && selectedInfoPage !== 'my-schedule' &&
          content.blocks.map((block, idx) => (
            <div key={idx} className="rounded-xl border border-border/70 bg-card p-3.5 shadow-premium-sm">
              <h2 className="mb-1.5 text-sm font-semibold text-foreground">{block.title}</h2>
              <p className="text-xs leading-relaxed text-muted-foreground">{block.text}</p>
            </div>
          ))}

        <button
          onClick={() => navigate('chats')}
          className="group flex w-full items-center justify-between rounded-xl border border-border/70 bg-card p-3.5 text-left shadow-premium-sm transition-all hover:border-primary/40"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{isRu ? 'Открыть чат поддержки' : 'Open support chat'}</p>
            <p className="text-xs text-muted-foreground">{isRu ? 'Перейти в раздел чатов' : 'Go to the chats section'}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
        </button>

        <section className="rounded-xl border border-border/70 bg-secondary/60 p-3">
          <div className="flex items-start gap-2">
            <Lock className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-foreground">{isRu ? 'Безопасность профиля' : 'Profile safety'}</p>
              <p className="text-[11px] text-muted-foreground">
                {isRu ? 'Рекомендуем регулярно обновлять данные и проверять настройки доступа.' : 'We recommend updating profile data and access settings regularly.'}
              </p>
            </div>
            <CircleCheckBig className="ml-auto h-4 w-4 text-emerald-500" />
          </div>
        </section>
      </main>
    </div>
  );
}
