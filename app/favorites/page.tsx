'use client';

import { FavoritesScreen } from '@/components/screens/favorites-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function FavoritesScreenPage() {
  return (
    <ScreenRoute screen="favorites" canAccess={true}>
      <FavoritesScreen />
    </ScreenRoute>
  );
}
