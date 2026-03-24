'use client';

import { MapScreen } from '@/components/screens/map-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function MapScreenPage() {
  return (
    <ScreenRoute screen="map" canAccess={true}>
      <MapScreen />
    </ScreenRoute>
  );
}
