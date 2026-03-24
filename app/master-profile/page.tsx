'use client';

import { MasterProfileScreen } from '@/components/screens/master-profile-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';
import { useApp } from '@/lib/app-context';

export default function MasterProfileScreenPage() {
  const { selectedMasterId } = useApp();

  return (
    <ScreenRoute screen="master-profile" canAccess={Boolean(selectedMasterId)} fallbackHref="/search">
      <MasterProfileScreen />
    </ScreenRoute>
  );
}
