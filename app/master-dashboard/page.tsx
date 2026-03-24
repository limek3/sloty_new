'use client';

import { MasterDashboardScreen } from '@/components/screens/master-dashboard-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function MasterDashboardScreenPage() {
  return (
    <ScreenRoute screen="master-dashboard" canAccess={true}>
      <MasterDashboardScreen />
    </ScreenRoute>
  );
}
