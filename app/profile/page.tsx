'use client';

import { ProfileScreen } from '@/components/screens/profile-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function ProfileScreenPage() {
  return (
    <ScreenRoute screen="profile" canAccess={true}>
      <ProfileScreen />
    </ScreenRoute>
  );
}
