// Sloty App Types

export type Language = 'ru' | 'en';
export type Theme = 'light' | 'dark';
export type UserRole = 'client' | 'master';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  email?: string;
}

export interface Master {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  distance: number; // in km
  address: string;
  lat: number;
  lng: number;
  priceFrom: number;
  services: Service[];
  portfolio: string[];
  reviews: Review[];
  about: string;
  nextAvailable?: string;
  tags: string[];
  isFavorite?: boolean;
  verified?: boolean;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  nameRu: string;
  icon: string;
  count: number;
}

export interface Booking {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  service: Service;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  address: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  preferredDate?: string;
  preferredTime?: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  responsesCount: number;
  status: 'open' | 'in_progress' | 'closed';
}

export interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  relatedBookingId?: string;
  relatedRequestId?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
  status: 'sent' | 'delivered' | 'failed';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export type ComposerState = 'disabled' | 'sending' | 'error' | 'retry' | 'ready';

export interface QuickReplyTemplate {
  id: string;
  label: string;
  value: string;
  category: 'time' | 'pricing' | 'availability' | 'general';
}

export interface ChatThreadState {
  messages: ChatMessage[];
  draft: string;
  composerState: ComposerState;
  failedMessage?: ChatMessage;
  isLoading: boolean;
}

export type InfoPage =
  | 'notification-settings'
  | 'privacy-settings'
  | 'help-support'
  | 'terms-conditions'
  | 'privacy-policy'
  | 'my-profile'
  | 'my-services'
  | 'my-schedule'
  | 'earnings'
  | 'share-profile';

export type AppScreen = 
  | 'splash'
  | 'role-selection'
  | 'home'
  | 'search'
  | 'map'
  | 'profile'
  | 'master-profile'
  | 'booking'
  | 'bookings'
  | 'favorites'
  | 'chats'
  | 'chat'
  | 'requests'
  | 'create-request'
  | 'request-detail'
  | 'settings'
  | 'notifications'
  | 'info-detail'
  | 'master-dashboard';
