import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { UserProfile, SupabaseUserRow, SearchLogItem } from '../types/auth';

const SESSION_STORAGE_KEY = 'recall_iq_current_user';
const LOCAL_USERS_TABLE_KEY = 'recall_iq_local_users_db';

// Simple SHA-256 password hash using standard Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_recall_iq_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Local mock DB helpers for fallback/demo when Supabase credentials are not connected
function getLocalUsersDB(): SupabaseUserRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_TABLE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUsersDB(users: SupabaseUserRow[]) {
  try {
    localStorage.setItem(LOCAL_USERS_TABLE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to persist local users DB', e);
  }
}

export const authService = {
  // Check if active Supabase connection is valid
  async checkConnection(): Promise<{ connected: boolean; message: string }> {
    if (!isSupabaseConfigured()) {
      return { 
        connected: false, 
        message: 'Supabase URL or Anon Key is missing in environment (.env). Operating with local persistent database fallback.' 
      };
    }

    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase client unavailable');
      
      const { error } = await supabase.from('app_users').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          return { 
            connected: false, 
            message: 'Connected to Supabase, but "app_users" table does not exist yet. Run supabase_schema.sql in your Supabase SQL Editor.' 
          };
        }
        if (error.code === '42501') {
          return {
            connected: false,
            message: 'Permission denied on app_users table. Run the updated script in supabase_schema.sql (including GRANT ALL) in your Supabase SQL Editor.'
          };
        }
        return { connected: false, message: error.message };
      }
      return { connected: true, message: 'Connected to Supabase database (app_users table ready)' };
    } catch (err: any) {
      return { connected: false, message: err.message || 'Connection failed' };
    }
  },

  // Direct Database Sign Up (No email verification required)
  async signUp(email: string, password: string, fullName: string): Promise<{ user: UserProfile | null; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim() || cleanEmail.split('@')[0];

    if (!cleanEmail || !password) {
      return { user: null, error: 'Email and password are required' };
    }

    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters' };
    }

    const hashedPassword = await hashPassword(password);
    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const newUserRow: SupabaseUserRow = {
      id: userId,
      email: cleanEmail,
      password_hash: hashedPassword,
      full_name: cleanName,
      search_logs: [], // Empty JSON array initialized in this user's single row
      created_at: now,
      last_login: now
    };

    // If Supabase is configured, store directly in Supabase app_users table
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          // Check if email already registered
          const { data: existing } = await supabase
            .from('app_users')
            .select('id')
            .eq('email', cleanEmail)
            .maybeSingle();

          if (existing) {
            return { user: null, error: 'An account with this email already exists' };
          }

          // Upsert new user row with their own row and JSON search_logs column
          const { error: insertError } = await supabase
            .from('app_users')
            .upsert({
              id: userId,
              email: cleanEmail,
              password_hash: hashedPassword,
              full_name: cleanName,
              search_logs: [], // JSON array
              created_at: now,
              last_login: now,
              updated_at: now
            });

          if (insertError) {
            console.warn('Supabase DB signUp notice (table may need schema run):', insertError.message);
            // Fall through to local persistent store so the user is never blocked from logging in!
          }
        }
      } catch (e: any) {
        console.warn('Supabase DB insert failed, falling back to local persistent store', e);
      }
    }

    // Always mirror to local store for resilience
    const localUsers = getLocalUsersDB();
    const existingIndex = localUsers.findIndex(u => u.email === cleanEmail);
    if (existingIndex >= 0) {
      localUsers[existingIndex] = newUserRow;
    } else {
      localUsers.push(newUserRow);
    }
    saveLocalUsersDB(localUsers);

    const profile: UserProfile = {
      id: userId,
      email: cleanEmail,
      fullName: cleanName,
      createdAt: now,
      lastLogin: now,
      searchLogs: []
    };

    this.saveSession(profile);
    return { user: profile };
  },

  // Direct Database Sign In (No email verification required)
  async signIn(email: string, password: string): Promise<{ user: UserProfile | null; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { user: null, error: 'Email and password are required' };
    }

    const hashedPassword = await hashPassword(password);
    const now = new Date().toISOString();

    // Try Supabase first if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data, error } = await supabase
            .from('app_users')
            .select('*')
            .eq('email', cleanEmail)
            .maybeSingle();

          if (error) {
            console.error('Supabase query error:', error);
          } else if (data) {
            if (data.password_hash !== hashedPassword) {
              return { user: null, error: 'Invalid password. Please check your credentials.' };
            }

            // Update last_login in their DB row
            await supabase
              .from('app_users')
              .update({ last_login: now })
              .eq('id', data.id);

            const profile: UserProfile = {
              id: data.id,
              email: data.email,
              fullName: data.full_name || data.email.split('@')[0],
              createdAt: data.created_at,
              lastLogin: now,
              searchLogs: Array.isArray(data.search_logs) ? data.search_logs : []
            };

            this.saveSession(profile);
            return { user: profile };
          }
        }
      } catch (e) {
        console.warn('Supabase query failed, checking local store', e);
      }
    }

    // Fallback to local persistent store
    const localUsers = getLocalUsersDB();
    const userRow = localUsers.find(u => u.email === cleanEmail);
    if (!userRow) {
      return { user: null, error: 'No user found with this email. Please create an account.' };
    }

    if (userRow.password_hash !== hashedPassword) {
      return { user: null, error: 'Invalid password. Please try again.' };
    }

    userRow.last_login = now;
    saveLocalUsersDB(localUsers);

    const profile: UserProfile = {
      id: userRow.id,
      email: userRow.email,
      fullName: userRow.full_name,
      createdAt: userRow.created_at,
      lastLogin: now,
      searchLogs: Array.isArray(userRow.search_logs) ? userRow.search_logs : []
    };

    this.saveSession(profile);
    return { user: profile };
  },

  // Save active session to localStorage
  saveSession(user: UserProfile) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Could not save session', e);
    }
  },

  // Get active session from localStorage
  getCurrentSession(): UserProfile | null {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Sign out
  signOut() {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Could not clear session', e);
    }
  }
};
