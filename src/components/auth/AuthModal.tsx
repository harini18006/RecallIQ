import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck, Database, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signIn, signUp, isLoading, supabaseStatus } = useAuth();
  const { addToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup') {
      const res = await signUp(email, password, fullName);
      if (res.success) {
        addToast('Account Created', `Welcome to RecallIQ, ${fullName || email}! Connected to Supabase DB.`, 'success');
      } else {
        setErrorMessage(res.error || 'Failed to create account');
      }
    } else {
      const res = await signIn(email, password);
      if (res.success) {
        addToast('Signed In', `Welcome back, ${email}!`, 'success');
      } else {
        setErrorMessage(res.error || 'Invalid email or password');
      }
    }
  };

  const handleDemoFill = () => {
    setEmail('demo.investigator@recalliqlabs.com');
    setPassword('safety2026');
    setFullName('Special Agent Dana Scully');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-ivory-50 border border-warmgrey-300 rounded-sm shadow-technical max-w-md w-full overflow-hidden text-charcoal-900 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-charcoal-900 text-ivory-100 px-6 py-4 flex items-center justify-between border-b border-charcoal-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-safety-orange" />
            <span className="font-sans font-bold tracking-tight text-base">RecallIQ Access Gate</span>
          </div>
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="text-charcoal-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Database & Auth Mode Notice */}
        <div className="px-6 py-2.5 bg-ivory-200/60 border-b border-warmgrey-200 flex items-center justify-between text-[11px] font-mono text-charcoal-600">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-forest-green" />
            <span>DB Storage: <strong>Single-Row JSON Architecture</strong></span>
          </div>
          <span className="px-1.5 py-0.5 rounded-xs bg-forest-green/10 text-forest-green font-semibold border border-forest-green/20">
            Direct Auth
          </span>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-warmgrey-200 bg-white">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMessage(''); }}
            className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors border-b-2 ${
              mode === 'signin'
                ? 'border-safety-orange text-safety-orange bg-ivory-100/50'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(''); }}
            className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors border-b-2 ${
              mode === 'signup'
                ? 'border-safety-orange text-safety-orange bg-ivory-100/50'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-blood-red/10 border border-blood-red/30 rounded-xs flex flex-col gap-1 text-xs text-blood-red font-mono">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
              {mode === 'signin' && errorMessage.toLowerCase().includes('no user') && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="mt-1 text-left text-safety-orange underline font-semibold hover:text-safety-orange-hover"
                >
                  &rarr; Click here to create this account now with this email
                </button>
              )}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-600 mb-1">
                Full Name / Department
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Inspector Miller"
                  className="w-full pl-9 pr-3 py-2 text-xs font-sans bg-white border border-warmgrey-300 rounded-xs focus:outline-none focus:border-safety-orange text-charcoal-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investigator@agency.gov or personal@domain.com"
                className="w-full pl-9 pr-3 py-2 text-xs font-sans bg-white border border-warmgrey-300 rounded-xs focus:outline-none focus:border-safety-orange text-charcoal-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs font-sans bg-white border border-warmgrey-300 rounded-xs focus:outline-none focus:border-safety-orange text-charcoal-900"
              />
            </div>
            <p className="text-[10px] text-charcoal-500 font-mono mt-1">
              Minimum 6 characters. No external email confirmation gate required.
            </p>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-100 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 border border-charcoal-700 shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <span>Synchronizing with Database...</span>
            ) : mode === 'signin' ? (
              <>
                <span>Sign In & Load User Logs</span>
                <ArrowRight className="w-4 h-4 text-safety-orange" />
              </>
            ) : (
              <>
                <span>Initialize User Row & Register</span>
                <CheckCircle2 className="w-4 h-4 text-forest-green" />
              </>
            )}
          </button>

          {/* Quick Demo Fill */}
          <div className="pt-3 border-t border-warmgrey-200 flex items-center justify-between text-[11px] font-mono">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-charcoal-500 hover:text-safety-orange underline transition-colors"
            >
              Fill Demo Investigator Account
            </button>
            <span className="text-charcoal-400 text-[10px]">
              {supabaseStatus.connected ? '● Supabase Live' : '○ Local DB Active'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
