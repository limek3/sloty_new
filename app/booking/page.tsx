'use client';

import { BookingScreen } from '@/components/screens/booking-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';
import { useApp } from '@/lib/app-context';

export default function BookingScreenPage() {
  const { selectedMasterId } = useApp();

  return (
    <ScreenRoute screen="booking" canAccess={Boolean(selectedMasterId)} fallbackHref="/home">
      <BookingScreen />
    </ScreenRoute>
  );
}
