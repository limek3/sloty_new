'use client';

import { BookingsScreen } from '@/components/screens/bookings-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function BookingsScreenPage() {
  return (
    <ScreenRoute screen="bookings" canAccess={true}>
      <BookingsScreen />
    </ScreenRoute>
  );
}
