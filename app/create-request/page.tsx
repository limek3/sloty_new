'use client';

import { CreateRequestScreen } from '@/components/screens/create-request-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function CreateRequestScreenPage() {
  return (
    <ScreenRoute screen="create-request" canAccess={true}>
      <CreateRequestScreen />
    </ScreenRoute>
  );
}
