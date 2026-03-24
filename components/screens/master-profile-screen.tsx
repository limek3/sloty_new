'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice, formatDistance } from '@/lib/i18n';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  BadgeCheck,
  MessageCircle,
  Navigation,
  ChevronRight,
  ImagePlus,
  MessageSquareOff,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { StateCard } from '@/components/ui/state-card';

export function MasterProfileScreen() {
  const {
    t,
    language,
    masters,
    selectedMasterId,
    favorites,
    goBack,
    navigate,
    toggleFavorite,
    startBooking,
    openChatWithMaster,
  } = useApp();

  const [activeTab, setActiveTab] = useState('services');

  const master = useMemo(
    () => masters.find((m) => m.id === selectedMasterId),
    [masters, selectedMasterId]
  );

  const isFavorite = master ? favorites.includes(master.id) : false;
  const isRu = language === 'ru';

  if (!master) {
    return (
      <div className="min-h-screen bg-[#f6f6f3] p-4">
        <StateCard
          tone="error"
          icon={AlertTriangle}
          title={isRu ? 'Профиль не найден' : 'Profile not found'}
          description={isRu ? 'Вернитесь назад и попробуйте открыть другого мастера.' : 'Go back and open another master profile.'}
          primaryAction={{ label: isRu ? 'Назад' : 'Go back', onClick: goBack }}
          secondaryAction={{ label: isRu ? 'К поиску' : 'Open search', onClick: () => navigate('search') }}
          className="mx-auto mt-16 max-w-md"
        />
      </div>
    );
  }

  const handleBook = (serviceId?: string) => {
    startBooking(master.id, serviceId);
    navigate('booking');
  };

  const handleChat = () => {
    openChatWithMaster(master.id);
    navigate('chat');
  };

  const handleBuildRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${master.lat},${master.lng}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: master.name,
          text: `${master.specialization} - ${formatPrice(master.priceFrom)}`,
          url: window.location.href,
        });
      } catch {
        // ignore cancel
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f3] safe-top">
      {/* Header */}
      <div className="sticky top-0 z-30 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between rounded-full bg-card/95 px-1.5 py-1.5 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <button
              onClick={goBack}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-[#f7f7f5] text-slate-700 transition hover:bg-card"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-[#f7f7f5] text-slate-600 transition hover:bg-card"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => toggleFavorite(master.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isFavorite
                    ? 'border-rose-200 bg-rose-500 text-white shadow-[0_6px_14px_rgba(244,63,94,0.25)]'
                    : 'border-border/70 bg-[#f7f7f5] text-slate-600 hover:bg-card'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border/70 bg-card p-3 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[16px] bg-slate-100">
                <Image
                  src={master.avatar}
                  alt={master.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-[14px] font-bold tracking-tight text-slate-900">
                    {master.name}
                  </h1>
                  {master.verified && (
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                  )}
                </div>

                <p className="mt-0.5 text-[15px] text-slate-500">
                  {master.specialization}
                </p>

                {/* Stats */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px]">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-[#f4b63d] text-[#f4b63d]" />
                    <span className="font-semibold text-slate-900">{master.rating}</span>
                    <span className="text-slate-400">({master.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-slate-500">
                    <MapPin className="h-3 w-3" />
                    <span>{formatDistance(master.distance, language)}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="shrink-0 rounded-[14px] bg-emerald-50 px-2.5 py-2 text-right">
                <span className="text-[15px] text-slate-500">{t('from')}</span>
                <p className="text-[14px] font-bold text-emerald-600">
                  {formatPrice(master.priceFrom)}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-10 rounded-[14px] gap-1.5 border-border/70 bg-[#f7f7f5] text-[15px] shadow-none hover:bg-card"
                onClick={handleChat}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t('message')}
              </Button>

              <Button
                variant="outline"
                className="h-10 rounded-[14px] gap-1.5 border-border/70 bg-[#f7f7f5] text-[15px] shadow-none hover:bg-card"
                onClick={handleBuildRoute}
              >
                <Navigation className="h-3.5 w-3.5" />
                {t('buildRoute')}
              </Button>
            </div>

            {/* Location */}
            <div className="mt-3 rounded-[14px] border border-border/70 bg-[#fafaf8] p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium text-slate-900">
                    {master.address}
                  </p>
                  <p className="mt-0.5 text-[15px] text-slate-500">
                    {formatDistance(master.distance, language)} {isRu ? 'от вас' : 'from you'}
                  </p>
                </div>

                <button
                  onClick={handleBuildRoute}
                  className="shrink-0 rounded-[10px] bg-emerald-50 px-2.5 py-1.5 text-[14px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  {isRu ? 'Маршрут' : 'Route'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-3 mt-3">
        <div className="mx-auto max-w-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 h-10 rounded-[14px] bg-[#f0f0ec] p-1">
              <TabsTrigger value="services" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                {t('services')}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                {t('reviews')}
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                {t('portfolio')}
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                {t('about')}
              </TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-3 space-y-2 pb-32">
              {master.services.length > 0 ? (
                master.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleBook(service.id)}
                    className="group w-full rounded-[16px] border border-border/70 bg-card p-2.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {service.name}
                        </h3>

                        {service.description && (
                          <p className="mt-0.5 line-clamp-2 text-[14px] leading-[1.4] text-slate-500">
                            {service.description}
                          </p>
                        )}

                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <span className="text-[14px] font-bold text-emerald-600">
                            {formatPrice(service.price)}
                          </span>

                          <span className="flex items-center gap-0.5 text-[14px] text-slate-500">
                            <Clock className="h-3 w-3" />
                            {service.duration} {t('min')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </button>
                ))
              ) : (
                <StateCard
                  icon={Clock}
                  title={isRu ? 'Услуги пока не добавлены' : 'No services yet'}
                  description={
                    isRu
                      ? 'Пока нельзя записаться. Попробуйте выбрать другого мастера.'
                      : 'Booking is unavailable yet. Try another master.'
                  }
                  primaryAction={{ label: isRu ? 'Найти другого мастера' : 'Find another master', onClick: () => navigate('search') }}
                  secondaryAction={{ label: isRu ? 'Задать вопрос в чате' : 'Ask in chat', onClick: handleChat }}
                />
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-3 space-y-2 pb-32">
              {master.reviews.length > 0 ? (
                master.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-[16px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[14px] font-bold text-slate-700">
                          {review.authorName.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-medium text-slate-900">
                            {review.authorName}
                          </p>
                          <p className="text-[15px] text-slate-400">{review.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? 'fill-[#f4b63d] text-[#f4b63d]'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-[14px] leading-[1.5] text-slate-700">{review.text}</p>
                  </div>
                ))
              ) : (
                <StateCard
                  icon={MessageSquareOff}
                  title={isRu ? 'Отзывов пока нет' : 'No reviews yet'}
                  description={
                    isRu
                      ? 'Вы можете уточнить детали у мастера в чате перед записью.'
                      : 'You can ask the master in chat before booking.'
                  }
                  primaryAction={{ label: isRu ? 'Открыть чат' : 'Open chat', onClick: handleChat }}
                  secondaryAction={{ label: isRu ? 'Перейти к услугам' : 'View services', onClick: () => setActiveTab('services') }}
                />
              )}
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="mt-3 pb-32">
              {master.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {master.portfolio.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-[14px] border border-border/70 bg-slate-100 shadow-[0_6px_20px_rgba(15,23,42,0.04)]"
                    >
                      <Image
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <StateCard
                  icon={ImagePlus}
                  title={isRu ? 'Портфолио пока пусто' : 'No portfolio yet'}
                  description={
                    isRu
                      ? 'Посмотрите услуги и рейтинг, чтобы выбрать подходящего мастера.'
                      : 'Check services and rating to choose the right master.'
                  }
                  primaryAction={{ label: isRu ? 'Смотреть услуги' : 'View services', onClick: () => setActiveTab('services') }}
                  secondaryAction={{ label: isRu ? 'Назад к поиску' : 'Back to search', onClick: () => navigate('search') }}
                />
              )}
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="mt-3 pb-32">
              <div className="rounded-[16px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{t('about')}</h3>
                <p className="text-[14px] leading-[1.5] text-slate-700">{master.about}</p>
              </div>

              {master.tags.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-2">
                    {isRu ? 'Специализация' : 'Specialization'}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {master.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-[#fafaf8] px-2.5 py-1 text-[14px] text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sticky Book Button */}
      <div className="fixed bottom-3 left-0 right-0 z-40 px-3 safe-bottom">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[18px] bg-card/95 p-2 shadow-[0_-8px_26px_rgba(15,23,42,0.08)] backdrop-blur-xl border border-border/70">
            <Button
              className="w-full h-11 text-[14px] font-semibold rounded-[14px] bg-emerald-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
              onClick={() => handleBook()}
            >
              {t('bookNow')} • {t('from')} {formatPrice(master.priceFrom)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
