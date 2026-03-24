'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice } from '@/lib/i18n';
import { 
  ArrowLeft, Check, Clock, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00',
];

export function BookingScreen() {
  const { 
    t, language, masters, selectedMasterId,
    bookingServiceId, bookingDate, bookingTime,
    setBookingService, setBookingDate, setBookingTime,
    confirmBooking, goBack, navigate
  } = useApp();

  const [step, setStep] = useState<'service' | 'date' | 'time' | 'confirm' | 'success'>(
    bookingServiceId ? 'date' : 'service'
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const master = useMemo(() => 
    masters.find(m => m.id === selectedMasterId), 
    [masters, selectedMasterId]
  );

  const selectedService = useMemo(() => 
    master?.services.find(s => s.id === bookingServiceId), 
    [master, bookingServiceId]
  );

  if (!master) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t('error')}</p>
      </div>
    );
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() || 7;
    const daysInMonth = lastDay.getDate();
    
    const days: (number | null)[] = [];
    
    for (let i = 1; i < startDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleServiceSelect = (serviceId: string) => {
    setBookingService(serviceId);
    setStep('date');
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      setBookingDate(date.toISOString().split('T')[0]);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingTime(time);
    setStep('confirm');
  };

  const handleConfirm = () => {
    confirmBooking();
    setStep('success');
  };

  const handleFinish = () => {
    navigate('bookings');
  };

  const isDateDisabled = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day: number) => {
    if (!bookingDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0] === bookingDate;
  };

  const monthNames = language === 'ru' 
    ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'ru' 
    ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Success screen
  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 safe-top safe-bottom">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-5 animate-scale-in">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-lg font-bold text-foreground mb-1.5 animate-slide-up">
          {t('bookingConfirmed')}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {language === 'ru' 
            ? `Ваша запись к ${master.name} подтверждена`
            : `Your appointment with ${master.name} is confirmed`
          }
        </p>

        <div className="w-full max-w-sm p-3.5 rounded-2xl bg-card border border-border mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
              <Image src={master.avatar} alt={master.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{master.name}</p>
              <p className="text-xs text-muted-foreground truncate">{selectedService?.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span className="text-xs">{bookingDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{bookingTime}</span>
            </div>
            <span className="text-sm font-bold text-primary">{formatPrice(selectedService?.price || 0)}</span>
          </div>
        </div>

        <Button
          className="w-full max-w-sm h-11 text-sm font-semibold rounded-xl animate-slide-up"
          style={{ animationDelay: '0.3s' }}
          onClick={handleFinish}
        >
          {language === 'ru' ? 'Мои записи' : 'My Bookings'}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => {
              if (step === 'service') goBack();
              else if (step === 'date') setStep('service');
              else if (step === 'time') setStep('date');
              else if (step === 'confirm') setStep('time');
            }}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{master.name}</p>
            <h1 className="text-sm font-semibold text-foreground">
              {step === 'service' && t('selectService')}
              {step === 'date' && t('selectDate')}
              {step === 'time' && t('selectTime')}
              {step === 'confirm' && t('confirmBooking')}
            </h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-1.5 px-4 pb-3">
          {['service', 'date', 'time', 'confirm'].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full transition-colors ${
                i <= ['service', 'date', 'time', 'confirm'].indexOf(step)
                  ? 'bg-primary'
                  : 'bg-secondary'
              }`} />
            </div>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="p-4 pb-28">
        {/* Service Selection */}
        {step === 'service' && (
          <div className="space-y-2.5 animate-slide-up">
            {master.services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all ${
                  bookingServiceId === service.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                    {service.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{service.description}</p>
                    )}
                    <div className="flex items-center gap-2.5 mt-1.5">
                      <span className="text-sm font-bold text-primary">{formatPrice(service.price)}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration} {t('min')}
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    bookingServiceId === service.id
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {bookingServiceId === service.id && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Date Selection */}
        {step === 'date' && (
          <div className="animate-slide-up">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-semibold text-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-1.5">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1.5">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => handleDateSelect(day)}
                      disabled={isDateDisabled(day)}
                      className={`w-full h-full rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${
                        isDateSelected(day)
                          ? 'bg-primary text-primary-foreground'
                          : isDateDisabled(day)
                          ? 'text-muted-foreground/30 cursor-not-allowed'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time Selection */}
        {step === 'time' && (
          <div className="animate-slide-up">
            <p className="text-xs text-muted-foreground mb-3">
              {language === 'ru' ? 'Выберите удобное время' : 'Select a convenient time'}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    bookingTime === time
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirm' && (
          <div className="animate-slide-up">
            <div className="p-3.5 rounded-2xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t('bookingDetails')}</h3>
              
              {/* Master Info */}
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <Image src={master.avatar} alt={master.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{master.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{master.address}</p>
                </div>
              </div>

              {/* Service */}
              <div className="py-3 border-b border-border">
                <p className="text-xs text-muted-foreground mb-0.5">{t('selectService')}</p>
                <p className="text-sm font-medium text-foreground">{selectedService?.name}</p>
                <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedService?.duration} {t('min')}
                </span>
              </div>

              {/* Date & Time */}
              <div className="py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{t('selectDate')}</p>
                    <p className="text-sm font-medium text-foreground">{bookingDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">{t('selectTime')}</p>
                    <p className="text-sm font-medium text-foreground">{bookingTime}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="pt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{language === 'ru' ? 'Итого' : 'Total'}</span>
                <span className="text-base font-bold text-primary">{formatPrice(selectedService?.price || 0)}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Button */}
      {step === 'confirm' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border safe-bottom">
          <Button
            className="w-full h-11 text-sm font-semibold rounded-xl"
            onClick={handleConfirm}
          >
            {t('confirmBooking')}
          </Button>
        </div>
      )}
    </div>
  );
}
