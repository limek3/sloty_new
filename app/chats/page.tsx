'use client';

import { ChatsScreen } from '@/components/screens/chats-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';

export default function ChatsScreenPage() {
  return (
    <ScreenRoute screen="chats" canAccess={true}>
      <ChatsScreen />
    </ScreenRoute>
  );
}
