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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

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
      <div className="min-h-screen flex items-center justify-center bg-surface-2">
        <p className="text-[14px] text-muted-foreground">{t('error')}</p>
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
    <div className="min-h-screen bg-surface-2 safe-top">
      {/* Header */}
      <div className="sticky top-0 z-30 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between rounded-full bg-card/95 px-1.5 py-1.5 shadow-elevation-nav backdrop-blur-xl">
            <button
              onClick={goBack}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-surface-2 text-foreground transition hover:bg-card"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-surface-2 text-muted-foreground transition hover:bg-card"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => toggleFavorite(master.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isFavorite
                    ? 'border-rose-200 bg-rose-500 text-white shadow-premium-sm'
                    : 'border-border/70 bg-surface-2 text-muted-foreground hover:bg-card'
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
          <div className="rounded-[22px] border border-border/70 bg-card p-3 shadow-elevation-nav">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[16px] bg-surface-2">
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
                  <h1 className="truncate text-[14px] font-bold tracking-tight text-foreground">
                    {master.name}
                  </h1>
                  {master.verified && (
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                  )}
                </div>

                <p className="mt-0.5 text-[15px] text-muted-foreground">
                  {master.specialization}
                </p>

                {/* Stats */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px]">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-[#f4b63d] text-[#f4b63d]" />
                    <span className="font-semibold text-foreground">{master.rating}</span>
                    <span className="text-muted-foreground">({master.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{formatDistance(master.distance, language)}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="shrink-0 rounded-[14px] bg-emerald-50 px-2.5 py-2 text-right">
                <span className="text-[15px] text-muted-foreground">{t('from')}</span>
                <p className="text-[14px] font-bold text-emerald-600">
                  {formatPrice(master.priceFrom)}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-10 rounded-[14px] gap-1.5 border-border/70 bg-surface-2 text-[15px] shadow-none hover:bg-card"
                onClick={handleChat}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t('message')}
              </Button>

              <Button
                variant="outline"
                className="h-10 rounded-[14px] gap-1.5 border-border/70 bg-surface-2 text-[15px] shadow-none hover:bg-card"
                onClick={handleBuildRoute}
              >
                <Navigation className="h-3.5 w-3.5" />
                {t('buildRoute')}
              </Button>
            </div>

            {/* Location */}
            <div className="mt-3 rounded-[14px] border border-border/70 bg-surface-1 p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium text-foreground">
                    {master.address}
                  </p>
                  <p className="mt-0.5 text-[15px] text-muted-foreground">
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
            <TabsList className="grid w-full grid-cols-4 h-10 rounded-[14px] bg-surface-3 p-1">
              <TabsTrigger value="services" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium-sm">
                {t('services')}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium-sm">
                {t('reviews')}
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium-sm">
                {t('portfolio')}
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-[10px] text-[14px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-premium-sm">
                {t('about')}
              </TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-3 space-y-2 pb-32">
              {master.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleBook(service.id)}
                  className="group w-full rounded-[16px] border border-border/70 bg-card p-2.5 text-left shadow-elevation-card transition hover:-translate-y-[0.5px] hover:shadow-elevation-nav"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className="mt-0.5 line-clamp-2 text-[14px] leading-[1.4] text-muted-foreground">
                          {service.description}
                        </p>
                      )}

                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-[14px] font-bold text-emerald-600">
                          {formatPrice(service.price)}
                        </span>

                        <span className="flex items-center gap-0.5 text-[14px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {service.duration} {t('min')}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                  </div>
                </button>
              ))}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-3 space-y-2 pb-32">
              {master.reviews.length > 0 ? (
                master.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-[16px] border border-border/70 bg-card p-2.5 shadow-elevation-card"
                  >
                    <div className="flex items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[14px] font-bold text-foreground">
                          {review.authorName.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-medium text-foreground">
                            {review.authorName}
                          </p>
                          <p className="text-[15px] text-muted-foreground">{review.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? 'fill-[#f4b63d] text-[#f4b63d]'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-[14px] leading-[1.5] text-foreground">{review.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-[14px] text-muted-foreground">
                    {isRu ? 'Отзывов пока нет' : 'No reviews yet'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="mt-3 pb-32">
              {master.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {master.portfolio.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-[14px] border border-border/70 bg-surface-2 shadow-elevation-card"
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
                <div className="text-center py-10">
                  <p className="text-[14px] text-muted-foreground">
                    {isRu ? 'Портфолио пока пусто' : 'No portfolio yet'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="mt-3 pb-32">
              <div className="rounded-[16px] border border-border/70 bg-card p-2.5 shadow-elevation-card">
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{t('about')}</h3>
                <p className="text-[14px] leading-[1.5] text-foreground">{master.about}</p>
              </div>

              {master.tags.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-[15px] font-semibold text-foreground mb-2">
                    {isRu ? 'Специализация' : 'Specialization'}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {master.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-surface-1 px-2.5 py-1 text-[14px] text-foreground"
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
          <div className="rounded-[18px] bg-card/95 p-2 shadow-elevation-sticky backdrop-blur-xl border border-border/70">
            <Button
              className="w-full h-11 text-[14px] font-semibold rounded-[14px] bg-emerald-500 text-white shadow-primary-glow hover:bg-emerald-600"
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
