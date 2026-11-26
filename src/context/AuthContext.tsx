import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, SearchLogItem } from '../types/auth';
import { authService } from '../services/authService';
import { searchLogService } from '../services/searchLogService';

interface SupabaseStatus {
  connected: boolean;
  message: string;
}

interface AuthContextType {
  user: UserProfile | null;
  searchLogs: SearchLogItem[];
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSearchLogsModalOpen: boolean;
  setIsSearchLogsModalOpen: (open: boolean) => void;
  supabaseStatus: SupabaseStatus;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  logSearch: (query: string, type?: SearchLogItem['type'], metadata?: Record<string, any>) => Promise<void>;
  clearLogs: () => Promise<void>;
  refreshLogs: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentSession());
  const [searchLogs, setSearchLogs] = useState<SearchLogItem[]>(() => {
    const session = authService.getCurrentSession();
    return session?.searchLogs || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchLogsModalOpen, setIsSearchLogsModalOpen] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>({
    connected: false,
    message: 'Checking Supabase connection...'
  });

  // Verify connection status on startup
  useEffect(() => {
    let mounted = true;
    authService.checkConnection().then(status => {
      if (mounted) setSupabaseStatus(status);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Sync search logs whenever active user changes
  useEffect(() => {
    if (user?.id) {
      searchLogService.getUserSearchLogs(user.id).then(logs => {
        setSearchLogs(logs);
      });
    } else {
      setSearchLogs([]);
    }
  }, [user?.id]);

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const res = await authService.signUp(email, password, fullName);
      if (res.user) {
        setUser(res.user);
        setSearchLogs(res.user.searchLogs || []);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: res.error || 'Registration failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Unexpected error' };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.signIn(email, password);
      if (res.user) {
        setUser(res.user);
        setSearchLogs(res.user.searchLogs || []);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: res.error || 'Authentication failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Unexpected error' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
    setSearchLogs([]);
  };

  /**
   * Log search to the user's specific row in JSON format (not creating a new row per search)
   */
  const logSearch = useCallback(async (
    query: string,
    type: SearchLogItem['type'] = 'bulletin_search',
    metadata?: Record<string, any>
  ) => {
    if (!query || !query.trim()) return;

    if (!user) {
      // If user is guest/unauthenticated, we can still record temporary session logs
      const guestLog: SearchLogItem = {
        id: 'guest_' + Date.now(),
        query: query.trim(),
        type,
        timestamp: new Date().toISOString(),
        metadata
      };
      setSearchLogs(prev => [guestLog, ...prev].slice(0, 50));
      return;
    }

    try {
      // Appends to the user's single row in Supabase as JSON
      const updated = await searchLogService.appendSearchLog(user.id, {
        query: query.trim(),
        type,
        metadata
      });
      setSearchLogs(updated);
    } catch (e) {
      console.error('Error logging search to user row:', e);
    }
  }, [user]);

  const clearLogs = async () => {
    if (!user) {
      setSearchLogs([]);
      return;
    }
    await searchLogService.clearUserSearchLogs(user.id);
    setSearchLogs([]);
  };

  const refreshLogs = async () => {
    if (!user) return;
    const logs = await searchLogService.getUserSearchLogs(user.id);
    setSearchLogs(logs);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        searchLogs,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchLogsModalOpen,
        setIsSearchLogsModalOpen,
        supabaseStatus,
        signUp,
        signIn,
        signOut,
        logSearch,
        clearLogs,
        refreshLogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
