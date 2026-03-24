'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { MasterCard } from '@/components/cards/master-card';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { Heart, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FavoritesScreen() {
  const { t, language, masters, favorites, navigate } = useApp();

  const favoriteMasters = useMemo(() => 
    masters.filter(m => favorites.includes(m.id)),
    [masters, favorites]
  );

  return (
    <div className="min-h-screen bg-background pb-24 safe-top">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('profile')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground">{t('favorites')}</h1>
              <p className="text-xs text-muted-foreground">
                {favoriteMasters.length} {language === 'ru' 
                  ? (favoriteMasters.length === 1 ? 'мастер' : 'мастеров')
                  : (favoriteMasters.length === 1 ? 'master' : 'masters')
                }
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4">
        {favoriteMasters.length > 0 ? (
          <div className="space-y-2.5">
            {favoriteMasters.map((master) => (
              <MasterCard key={master.id} master={master} variant="horizontal" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{t('noFavorites')}</h3>
            <p className="text-xs text-muted-foreground max-w-xs mb-4">{t('exploreMasters')}</p>
            <Button onClick={() => navigate('search')} className="h-9 rounded-xl text-xs">
              {t('findMaster')}
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
