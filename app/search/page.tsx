'use client';

import { SearchScreen } from '@/components/screens/search-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function SearchScreenPage() {
  return (
    <ScreenRoute screen="search" canAccess={true}>
      <SearchScreen />
    </ScreenRoute>
  );
}
