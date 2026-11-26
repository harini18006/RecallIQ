import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { SearchLogItem, SupabaseUserRow } from '../types/auth';

const LOCAL_USERS_TABLE_KEY = 'recall_iq_local_users_db';
const SESSION_STORAGE_KEY = 'recall_iq_current_user';

/**
 * Service to manage User Search Logs in their own single database row in Supabase.
 * NOTE: Instead of creating a new row for each search, each user has a dedicated row
 * with a `search_logs` JSONB array column that gets appended to upon each search.
 */
export const searchLogService = {
  /**
   * Append a search log entry into the user's single row in Supabase.
   */
  async appendSearchLog(
    userId: string,
    entry: Omit<SearchLogItem, 'id' | 'timestamp'>
  ): Promise<SearchLogItem[]> {
    const newLogItem: SearchLogItem = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ...entry
    };

    let updatedLogs: SearchLogItem[] = [];

    // 1. Try Supabase update or upsert on the user's specific row
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          // Fetch the user's current row to get existing search_logs JSON
          const { data: userRow, error: fetchError } = await supabase
            .from('app_users')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (!fetchError && userRow) {
            const currentLogs: SearchLogItem[] = Array.isArray(userRow.search_logs)
              ? userRow.search_logs
              : [];

            // Prepend new search to maintain latest-first order (limit to last 100 entries)
            updatedLogs = [newLogItem, ...currentLogs].slice(0, 100);

            // Update the SAME single row with the new JSON array
            const { error: updateError } = await supabase
              .from('app_users')
              .update({
                search_logs: updatedLogs, // Stored as JSONB in this user's single row
                updated_at: new Date().toISOString()
              })
              .eq('id', userId);

            if (updateError) {
              console.error('Failed to update search_logs in Supabase row:', updateError);
            } else {
              console.log('Successfully updated Supabase user row with new search log JSON!');
            }
          } else {
            // Row not found in Supabase yet (e.g. created locally before DB connection)
            // Retrieve session info and upsert the entire user row into Supabase!
            const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
            const session = sessionRaw ? JSON.parse(sessionRaw) : null;
            const localRaw = localStorage.getItem(LOCAL_USERS_TABLE_KEY);
            const localUsers: SupabaseUserRow[] = localRaw ? JSON.parse(localRaw) : [];
            const localUser = localUsers.find(u => u.id === userId);

            const existingLogs: SearchLogItem[] = localUser?.search_logs || session?.searchLogs || [];
            updatedLogs = [newLogItem, ...existingLogs.filter(l => l.id !== newLogItem.id)].slice(0, 100);

            const { error: upsertError } = await supabase
              .from('app_users')
              .upsert({
                id: userId,
                email: session?.email || localUser?.email || `user_${userId}@recall-iq.com`,
                password_hash: localUser?.password_hash || 'direct_db_auth',
                full_name: session?.fullName || localUser?.full_name || 'Investigator',
                search_logs: updatedLogs,
                created_at: session?.createdAt || new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_login: new Date().toISOString()
              });

            if (upsertError) {
              console.error('Failed to upsert user row in Supabase:', upsertError);
            } else {
              console.log('Successfully upserted user row and search logs into Supabase!');
            }
          }
        }
      } catch (err) {
        console.warn('Supabase search log update error:', err);
      }
    }

    // 2. Also update local persistent DB for offline / instant UI update
    try {
      const raw = localStorage.getItem(LOCAL_USERS_TABLE_KEY);
      const localUsers: SupabaseUserRow[] = raw ? JSON.parse(raw) : [];
      const userIndex = localUsers.findIndex(u => u.id === userId);

      if (userIndex !== -1) {
        const currentLogs = Array.isArray(localUsers[userIndex].search_logs)
          ? localUsers[userIndex].search_logs
          : [];
        if (updatedLogs.length === 0) {
          updatedLogs = [newLogItem, ...currentLogs].slice(0, 100);
        }
        localUsers[userIndex].search_logs = updatedLogs;
        localUsers[userIndex].updated_at = new Date().toISOString();
        localStorage.setItem(LOCAL_USERS_TABLE_KEY, JSON.stringify(localUsers));
      } else if (updatedLogs.length === 0) {
        updatedLogs = [newLogItem];
      }

      // Update active session in local storage
      const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        if (session.id === userId) {
          session.searchLogs = updatedLogs;
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        }
      }
    } catch (e) {
      console.error('Failed to update local search logs store', e);
    }

    return updatedLogs;
  },

  /**
   * Retrieve all search logs from the user's single row in Supabase.
   */
  async getUserSearchLogs(userId: string): Promise<SearchLogItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data, error } = await supabase
            .from('app_users')
            .select('search_logs')
            .eq('id', userId)
            .single();

          if (!error && data && Array.isArray(data.search_logs)) {
            return data.search_logs;
          }
        }
      } catch (err) {
        console.warn('Could not fetch search logs from Supabase:', err);
      }
    }

    // Local fallback
    try {
      const raw = localStorage.getItem(LOCAL_USERS_TABLE_KEY);
      const localUsers: SupabaseUserRow[] = raw ? JSON.parse(raw) : [];
      const user = localUsers.find(u => u.id === userId);
      return user?.search_logs || [];
    } catch {
      return [];
    }
  },

  /**
   * Clear the user's search logs JSON array in their single database row.
   */
  async clearUserSearchLogs(userId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          await supabase
            .from('app_users')
            .update({ search_logs: [], updated_at: new Date().toISOString() })
            .eq('id', userId);
        }
      } catch (err) {
        console.warn('Failed clearing search logs in Supabase:', err);
      }
    }

    try {
      const raw = localStorage.getItem(LOCAL_USERS_TABLE_KEY);
      const localUsers: SupabaseUserRow[] = raw ? JSON.parse(raw) : [];
      const userIndex = localUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        localUsers[userIndex].search_logs = [];
        localStorage.setItem(LOCAL_USERS_TABLE_KEY, JSON.stringify(localUsers));
      }

      const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        if (session.id === userId) {
          session.searchLogs = [];
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        }
      }
      return true;
    } catch {
      return false;
    }
  }
};
