'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/app-context';
import { categories } from '@/lib/mock-data';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { MobileAppHeader } from '@/components/ui/mobile-app-header';
import {
  Search,
  X,
  SlidersHorizontal,
  Map,
  ArrowUpDown,
  Grid2X2,
  List,
  Frown,
  Heart,
  Star,
  BadgeCheck,
  MapPin,
  ChevronRight,
  Clock3,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

type Master = {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  distance: number;
  priceFrom: number;
  verified?: boolean;
};

function formatDistance(distance: number, language: string) {
  if (distance < 1) {
    return language === 'ru'
      ? `${Math.round(distance * 1000)} м`
      : `${Math.round(distance * 1000)} m`;
  }
  return language === 'ru'
    ? `${distance.toFixed(1).replace('.0', '')} км`
    : `${distance.toFixed(1).replace('.0', '')} km`;
}

function formatPrice(price: number, language: string) {
  return language === 'ru'
    ? `от ${price.toLocaleString('ru-RU')} ₽`
    : `from ${price.toLocaleString('en-US')} ₽`;
}

function SearchMasterCard({
  master,
  language,
  isFavorite,
  onToggleFavorite,
  onClick,
}: {
  master: Master;
  language: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}) {
  const isRu = language === 'ru';

  return (
    <button
      onClick={onClick}
      className="group list-card density-list w-full transition-all hover:-translate-y-[0.5px] hover:shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-start gap-2.5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-slate-100">
          <Image
            src={master.avatar}
            alt={master.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="truncate text-[14px] font-semibold leading-tight text-slate-900">
                  {master.name}
                </p>
                {master.verified && (
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                )}
              </div>

              <p className="mt-0.5 truncate text-[14px] text-slate-500">
                {master.specialization}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                isFavorite
                  ? 'border-rose-200 bg-rose-500 text-white shadow-[0_6px_14px_rgba(244,63,94,0.25)]'
                  : 'border-border/70 bg-[#f7f7f5] text-slate-400 hover:text-slate-700'
              }`}
              aria-label={isRu ? 'Избранное' : 'Favorite'}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <div className="inline-flex items-center gap-0.5 rounded-full bg-[#fff3e7] px-2 py-0.5 text-[14px] text-[#b86419]">
              <Star className="h-3 w-3 fill-current" />
              <span className="font-semibold">{master.rating}</span>
              <span className="text-[#d1945f]">({master.reviewCount})</span>
            </div>

            <div className="inline-flex items-center gap-0.5 rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[14px] text-slate-600">
              <MapPin className="h-3 w-3" />
              <span>{formatDistance(master.distance, language)}</span>
            </div>

            <div className="inline-flex items-center gap-0.5 rounded-full bg-[#ebfbf3] px-2 py-0.5 text-[14px] text-emerald-700">
              <Clock3 className="h-3 w-3" />
              <span>{isRu ? 'Сегодня' : 'Today'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 border-t border-border/70 pt-2">
        <div className="flex min-w-0 flex-1 flex-wrap gap-1">
          {master.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-[#fafaf8] px-2 py-1 text-[15px] text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="shrink-0 rounded-full bg-[#ebfbf3] px-2 py-1 text-[15px] font-semibold text-emerald-700">
          {formatPrice(master.priceFrom, language)}
        </div>

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f7f7f5] text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </button>
  );
}

function SearchMasterGridCard({
  master,
  language,
  isFavorite,
  onToggleFavorite,
  onClick,
}: {
  master: Master;
  language: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full radius-card border border-border/70 bg-card p-2 text-left shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-[0.5px]"
    >
      <div className="relative overflow-hidden rounded-[12px]">
        <div className="relative aspect-square w-full bg-slate-100">
          <Image
            src={master.avatar}
            alt={master.name}
            fill
            className="object-cover"
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-card/90 text-slate-500'
          }`}
        >
          <Heart className={`h-3 w-3 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-1">
          <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-slate-900">
            {master.name}
          </p>
          {master.verified && (
            <BadgeCheck className="h-3 w-3 shrink-0 text-emerald-500" />
          )}
        </div>

        <p className="mt-0.5 truncate text-[15px] text-slate-500">
          {master.specialization}
        </p>

        <div className="mt-1.5 flex items-center justify-between gap-1.5">
          <div className="inline-flex items-center gap-0.5 rounded-full bg-[#fff3e7] px-1.5 py-0.5 text-[15px] text-[#b86419]">
            <Star className="h-2.5 w-2.5 fill-current" />
            <span className="font-semibold">{master.rating}</span>
          </div>

          <div className="rounded-full bg-[#ebfbf3] px-2 py-0.5 text-[14px] font-semibold text-emerald-700">
            {formatPrice(master.priceFrom, language)}
          </div>
        </div>
      </div>
    </button>
  );
}

export function SearchScreen() {
  const {
    language,
    masters,
    favorites,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    navigate,
    selectMaster,
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);

  const isRu = language === 'ru';

  const filteredMasters = useMemo(() => {
    let result = [...masters];
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.specialization.toLowerCase().includes(query) ||
          m.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory);
      if (category) {
        const categoryName = isRu
          ? category.nameRu.toLowerCase()
          : category.name.toLowerCase();

        result = result.filter(
          (m) =>
            m.specialization.toLowerCase().includes(categoryName) ||
            m.tags.some((tag) => tag.toLowerCase().includes(categoryName)),
        );
      }
    }

    switch (sortBy) {
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
    }

    return result;
  }, [masters, searchQuery, selectedCategory, sortBy, isRu]);

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  const clearAll = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleMasterClick = (masterId: string) => {
    selectMaster(masterId);
    navigate('master-profile');
  };

  const categoryPlaceholder = isRu ? 'Категория' : 'Category';
  const allCategoriesLabel = isRu ? 'Все категории' : 'All categories';

  const sortLabelMap = {
    distance: isRu ? 'Ближе' : 'Nearest',
    rating: isRu ? 'Рейтинг' : 'Top rated',
    price: isRu ? 'Дешевле' : 'Price',
  } as const;

  return (
    <div className="app-shell">
      <MobileAppHeader>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('map')}
                className="radius-card flex h-10 w-10 shrink-0 items-center justify-center border border-border/70 bg-[#f7f7f5] text-emerald-600 transition hover:bg-emerald-50"
                aria-label={isRu ? 'Открыть карту' : 'Open map'}
              >
                <Map className="h-4 w-4" />
              </button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRu ? 'Поиск мастеров, услуг...' : 'Search masters, services...'}
                  className="radius-card h-10 w-full border border-border/70 bg-[#f7f7f5] pl-9 pr-8 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-200 focus:bg-card"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-card text-slate-400 shadow-sm"
                    aria-label={isRu ? 'Очистить' : 'Clear'}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className={`radius-card flex h-10 w-10 shrink-0 items-center justify-center border transition ${
                  showFilters
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                    : 'border-border/70 bg-[#f7f7f5] text-slate-500'
                }`}
                aria-label={isRu ? 'Фильтры' : 'Filters'}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
              <Select
                value={selectedCategory ?? 'all'}
                onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
              >
                <SelectTrigger className="h-9 radius-chip border-border/70 bg-[#fafaf8] px-3 text-[15px] shadow-none">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate font-medium text-slate-800">
                      {selectedCategoryData
                        ? isRu
                          ? selectedCategoryData.nameRu
                          : selectedCategoryData.name
                        : categoryPlaceholder}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{allCategoriesLabel}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {isRu ? category.nameRu : category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showFilters && (
              <div className="mt-2 radius-card border border-border/70 bg-[#fafaf8] p-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as typeof sortBy)}
                  >
                    <SelectTrigger className="h-9 radius-chip border-border/70 bg-card px-3 text-[15px] shadow-none">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate font-medium text-slate-800">
                          {sortLabelMap[sortBy]}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">
                        {isRu ? 'По рейтингу' : 'Top rated'}
                      </SelectItem>
                      <SelectItem value="distance">
                        {isRu ? 'Сначала ближе' : 'Nearest first'}
                      </SelectItem>
                      <SelectItem value="price">
                        {isRu ? 'Сначала дешевле' : 'Lowest price'}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`radius-chip flex h-9 flex-1 items-center justify-center gap-1.5 border text-[15px] font-medium transition ${
                        viewMode === 'list'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-border/70 bg-card text-slate-700'
                      }`}
                    >
                      <List className="h-3.5 w-3.5" />
                      {isRu ? 'Список' : 'List'}
                    </button>

                    <button
                      onClick={() => setViewMode('grid')}
                      className={`radius-chip flex h-9 flex-1 items-center justify-center gap-1.5 border text-[15px] font-medium transition ${
                        viewMode === 'grid'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-border/70 bg-card text-slate-700'
                      }`}
                    >
                      <Grid2X2 className="h-3.5 w-3.5" />
                      {isRu ? 'Сетка' : 'Grid'}
                    </button>
                  </div>
                </div>
              </div>
            )}
      </MobileAppHeader>

      <main className="app-content pt-3">
        <div className="mb-2.5 flex items-center gap-1.5">
          <div className="inline-flex rounded-full border border-border/70 bg-card px-2 py-1 text-[14px] font-medium text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
            {isRu ? 'Найдено' : 'Found'}: <span className="ml-0.5 font-semibold">{filteredMasters.length}</span>
          </div>

          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearAll}
              className="inline-flex rounded-full border border-border/70 bg-card px-2 py-1 text-[14px] font-medium text-slate-600"
            >
              {isRu ? 'Сбросить' : 'Reset'}
            </button>
          )}
        </div>

        {filteredMasters.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[18px] border border-border/70 bg-card px-5 py-10 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f5f5f2]">
              <Frown className="h-6 w-6 text-slate-400" />
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-slate-900">
              {isRu ? 'Ничего не найдено' : 'No results found'}
            </h3>

            <p className="mt-1.5 max-w-xs text-[14px] leading-[1.4] text-slate-500">
              {isRu
                ? 'Попробуйте изменить запрос или выбрать другую категорию.'
                : 'Try adjusting your query or selecting another category.'}
            </p>

            <button
              onClick={clearAll}
              className="mt-4 rounded-[12px] bg-emerald-500 px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition hover:bg-emerald-600"
            >
              {isRu ? 'Сбросить фильтры' : 'Clear filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredMasters.map((master) => (
              <SearchMasterGridCard
                key={master.id}
                master={master}
                language={language}
                isFavorite={favorites.includes(master.id)}
                onToggleFavorite={() => toggleFavorite(master.id)}
                onClick={() => handleMasterClick(master.id)}
              />
            ))}
          </div>
        ) : (
          <div className="stack-card">
            {filteredMasters.map((master) => (
              <SearchMasterCard
                key={master.id}
                master={master}
                language={language}
                isFavorite={favorites.includes(master.id)}
                onToggleFavorite={() => toggleFavorite(master.id)}
                onClick={() => handleMasterClick(master.id)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
