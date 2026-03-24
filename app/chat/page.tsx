'use client';

import { ChatScreen } from '@/components/screens/chat-screen';
import { ScreenRoute } from '@/components/navigation/screen-route';
import { useApp } from '@/lib/app-context';

export default function ChatScreenPage() {
  const { selectedChatId } = useApp();

  return (
    <ScreenRoute screen="chat" canAccess={Boolean(selectedChatId)} fallbackHref="/chats">
      <ChatScreen />
    </ScreenRoute>
  );
}
