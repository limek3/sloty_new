'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { ArrowLeft, Bell, Shield, HelpCircle, FileText, User, Settings, Calendar, TrendingUp, Share2, ChevronRight } from 'lucide-react';

export function InfoDetailScreen() {
  const { selectedInfoPage, language, goBack, navigate } = useApp();

  const content = useMemo(() => {
    const ru = language === 'ru';
    switch (selectedInfoPage) {
      case 'notification-settings':
        return {
          title: ru ? 'Настройки уведомлений' : 'Notification Settings',
          icon: Bell,
          blocks: [
            { title: ru ? 'Записи и напоминания' : 'Bookings & reminders', text: ru ? 'Включите пуши о предстоящих визитах, изменениях времени и подтверждениях.' : 'Turn on pushes for upcoming visits, reschedules, and confirmations.' },
            { title: ru ? 'Сообщения и отклики' : 'Messages & responses', text: ru ? 'Получайте уведомления о новых сообщениях и откликах на ваши заявки.' : 'Receive alerts about new messages and request responses.' },
          ],
        };
      case 'privacy-settings':
        return {
          title: ru ? 'Настройки приватности' : 'Privacy Settings',
          icon: Shield,
          blocks: [
            { title: ru ? 'Публичный профиль' : 'Public profile', text: ru ? 'Управляйте видимостью профиля, фото и контактной информации.' : 'Manage visibility of your profile, photos, and contact details.' },
            { title: ru ? 'Данные и безопасность' : 'Data & security', text: ru ? 'Выберите, какие данные использовать для персонализации и рекомендаций.' : 'Choose what data can be used for personalization and recommendations.' },
          ],
        };
      case 'help-support':
        return {
          title: ru ? 'Помощь и поддержка' : 'Help & Support',
          icon: HelpCircle,
          blocks: [
            { title: ru ? 'Написать в поддержку' : 'Contact support', text: ru ? 'Мы поможем с записью, платежами, чатом и любыми техническими вопросами.' : 'We can help with bookings, payments, chat, and any technical issues.' },
            { title: ru ? 'Частые вопросы' : 'FAQ', text: ru ? 'Как записаться, как создать заявку, как откликнуться и как отменить визит.' : 'How to book, create a request, respond, or cancel a visit.' },
          ],
        };
      case 'terms-conditions':
        return {
          title: ru ? 'Условия использования' : 'Terms & Conditions',
          icon: FileText,
          blocks: [
            { title: ru ? 'Платформа Sloty' : 'Sloty platform', text: ru ? 'Используя приложение, вы соглашаетесь с правилами записи, общения и публикации заявок.' : 'By using the app, you agree to the rules for bookings, communication, and request posting.' },
            { title: ru ? 'Ответственность сторон' : 'Responsibility', text: ru ? 'Мастера отвечают за качество услуг, а клиенты — за корректность заявок и посещений.' : 'Masters are responsible for service quality, clients for accurate requests and attendance.' },
          ],
        };
      case 'privacy-policy':
        return {
          title: ru ? 'Политика конфиденциальности' : 'Privacy Policy',
          icon: Shield,
          blocks: [
            { title: ru ? 'Какие данные мы храним' : 'What data we store', text: ru ? 'Контакты, историю записей, избранное, чаты и настройки интерфейса.' : 'Contacts, booking history, favorites, chats, and interface settings.' },
            { title: ru ? 'Как используются данные' : 'How data is used', text: ru ? 'Для подбора мастеров, маршрутов, уведомлений и улучшения пользовательского опыта.' : 'To suggest providers, build routes, send notifications, and improve UX.' },
          ],
        };
      case 'my-profile':
        return {
          title: ru ? 'Мой профиль' : 'My Profile',
          icon: User,
          blocks: [
            { title: ru ? 'Профиль мастера' : 'Master profile', text: ru ? 'Обновите фото, описание, адрес, специализацию и портфолио.' : 'Update photo, bio, address, specialization, and portfolio.' },
          ],
        };
      case 'my-services':
        return {
          title: ru ? 'Мои услуги' : 'My Services',
          icon: Settings,
          blocks: [
            { title: ru ? 'Управление услугами' : 'Service management', text: ru ? 'Добавляйте услуги, меняйте цены, длительность и описание.' : 'Add services, change pricing, duration, and descriptions.' },
          ],
        };
      case 'my-schedule':
        return {
          title: ru ? 'Мое расписание' : 'My Schedule',
          icon: Calendar,
          blocks: [
            { title: ru ? 'Доступное время' : 'Available time', text: ru ? 'Настраивайте рабочие часы и свободные слоты для новых записей.' : 'Adjust business hours and available slots for new bookings.' },
          ],
        };
      case 'earnings':
        return {
          title: ru ? 'Заработок' : 'Earnings',
          icon: TrendingUp,
          blocks: [
            { title: ru ? 'Статистика за месяц' : 'Monthly stats', text: ru ? 'Выручка: 45 000 ₽. Средний чек: 2 250 ₽. Повторные клиенты: 38%.' : 'Revenue: ₽45,000. Average ticket: ₽2,250. Returning clients: 38%.' },
          ],
        };
      case 'share-profile':
        return {
          title: ru ? 'Поделиться профилем' : 'Share Profile',
          icon: Share2,
          blocks: [
            { title: ru ? 'Ссылка и QR-код' : 'Link & QR code', text: ru ? 'Поделитесь профилем мастера в Telegram, соцсетях или покажите QR-код клиенту.' : 'Share your master profile in Telegram, social media, or show a QR code to a client.' },
          ],
        };
      default:
        return {
          title: ru ? 'Информация' : 'Information',
          icon: FileText,
          blocks: [{ title: ru ? 'Раздел' : 'Section', text: ru ? 'Выберите раздел из профиля или панели мастера.' : 'Choose a section from profile or dashboard.' }],
        };
    }
  }, [selectedInfoPage, language]);

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={goBack}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <content.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-foreground truncate">{content.title}</h1>
              <p className="text-xs text-muted-foreground">
                {language === 'ru' ? 'Рабочая страница раздела' : 'Working section page'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-2.5">
        {content.blocks.map((block, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-card border border-border">
            <h2 className="text-sm font-semibold text-foreground mb-1.5">{block.title}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{block.text}</p>
          </div>
        ))}

        <button
          onClick={() => navigate('chats')}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-left"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{language === 'ru' ? 'Открыть чат поддержки' : 'Open support chat'}</p>
            <p className="text-xs text-muted-foreground">{language === 'ru' ? 'Перейти в раздел чатов' : 'Go to the chats section'}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </main>
    </div>
  );
}
