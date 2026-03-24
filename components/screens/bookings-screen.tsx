'use client';

import { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice } from '@/lib/i18n';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { Calendar, Clock, MapPin, MessageCircle, ChevronLeft, History, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function BookingsScreen() {
  const {
    t, language, bookings,
    navigate, selectMaster, openChatWithMaster
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'border-primary/20 bg-primary/10 text-primary';
      case 'completed': return 'border-success/20 bg-success/10 text-success';
      case 'cancelled': return 'border-destructive/20 bg-destructive/10 text-destructive';
      default: return 'border-border bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return t('upcoming');
      case 'completed': return language === 'ru' ? 'Завершено' : 'Completed';
      case 'cancelled': return t('cancelled');
      default: return status;
    }
  };

  const handleMasterClick = (masterId: string) => {
    selectMaster(masterId);
    navigate('master-profile');
  };

  const handleChatClick = (masterId: string) => {
    openChatWithMaster(masterId);
    navigate('chat');
  };

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const renderBookingCard = (booking: typeof bookings[0]) => (
    <div key={booking.id} className="rounded-xl border border-border bg-card p-3.5">
      {/* Master Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleMasterClick(booking.masterId)}
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl"
        >
          <Image
            src={booking.masterAvatar}
            alt={booking.masterName}
            fill
            className="object-cover"
          />
        </button>
        <div className="min-w-0 flex-1">
          <button
            onClick={() => handleMasterClick(booking.masterId)}
            className="text-left text-sm font-semibold text-foreground transition-colors hover:text-primary truncate block w-full"
          >
            {booking.masterName}
          </button>
          <p className="truncate text-xs text-muted-foreground">{booking.service.name}</p>
        </div>
        <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(booking.status)}`}>
          {getStatusText(booking.status)}
        </span>
      </div>

      {/* Booking Details */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{booking.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{booking.address}</span>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-bold text-success">{formatPrice(booking.service.price)}</span>
        {booking.status === 'upcoming' && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-8 rounded-lg text-xs"
            onClick={() => handleChatClick(booking.masterId)}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {t('message')}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24 safe-top">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('profile')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold text-foreground">{t('yourBookings')}</h1>
          </div>

          {/* Tabs */}
          <div className="mt-3 flex items-center rounded-xl border border-border bg-muted/50 p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <CalendarCheck className="h-3.5 w-3.5" />
                {t('upcoming')} ({upcomingBookings.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                activeTab === 'past'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                {t('past')} ({pastBookings.length})
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4">
        {displayBookings.length > 0 ? (
          <div className="space-y-2.5">
            {displayBookings.map(renderBookingCard)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">{t('noBookings')}</h3>
            <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
              {language === 'ru'
                ? 'Найдите мастера и запишитесь на услугу'
                : 'Find a master and book a service'}
            </p>
            <Button 
              onClick={() => navigate('search')} 
              className="mt-4 h-9 rounded-xl text-xs"
            >
              {t('findMaster')}
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
