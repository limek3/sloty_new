'use client';

import { InfoDetailScreen } from '@/components/screens/info-detail-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function InfoDetailScreenPage() {
  return (
    <ScreenRoute screen="info-detail" canAccess={true}>
      <InfoDetailScreen />
    </ScreenRoute>
  );
}
