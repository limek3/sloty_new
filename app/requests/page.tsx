'use client';

import { RequestsScreen } from '@/components/screens/requests-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function RequestsScreenPage() {
  return (
    <ScreenRoute screen="requests" canAccess={true}>
      <RequestsScreen />
    </ScreenRoute>
  );
}
