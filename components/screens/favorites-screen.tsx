'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { MasterCard } from '@/components/cards/master-card';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { MobileAppHeader } from '@/components/ui/mobile-app-header';
import { MobileAppShell, MobileCardStack, MobileContent } from '@/components/ui/mobile-layout';
import { Heart, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FavoritesScreen() {
  const { t, language, masters, favorites, navigate } = useApp();

  const favoriteMasters = useMemo(() => 
    masters.filter(m => favorites.includes(m.id)),
    [masters, favorites]
  );

  return (
    <MobileAppShell>
      <MobileAppHeader
        title={t('favorites')}
        description={`${favoriteMasters.length} ${
          language === 'ru'
            ? favoriteMasters.length === 1
              ? 'мастер'
              : 'мастеров'
            : favoriteMasters.length === 1
              ? 'master'
              : 'masters'
        }`}
        leading={
          <button
            onClick={() => navigate('profile')}
            className="radius-chip flex h-9 w-9 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        }
      />

      <MobileContent className="py-4">
        {favoriteMasters.length > 0 ? (
          <MobileCardStack>
            {favoriteMasters.map((master) => (
              <MasterCard key={master.id} master={master} variant="horizontal" />
            ))}
          </MobileCardStack>
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
      </MobileContent>

      <BottomNav />
    </MobileAppShell>
  );
}
