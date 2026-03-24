'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Language, Theme, UserRole, AppScreen, Master, Booking, ServiceRequest, Chat, InfoPage } from './types';
import { translations, type TranslationKey } from './i18n';
import { masters as mockMasters, bookings as mockBookings, serviceRequests as mockRequests, chats as mockChats } from './mock-data';

interface AppState {
  // UI State
  language: Language;
  theme: Theme;
  currentScreen: AppScreen;
  previousScreens: AppScreen[];
  
  // User State
  userRole: UserRole | null;
  userName: string;
  
  // Data State
  masters: Master[];
  favorites: string[];
  bookings: Booking[];
  requests: ServiceRequest[];
  chats: Chat[];
  
  // Selected State
  selectedMasterId: string | null;
  selectedRequestId: string | null;
  selectedChatId: string | null;
  selectedServiceId: string | null;
  selectedInfoPage: InfoPage | null;
  
  // Booking Flow State
  bookingServiceId: string | null;
  bookingDate: string | null;
  bookingTime: string | null;
  
  // Search State
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: 'distance' | 'rating' | 'price';
}

interface AppContextType extends AppState {
  // Translation
  t: (key: TranslationKey) => string;
  
  // Navigation
  navigate: (screen: AppScreen) => void;
  goBack: () => void;
  
  // Settings
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setUserRole: (role: UserRole) => void;
  
  // Master Actions
  selectMaster: (id: string) => void;
  toggleFavorite: (masterId: string) => void;
  
  // Booking Actions
  startBooking: (masterId: string, serviceId?: string) => void;
  setBookingService: (serviceId: string) => void;
  setBookingDate: (date: string) => void;
  setBookingTime: (time: string) => void;
  confirmBooking: () => void;
  
  // Request Actions
  selectRequest: (id: string) => void;
  createRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'responsesCount' | 'status'>) => void;
  
  // Chat Actions
  selectChat: (id: string) => void;
  openChatWithMaster: (masterId: string) => void;
  selectInfoPage: (page: InfoPage) => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sort: 'distance' | 'rating' | 'price') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    language: 'ru',
    theme: 'light',
    currentScreen: 'splash',
    previousScreens: [],
    userRole: null,
    userName: 'Пользователь',
    masters: mockMasters,
    favorites: ['2', '6'], // Pre-favorited masters
    bookings: mockBookings,
    requests: mockRequests,
    chats: mockChats,
    selectedMasterId: null,
    selectedRequestId: null,
    selectedChatId: null,
    selectedServiceId: null,
    selectedInfoPage: null,
    bookingServiceId: null,
    bookingDate: null,
    bookingTime: null,
    searchQuery: '',
    selectedCategory: null,
    sortBy: 'distance',
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('sloty-theme') as Theme | null;
    const savedLanguage = window.localStorage.getItem('sloty-language') as Language | null;

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setState(prev => ({ ...prev, theme: savedTheme }));
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedLanguage === 'ru' || savedLanguage === 'en') {
      setState(prev => ({ ...prev, language: savedLanguage }));
    }
  }, []);

  // Translation helper
  const t = useCallback((key: TranslationKey): string => {
    return translations[state.language][key] || translations.en[key] || key;
  }, [state.language]);

  // Navigation
  const navigate = useCallback((screen: AppScreen) => {
    setState(prev => ({
      ...prev,
      previousScreens: [...prev.previousScreens, prev.currentScreen],
      currentScreen: screen,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      const newPreviousScreens = [...prev.previousScreens];
      const previousScreen = newPreviousScreens.pop() || 'home';
      return {
        ...prev,
        previousScreens: newPreviousScreens,
        currentScreen: previousScreen,
      };
    });
  }, []);

  // Settings
  const setLanguage = useCallback((lang: Language) => {
    window.localStorage.setItem('sloty-language', lang);
    setState(prev => ({ ...prev, language: lang }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    window.localStorage.setItem('sloty-theme', theme);
    setState(prev => ({ ...prev, theme }));
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const setUserRole = useCallback((role: UserRole) => {
    setState(prev => ({ ...prev, userRole: role }));
  }, []);

  // Master Actions
  const selectMaster = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedMasterId: id }));
  }, []);

  const toggleFavorite = useCallback((masterId: string) => {
    setState(prev => {
      const isFavorite = prev.favorites.includes(masterId);
      return {
        ...prev,
        favorites: isFavorite 
          ? prev.favorites.filter(id => id !== masterId)
          : [...prev.favorites, masterId],
        masters: prev.masters.map(m => 
          m.id === masterId ? { ...m, isFavorite: !isFavorite } : m
        ),
      };
    });
  }, []);

  // Booking Actions
  const startBooking = useCallback((masterId: string, serviceId?: string) => {
    setState(prev => ({
      ...prev,
      selectedMasterId: masterId,
      bookingServiceId: serviceId || null,
      bookingDate: null,
      bookingTime: null,
    }));
  }, []);

  const setBookingService = useCallback((serviceId: string) => {
    setState(prev => ({ ...prev, bookingServiceId: serviceId }));
  }, []);

  const setBookingDate = useCallback((date: string) => {
    setState(prev => ({ ...prev, bookingDate: date }));
  }, []);

  const setBookingTime = useCallback((time: string) => {
    setState(prev => ({ ...prev, bookingTime: time }));
  }, []);

  const confirmBooking = useCallback(() => {
    setState(prev => {
      const master = prev.masters.find(m => m.id === prev.selectedMasterId);
      const service = master?.services.find(s => s.id === prev.bookingServiceId);
      
      if (!master || !service || !prev.bookingDate || !prev.bookingTime) {
        return prev;
      }

      const newBooking: Booking = {
        id: `b${Date.now()}`,
        masterId: master.id,
        masterName: master.name,
        masterAvatar: master.avatar,
        service,
        date: prev.bookingDate,
        time: prev.bookingTime,
        status: 'upcoming',
        address: master.address,
      };

      return {
        ...prev,
        bookings: [newBooking, ...prev.bookings],
        bookingServiceId: null,
        bookingDate: null,
        bookingTime: null,
      };
    });
  }, []);

  // Request Actions
  const selectRequest = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedRequestId: id }));
  }, []);

  const createRequest = useCallback((request: Omit<ServiceRequest, 'id' | 'createdAt' | 'responsesCount' | 'status'>) => {
    setState(prev => {
      const newRequest: ServiceRequest = {
        ...request,
        id: `req${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        responsesCount: 0,
        status: 'open',
      };
      return {
        ...prev,
        requests: [newRequest, ...prev.requests],
      };
    });
  }, []);

  // Chat Actions
  const selectChat = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedChatId: id }));
  }, []);

  const openChatWithMaster = useCallback((masterId: string) => {
    setState(prev => {
      const existingChat = prev.chats.find(c => c.participantId === masterId);
      if (existingChat) {
        return { ...prev, selectedChatId: existingChat.id };
      }
      
      const master = prev.masters.find(m => m.id === masterId);
      if (!master) return prev;

      const newChat: Chat = {
        id: `c${Date.now()}`,
        participantId: masterId,
        participantName: master.name,
        participantAvatar: master.avatar,
        lastMessage: '',
        lastMessageTime: 'сейчас',
        unreadCount: 0,
      };

      return {
        ...prev,
        chats: [newChat, ...prev.chats],
        selectedChatId: newChat.id,
      };
    });
  }, []);

  const selectInfoPage = useCallback((page: InfoPage) => {
    setState(prev => ({ ...prev, selectedInfoPage: page }));
  }, []);

  // Search Actions
  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedCategory = useCallback((category: string | null) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  const setSortBy = useCallback((sort: 'distance' | 'rating' | 'price') => {
    setState(prev => ({ ...prev, sortBy: sort }));
  }, []);

  const value: AppContextType = {
    ...state,
    t,
    navigate,
    goBack,
    setLanguage,
    setTheme,
    setUserRole,
    selectMaster,
    toggleFavorite,
    startBooking,
    setBookingService,
    setBookingDate,
    setBookingTime,
    confirmBooking,
    selectRequest,
    createRequest,
    selectChat,
    openChatWithMaster,
    selectInfoPage,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
