'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type {
  Language,
  Theme,
  UserRole,
  AppScreen,
  Master,
  Booking,
  ServiceRequest,
  Chat,
  InfoPage,
  ChatThreadState,
  ChatMessage,
} from './types';
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
  chatThreads: Record<string, ChatThreadState>;
  
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
  setChatDraft: (chatId: string, draft: string) => void;
  sendChatMessage: (chatId: string) => void;
  retryChatMessage: (chatId: string) => void;
  applyQuickReplyTemplate: (chatId: string, text: string) => void;
  selectInfoPage: (page: InfoPage) => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sort: 'distance' | 'rating' | 'price') => void;
}

const AppContext = createContext<AppContextType | null>(null);

const formatTime = (lang: Language) =>
  new Date().toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

const buildStarterMessages = (lang: Language): ChatMessage[] => [
  {
    id: 'seed-1',
    text: lang === 'ru' ? 'Здравствуйте! Интересуют ваши услуги.' : 'Hello! I am interested in your services.',
    isOwn: true,
    time: '10:30',
    status: 'delivered',
  },
  {
    id: 'seed-2',
    text: lang === 'ru' ? 'Здравствуйте! Конечно, чем могу помочь?' : 'Hello! Sure, how can I help?',
    isOwn: false,
    time: '10:32',
    status: 'delivered',
  },
];

const buildInitialThreads = (chats: Chat[], lang: Language): Record<string, ChatThreadState> =>
  chats.reduce<Record<string, ChatThreadState>>((acc, chat) => {
    acc[chat.id] = {
      messages: buildStarterMessages(lang),
      draft: '',
      composerState: 'disabled',
      isLoading: false,
    };
    return acc;
  }, {});

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
    chatThreads: buildInitialThreads(mockChats, 'ru'),
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

  useEffect(() => {
    if (!state.selectedChatId) return;
    const thread = state.chatThreads[state.selectedChatId];
    if (!thread?.isLoading) return;

    const timer = window.setTimeout(() => {
      setState(prev => {
        if (!prev.selectedChatId) return prev;
        const activeThread = prev.chatThreads[prev.selectedChatId];
        if (!activeThread?.isLoading) return prev;
        return {
          ...prev,
          chatThreads: {
            ...prev.chatThreads,
            [prev.selectedChatId]: {
              ...activeThread,
              isLoading: false,
            },
          },
        };
      });
    }, 650);

    return () => window.clearTimeout(timer);
  }, [state.selectedChatId, state.chatThreads]);

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
    setState(prev => ({
      ...prev,
      selectedChatId: id,
      chatThreads: prev.chatThreads[id]
        ? prev.chatThreads
        : {
            ...prev.chatThreads,
            [id]: {
              messages: buildStarterMessages(prev.language),
              draft: '',
              composerState: 'disabled',
              isLoading: false,
            },
          },
    }));
  }, []);

  const openChatWithMaster = useCallback((masterId: string) => {
    setState(prev => {
      const existingChat = prev.chats.find(c => c.participantId === masterId);
      if (existingChat) {
        return {
          ...prev,
          selectedChatId: existingChat.id,
          chatThreads: prev.chatThreads[existingChat.id]
            ? prev.chatThreads
            : {
                ...prev.chatThreads,
                [existingChat.id]: {
                  messages: buildStarterMessages(prev.language),
                  draft: '',
                  composerState: 'disabled',
                  isLoading: true,
                },
              },
        };
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
        chatThreads: {
          ...prev.chatThreads,
          [newChat.id]: {
            messages: [],
            draft: '',
            composerState: 'disabled',
            isLoading: true,
          },
        },
      };
    });
  }, []);

  const setChatDraft = useCallback((chatId: string, draft: string) => {
    setState(prev => {
      const thread = prev.chatThreads[chatId];
      if (!thread) return prev;
      return {
        ...prev,
        chatThreads: {
          ...prev.chatThreads,
          [chatId]: {
            ...thread,
            draft,
            composerState: thread.composerState === 'error' ? 'retry' : thread.composerState,
          },
        },
      };
    });
  }, []);

  const sendChatMessage = useCallback((chatId: string) => {
    const outgoingId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setState(prev => {
      const thread = prev.chatThreads[chatId];
      if (!thread || !thread.draft.trim()) return prev;

      const outgoing: ChatMessage = {
        id: outgoingId,
        text: thread.draft.trim(),
        isOwn: true,
        time: formatTime(prev.language),
        status: 'sent',
      };

      return {
        ...prev,
        chats: prev.chats.map(chat =>
          chat.id === chatId
            ? { ...chat, lastMessage: outgoing.text, lastMessageTime: prev.language === 'ru' ? 'сейчас' : 'now' }
            : chat
        ),
        chatThreads: {
          ...prev.chatThreads,
          [chatId]: {
            ...thread,
            messages: [...thread.messages, outgoing],
            draft: '',
            composerState: 'sending',
            failedMessage: undefined,
            isLoading: false,
          },
        },
      };
    });

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        setState(prev => {
          const thread = prev.chatThreads[chatId];
          if (!thread) return prev;
          const failedMessage = thread.messages.find(msg => msg.id === outgoingId);
          return {
            ...prev,
            chatThreads: {
              ...prev.chatThreads,
              [chatId]: {
                ...thread,
                messages: thread.messages.map<ChatMessage>(msg =>
                  msg.id === outgoingId ? { ...msg, status: 'failed' } : msg
                ),
                composerState: 'error',
                failedMessage,
              },
            },
          };
        });
        return;
      }

      setState(prev => {
        const thread = prev.chatThreads[chatId];
        if (!thread) return prev;
        const ackText =
          prev.language === 'ru'
            ? 'Спасибо! Уточню детали и отвечу вам.'
            : 'Thanks! I will check the details and reply to you.';
        return {
          ...prev,
          chats: prev.chats.map(chat =>
            chat.id === chatId
              ? { ...chat, lastMessage: ackText, lastMessageTime: prev.language === 'ru' ? 'сейчас' : 'now' }
              : chat
          ),
          chatThreads: {
            ...prev.chatThreads,
            [chatId]: {
              ...thread,
              messages: [
                ...thread.messages.map<ChatMessage>(msg =>
                  msg.id === outgoingId ? { ...msg, status: 'delivered' } : msg
                ),
                {
                  id: `${Date.now()}-reply`,
                  text: ackText,
                  isOwn: false,
                  time: formatTime(prev.language),
                  status: 'delivered',
                } as ChatMessage,
              ],
              composerState: 'disabled',
              failedMessage: undefined,
              isLoading: false,
            },
          },
        };
      });
    }, 1000);
  }, []);

  const retryChatMessage = useCallback((chatId: string) => {
    setState(prev => {
      const thread = prev.chatThreads[chatId];
      if (!thread?.failedMessage) return prev;
      return {
        ...prev,
        chatThreads: {
          ...prev.chatThreads,
          [chatId]: {
            ...thread,
            draft: thread.failedMessage.text,
            composerState: 'retry',
            messages: thread.messages.filter(msg => msg.id !== thread.failedMessage?.id),
            failedMessage: undefined,
          },
        },
      };
    });
  }, []);

  const applyQuickReplyTemplate = useCallback((chatId: string, text: string) => {
    setState(prev => {
      const thread = prev.chatThreads[chatId];
      if (!thread) return prev;
      return {
        ...prev,
        chatThreads: {
          ...prev.chatThreads,
          [chatId]: {
            ...thread,
            draft: text,
            composerState: thread.composerState === 'error' ? 'retry' : thread.composerState,
          },
        },
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
    setChatDraft,
    sendChatMessage,
    retryChatMessage,
    applyQuickReplyTemplate,
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
