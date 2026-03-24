'use client';

import { SplashScreen } from '@/components/screens/splash-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function SplashScreenPage() {
  return (
    <ScreenRoute screen="splash" canAccess={true}>
      <SplashScreen />
    </ScreenRoute>
  );
}
