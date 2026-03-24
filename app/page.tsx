'use client';

import { AppProvider, useApp } from '@/lib/app-context';
import { ThemeProvider } from '@/components/theme-provider';
import { SplashScreen } from '@/components/screens/splash-screen';
import { RoleSelectionScreen } from '@/components/screens/role-selection-screen';
import { HomeScreen } from '@/components/screens/home-screen';
import { SearchScreen } from '@/components/screens/search-screen';
import { MapScreen } from '@/components/screens/map-screen';
import { ProfileScreen } from '@/components/screens/profile-screen';
import { MasterProfileScreen } from '@/components/screens/master-profile-screen';
import { BookingScreen } from '@/components/screens/booking-screen';
import { BookingsScreen } from '@/components/screens/bookings-screen';
import { FavoritesScreen } from '@/components/screens/favorites-screen';
import { ChatsScreen } from '@/components/screens/chats-screen';
import { ChatScreen } from '@/components/screens/chat-screen';
import { RequestsScreen } from '@/components/screens/requests-screen';
import { CreateRequestScreen } from '@/components/screens/create-request-screen';
import { RequestDetailScreen } from '@/components/screens/request-detail-screen';
import { MasterDashboardScreen } from '@/components/screens/master-dashboard-screen';
import { NotificationsScreen } from '@/components/screens/notifications-screen';
import { InfoDetailScreen } from '@/components/screens/info-detail-screen';

function AppRouter() {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'role-selection':
      return <RoleSelectionScreen />;
    case 'home':
      return <HomeScreen />;
    case 'search':
      return <SearchScreen />;
    case 'map':
      return <MapScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'master-profile':
      return <MasterProfileScreen />;
    case 'booking':
      return <BookingScreen />;
    case 'bookings':
      return <BookingsScreen />;
    case 'favorites':
      return <FavoritesScreen />;
    case 'chats':
      return <ChatsScreen />;
    case 'chat':
      return <ChatScreen />;
    case 'requests':
      return <RequestsScreen />;
    case 'create-request':
      return <CreateRequestScreen />;
    case 'request-detail':
      return <RequestDetailScreen />;
    case 'notifications':
      return <NotificationsScreen />;
    case 'info-detail':
      return <InfoDetailScreen />;
    case 'master-dashboard':
      return <MasterDashboardScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ThemeProvider>
  );
}
