import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  User, LogIn, LogOut, History, ChevronDown, 
  Database, Shield, Code2 
} from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, searchLogs, setIsAuthModalOpen, setIsSearchLogsModalOpen, signOut, supabaseStatus } = useAuth();
  const { addToast } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut();
    setDropdownOpen(false);
    addToast('Signed Out', 'You have been successfully signed out.', 'info');
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-100 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors border border-charcoal-700 shadow-sm"
        >
          <LogIn className="w-3.5 h-3.5 text-safety-orange" />
          <span>Sign In / Register</span>
        </button>
      </div>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        className="flex items-center gap-2.5 px-2.5 py-1.5 bg-ivory-200/90 hover:bg-ivory-300/80 border border-warmgrey-300 rounded-xs transition-colors text-charcoal-900"
      >
        <div className="w-6 h-6 rounded-xs bg-charcoal-900 text-ivory-100 flex items-center justify-center font-mono text-[10px] font-bold border border-charcoal-700">
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-semibold leading-tight text-charcoal-900 truncate max-w-[120px]">
            {user.fullName}
          </div>
          <div className="text-[10px] font-mono text-charcoal-500 leading-tight">
            {searchLogs.length} logs in row
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-warmgrey-300 rounded-xs shadow-technical z-50 animate-fadeIn overflow-hidden">
          {/* User Info Header */}
          <div className="p-3 bg-ivory-100 border-b border-warmgrey-200">
            <div className="font-semibold text-xs text-charcoal-900 truncate">
              {user.fullName}
            </div>
            <div className="text-[11px] font-mono text-charcoal-500 truncate">
              {user.email}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-mono text-forest-green font-semibold">
              <Database className="w-3 h-3" />
              <span>Row ID: {user.id.slice(0, 12)}...</span>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="py-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                setIsSearchLogsModalOpen(true);
              }}
              className="w-full px-3 py-2 text-left text-xs text-charcoal-800 hover:bg-ivory-100 flex items-center justify-between font-mono transition-colors"
            >
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-safety-orange" />
                <span>My Search Logs</span>
              </div>
              <span className="px-1.5 py-0.2 bg-ivory-200 border border-warmgrey-300 rounded-xs text-[10px] font-bold text-charcoal-700">
                {searchLogs.length}
              </span>
            </button>

            <button
              onClick={() => {
                setDropdownOpen(false);
                setIsSearchLogsModalOpen(true);
              }}
              className="w-full px-3 py-2 text-left text-xs text-charcoal-800 hover:bg-ivory-100 flex items-center gap-2 font-mono transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-forest-green" />
              <span>Inspect Row JSON</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-1 border-t border-warmgrey-200 bg-ivory-50">
            <button
              onClick={handleSignOut}
              className="w-full px-3 py-1.5 text-left text-xs text-blood-red hover:bg-blood-red/10 rounded-xs flex items-center gap-2 font-mono transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
