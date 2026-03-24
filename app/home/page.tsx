'use client';

import { HomeScreen } from '@/components/screens/home-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function HomeScreenPage() {
  return (
    <ScreenRoute screen="home" canAccess={true}>
      <HomeScreen />
    </ScreenRoute>
  );
}
