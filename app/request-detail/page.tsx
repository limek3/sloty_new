'use client';

import { RequestDetailScreen } from '@/components/screens/request-detail-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';
import { useApp } from '@/lib/app-context';

export default function RequestDetailScreenPage() {
  const { selectedRequestId } = useApp();

  return (
    <ScreenRoute screen="request-detail" canAccess={Boolean(selectedRequestId)} fallbackHref="/requests">
      <RequestDetailScreen />
    </ScreenRoute>
  );
}
