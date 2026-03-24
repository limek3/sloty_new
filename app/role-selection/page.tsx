'use client';

import { RoleSelectionScreen } from '@/components/screens/role-selection-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function RoleSelectionScreenPage() {
  return (
    <ScreenRoute screen="role-selection" canAccess={true}>
      <RoleSelectionScreen />
    </ScreenRoute>
  );
}
