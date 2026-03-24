import type { AppScreen, UserRole } from './types';

export const SCREEN_PATHS: Record<AppScreen, string> = {
  splash: '/splash',
  'role-selection': '/role-selection',
  home: '/home',
  search: '/search',
  map: '/map',
  profile: '/profile',
  'master-profile': '/master-profile',
  booking: '/booking',
  bookings: '/bookings',
  favorites: '/favorites',
  chats: '/chats',
  chat: '/chat',
  requests: '/requests',
  'create-request': '/create-request',
  'request-detail': '/request-detail',
  settings: '/settings',
  notifications: '/notifications',
  'info-detail': '/info-detail',
  'master-dashboard': '/master-dashboard',
};

export const PATH_TO_SCREEN = Object.entries(SCREEN_PATHS).reduce(
  (acc, [screen, path]) => {
    acc[path] = screen as AppScreen;
    return acc;
  },
  {} as Record<string, AppScreen>
);

export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  client: SCREEN_PATHS.home,
  master: SCREEN_PATHS['master-dashboard'],
};

export const ROLE_ROUTE_SETS: Record<UserRole, AppScreen[]> = {
  client: [
    'home',
    'search',
    'map',
    'profile',
    'master-profile',
    'booking',
    'bookings',
    'favorites',
    'chats',
    'chat',
    'requests',
    'create-request',
    'request-detail',
    'notifications',
    'info-detail',
  ],
  master: [
    'master-dashboard',
    'requests',
    'create-request',
    'request-detail',
    'chats',
    'chat',
    'profile',
    'notifications',
    'info-detail',
    'bookings',
    'home',
  ],
};
