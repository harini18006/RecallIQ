export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  lastLogin: string;
  searchLogs: SearchLogItem[];
}

export interface SearchLogItem {
  id: string;
  query: string;
  type: 'bulletin_search' | 'filter_change' | 'product_scan' | 'voice_query';
  category?: string;
  resultsCount?: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SupabaseUserRow {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  search_logs: SearchLogItem[];
  created_at: string;
  updated_at?: string;
  last_login?: string;
}
