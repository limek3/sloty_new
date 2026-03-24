'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/lib/app-context';
import { formatPrice, formatDistance } from '@/lib/i18n';
import { BottomNav } from '@/components/navigation/bottom-nav';
import {
  Search,
  X,
  Navigation,
  Star,
  MapPin,
  ExternalLink,
  MessageCircle,
  Calendar,
  Heart,
  BadgeCheck,
  LocateFixed,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import { YandexMasterMap } from '@/components/map/yandex-master-map';

type FilterKey = 'all' | 'nearby' | 'top' | 'favorites';

export function MapScreen() {
  const {
    t,
    language,
    masters,
    favorites,
    toggleFavorite,
    navigate,
    selectMaster,
    startBooking,
    openChatWithMaster,
  } = useApp();

  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [showRouting, setShowRouting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [recenterSignal, setRecenterSignal] = useState(0);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  const isRu = language === 'ru';

  const filterTabs = useMemo(
    () => [
      { key: 'all' as const, label: isRu ? 'Все' : 'All' },
      { key: 'nearby' as const, label: isRu ? 'Рядом' : 'Nearby' },
      { key: 'top' as const, label: isRu ? 'Топ' : 'Top' },
      { key: 'favorites' as const, label: isRu ? 'Избранные' : 'Favorites' },
    ],
    [isRu]
  );

  const normalizedMasters = useMemo(() => {
    return masters.filter(
      (m) =>
        typeof m.lat === 'number' &&
        typeof m.lng === 'number' &&
        Number.isFinite(m.lat) &&
        Number.isFinite(m.lng)
    );
  }, [masters]);

  const filteredMasters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return normalizedMasters.filter((master) => {
      const matchesSearch =
        !q ||
        master.name.toLowerCase().includes(q) ||
        master.specialization?.toLowerCase().includes(q) ||
        master.address?.toLowerCase().includes(q);

      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'nearby'
            ? master.distance <= 3
            : activeFilter === 'top'
              ? master.rating >= 4.8
              : favorites.includes(master.id);

      return matchesSearch && matchesFilter;
    });
  }, [normalizedMasters, searchQuery, activeFilter, favorites]);

  const selectedMaster = useMemo(
    () => normalizedMasters.find((m) => m.id === selectedMarkerId) ?? null,
    [normalizedMasters, selectedMarkerId]
  );

  const isFavorite = selectedMaster ? favorites.includes(selectedMaster.id) : false;

  const handleMarkerClick = (masterId: string) => {
    setSelectedMarkerId(masterId);
    setShowRouting(false);
  };

  const handleBuildRoute = () => {
    setShowRouting(true);
  };

  const handleOpenProfile = () => {
    if (!selectedMaster) return;
    selectMaster(selectedMaster.id);
    navigate('master-profile');
  };

  const handleBooking = () => {
    if (!selectedMaster) return;
    startBooking(selectedMaster.id);
    navigate('booking');
  };

  const handleChat = () => {
    if (!selectedMaster) return;
    openChatWithMaster(selectedMaster.id);
    navigate('chat');
  };

  const handleOpenInMaps = () => {
    if (!selectedMaster) return;
    const destination = `${selectedMaster.lat},${selectedMaster.lng}`;
    window.open(
      `https://yandex.ru/maps/?rtext=${userCoords ? `${userCoords[0]},${userCoords[1]}~` : ''}${destination}&rtt=pd`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <YandexMasterMap
          masters={filteredMasters.map((m) => ({
            id: m.id,
            name: m.name,
            avatar: m.avatar,
            rating: m.rating,
            lat: m.lat,
            lng: m.lng,
            address: m.address,
          }))}
          selectedMarkerId={selectedMarkerId}
          onMarkerClick={handleMarkerClick}
          showRouting={showRouting}
          recenterSignal={recenterSignal}
          onUserLocationChange={setUserCoords}
        />
      </div>

      <div className="absolute inset-x-0 top-0 z-[1000] px-3 pt-3 safe-top">
        <div className="rounded-[18px] border border-black/5 bg-white/95 p-2 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="h-10 w-full rounded-[12px] border border-black/6 bg-[#f7f7f5] pl-9 pr-9 text-[10px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-200 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-black/6 bg-[#f7f7f5] transition hover:bg-white">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
            </button>

            {filterTabs.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`h-8 shrink-0 rounded-[10px] px-3 text-[9px] font-medium transition-all ${
                    active
                      ? 'bg-emerald-500 text-white shadow-[0_8px_18px_rgba(16,185,129,0.22)]'
                      : 'border border-black/6 bg-[#f7f7f5] text-slate-700 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            <button
              onClick={() => setRecenterSignal((v) => v + 1)}
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-black/6 bg-[#f7f7f5] transition hover:bg-white"
              aria-label={isRu ? 'Моё местоположение' : 'My location'}
            >
              <LocateFixed className="h-4 w-4 text-emerald-600" />
            </button>
          </div>
        </div>

        <div className="mt-2 inline-flex rounded-full border border-black/6 bg-white/95 px-2.5 py-1 text-[9px] font-medium text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.05)] backdrop-blur-xl">
          {isRu
            ? `Найдено мастеров: ${filteredMasters.length}`
            : `Found masters: ${filteredMasters.length}`}
        </div>
      </div>

      <Sheet
        open={!!selectedMaster}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMarkerId(null);
            setShowRouting(false);
          }
        }}
      >
        <SheetContent
          side="bottom"
          className="z-[1100] rounded-t-[22px] border-none bg-white/97 px-0 pb-24 shadow-[0_-16px_40px_rgba(0,0,0,0.10)] backdrop-blur-2xl"
        >
          {selectedMaster && (
            <div className="px-4">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />

              <SheetHeader className="mb-3 text-left">
                <div className="flex items-start gap-2.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px] ring-1 ring-black/5">
                    <Image
                      src={selectedMaster.avatar}
                      alt={selectedMaster.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <SheetTitle className="truncate text-[13px] font-bold tracking-tight text-slate-900">
                        {selectedMaster.name}
                      </SheetTitle>
                      {selectedMaster.verified && (
                        <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                      )}
                    </div>

                    <p className="truncate text-[9px] text-slate-500">
                      {selectedMaster.specialization}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-0.5 text-[9px]">
                        <Star className="h-3 w-3 fill-[#f4b63d] text-[#f4b63d]" />
                        <span className="font-semibold text-slate-900">{selectedMaster.rating}</span>
                        <span className="text-slate-400">({selectedMaster.reviewCount})</span>
                      </div>

                      <div className="flex items-center gap-0.5 text-[9px] text-slate-500">
                        <MapPin className="h-3 w-3" />
                        <span>{formatDistance(selectedMaster.distance, language)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(selectedMaster.id)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] transition ${
                      isFavorite
                        ? 'bg-rose-50 text-rose-500'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </SheetHeader>

              <div className="mb-3 grid grid-cols-2 gap-2">
                <div className="rounded-[14px] border border-black/6 bg-[#fafaf8] p-2.5">
                  <p className="mb-0.5 text-[8px] text-slate-500">{t('from')}</p>
                  <p className="text-[13px] font-bold text-emerald-600">
                    {formatPrice(selectedMaster.priceFrom)}
                  </p>
                </div>

                <div className="rounded-[14px] border border-black/6 bg-[#fafaf8] p-2.5">
                  <p className="mb-0.5 text-[8px] text-slate-500">
                    {isRu ? 'Адрес' : 'Address'}
                  </p>
                  <p className="truncate text-[10px] font-medium text-slate-900">
                    {selectedMaster.address}
                  </p>
                </div>
              </div>

              {showRouting && (
                <div className="mb-3 flex items-center gap-2.5 rounded-[14px] border border-emerald-100 bg-emerald-50 p-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white text-emerald-600 shadow-sm">
                    <Navigation className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-slate-900">
                      {isRu ? 'Маршрут построен' : 'Route built'}
                    </p>
                    <p className="text-[8px] text-slate-500">
                      {isRu ? 'Пешеходный маршрут на карте' : 'Walking route on the map'}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenInMaps}
                    className="h-8 rounded-[10px] border-black/6 bg-white px-2.5 text-[9px]"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    {t('openInMaps')}
                  </Button>
                </div>
              )}

              <div className="mb-3 grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="h-10 rounded-[12px] border-black/6 bg-white text-[9px]"
                  onClick={handleBuildRoute}
                >
                  <Navigation className="mr-1.5 h-3.5 w-3.5" />
                  {t('buildRoute')}
                </Button>

                <Button
                  variant="outline"
                  className="h-10 rounded-[12px] border-black/6 bg-white text-[9px]"
                  onClick={handleChat}
                >
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  {t('message')}
                </Button>

                <Button
                  variant="outline"
                  className="h-10 rounded-[12px] border-black/6 bg-white text-[9px]"
                  onClick={handleOpenProfile}
                >
                  {isRu ? 'Профиль' : 'Profile'}
                </Button>
              </div>

              <Button
                className="h-11 w-full rounded-[14px] bg-emerald-500 text-[11px] font-semibold text-white shadow-[0_12px_26px_rgba(16,185,129,0.25)] hover:bg-emerald-600"
                onClick={handleBooking}
              >
                <Calendar className="mr-1.5 h-4 w-4" />
                {t('bookNow')}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <BottomNav />
    </div>
  );
}
