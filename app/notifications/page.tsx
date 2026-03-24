'use client';

import { NotificationsScreen } from '@/components/screens/notifications-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function NotificationsScreenPage() {
  return (
    <ScreenRoute screen="notifications" canAccess={true}>
      <NotificationsScreen />
    </ScreenRoute>
  );
}
