import { useStore } from '@nanostores/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Link, useLocation } from '@remix-run/react';
import { chatStore } from '~/lib/stores/chat';
import { authStore, signOut as signOutStore, authUiStore, openAuthModal, closeAuthModal, setAuthState } from '~/lib/stores/auth';
import { useSupabase } from '~/lib/auth/supabase-client';
import { classNames } from '~/utils/classNames';
const HeaderActionButtons = lazy(() => import('./HeaderActionButtons.client').then(m => ({ default: m.HeaderActionButtons })));
import { ControlPanel } from '~/components/@settings/core/ControlPanel';
const HistoryDropdown = lazy(() => import('./HistoryDropdown.client').then(m => ({ default: m.HistoryDropdown })));
import { DialogRoot, Dialog, DialogTitle, DialogDescription } from '~/components/ui/Dialog';
 
type HistoryDropdownProps = { open: boolean; onClose: () => void; };

export function Header() {
  const chat = useStore(chatStore);
  const auth = useStore(authStore);
  const authUi = useStore(authUiStore);
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const resourcesRef = useRef<HTMLLIElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const { supabase } = useSupabase();
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (_) {}
    signOutStore();
    window.location.href = '/';
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);
    if (!supabase) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: signInEmail, password: signInPassword });
      if (error || !data.session) {
        setSignInError(error?.message || 'Invalid credentials');
      } else {
        setAuthState({ isAuthenticated: true, email: signInEmail, firstName: null, lastName: null });
        closeAuthModal();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError(null);
    if (!supabase) return;
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }
    if (signUpPassword !== confirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: { data: { first_name: firstName, last_name: lastName, username }, emailRedirectTo: redirectTo },
      });
      if (error) {
        setSignUpError(error.message);
      } else if (data.session) {
        setAuthState({ isAuthenticated: true, email: signUpEmail, firstName, lastName });
        closeAuthModal();
      } else {
        setSignUpError('Check your email to confirm your account');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-control-panel-open', settingsOpen ? 'true' : 'false');
      document.documentElement.setAttribute('data-history-open', historyOpen ? 'true' : 'false');
    }
  }, [settingsOpen, historyOpen]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modal = params.get('auth');
    if (modal === 'signin' || modal === 'signup') {
      openAuthModal(modal as 'signin' | 'signup');
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      window.history.replaceState({}, '', url.toString());
    }
  }, [location.search]);

  // Close dropdowns on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (resourcesRef.current && target && !resourcesRef.current.contains(target)) {
        setResourcesOpen(false);
      }
      if (userMenuRef.current && target && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl"
        style={{
          height: 'var(--header-height)',
          padding: '0.5rem 2rem',
          borderBottom: '2px solid #22c55e',
        }}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto h-full">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-[1px] select-none hidden"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
          >
            <img 
              src="/icon.png" 
              alt="Clyra.ai Icon" 
              className="rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
              }}
            />
            <img 
              src="/Clyra text-Picsart-BackgroundRemover.png" 
              alt="Clyra.ai Logo" 
              style={{
                height: 'calc(var(--header-height) + 8px)',
                width: 'auto',
                objectFit: 'contain',
                marginTop: '-4px',
                marginBottom: '-4px',
                display: 'block',
              }}
            />
          </Link>

          {/* Center Nav Links - Desktop */}
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-8 text-sm">
              <li>
                <Link
                  to="/overview"
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  <span className="relative z-10">Overview</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  <span className="relative z-10">Features</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li className="relative" ref={resourcesRef}>
                <button
                  onClick={() => setResourcesOpen((v) => !v)}
                  className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors duration-200 group bg-transparent border-0 outline-none cursor-pointer"
                >
                  <span className="relative z-10">Resources</span>
                  <span className={classNames('i-ph:caret-down transition-transform text-xs', { 'rotate-180': resourcesOpen })} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-xl blur opacity-30" />
                      <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl">
                        <Link to="/resources" className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200 border-b border-white/5" onClick={() => setResourcesOpen(false)}>
                          Resources Hub
                        </Link>
                        <Link to="/docs" className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200 border-b border-white/5" onClick={() => setResourcesOpen(false)}>
                          Docs
                        </Link>
                        <Link to="/blog" className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200 border-b border-white/5" onClick={() => setResourcesOpen(false)}>
                          Blog
                        </Link>
                        <Link to="/gallery" className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200" onClick={() => setResourcesOpen(false)}>
                          Community Showcase
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/guides"
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  <span className="relative z-10">Guides</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Side - Auth & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {auth.isAuthenticated && (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span className="i-ph:user-circle text-lg" />
                  <span className="text-sm">{auth.firstName || auth.email || 'Account'}</span>
                  <span className={classNames('i-ph:caret-down text-xs transition-transform', { 'rotate-180': userMenuOpen })} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl blur opacity-40" />
                      <div className="relative bg-black/90 text-white/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl">
                        <button
                          onClick={() => { setSettingsOpen(true); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/5 cursor-pointer flex items-center gap-2"
                        >
                          <span className="i-ph:gear-six" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={() => { setHistoryOpen(v => !v); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/5 cursor-pointer flex items-center gap-2"
                        >
                          <span className="i-ph:clock" />
                          <span>History</span>
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-white/90 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center gap-2"
                        >
                          <span className="i-ph:sign-out" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!auth.isAuthenticated && (
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 border-0 cursor-pointer"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </div>
            )}

            {chat.started && (
              <ClientOnly>
                {() => (
                  <Suspense fallback={null}>
                    <div className="ml-2">
                      <HeaderActionButtons chatStarted={chat.started} />
                    </div>
                  </Suspense>
                )}
              </ClientOnly>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={classNames('i-ph:list text-2xl transition-transform', { 'rotate-90': mobileOpen })} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-4 py-6 border-t border-white/10 animate-in slide-in-from-top duration-200"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
            }}
          >
            <div className="flex flex-col gap-4">
              <Link to="/overview" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Overview
              </Link>
              <Link to="/features" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Features
              </Link>
              <Link to="/resources" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Resources
              </Link>
              <Link to="/guides" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Guides
              </Link>
              <Link to="/docs" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Docs
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
              <Link to="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors px-2 py-2" onClick={() => setMobileOpen(false)}>
                Community Showcase
              </Link>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                {auth.isAuthenticated && (
                  <>
                    <button
                      onClick={() => {
                        setSettingsOpen(true);
                        setMobileOpen(false);
                      }}
                      className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-3 py-2 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setHistoryOpen((v) => !v);
                        setMobileOpen(false);
                      }}
                      className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-3 py-2 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      History
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                      className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-3 py-2 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      Sign out
                    </button>
                  </>
                )}
                {!auth.isAuthenticated && (
                  <>
                    <button
                      onClick={() => { setMobileOpen(false); openAuthModal('signin'); }}
                      className="text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg transition-colors text-center cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); openAuthModal('signup'); }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-center cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {historyOpen && (
          <Suspense fallback={null}>
            <HistoryDropdown open={historyOpen} onClose={() => setHistoryOpen(false)} />
          </Suspense>
        )}
      </header>
      <ControlPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <DialogRoot open={authUi.open} onOpenChange={(o) => { if (!o) closeAuthModal(); }}>
        <Dialog>
          <div className="p-6 bg-white dark:bg-gray-950">
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{authUi.mode === 'signin' ? 'Login' : 'Signup'} Form</DialogTitle>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <button onClick={() => openAuthModal('signin')} className={classNames('px-3 py-1 text-sm', authUi.mode === 'signin' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300')}>Login</button>
                <button onClick={() => openAuthModal('signup')} className={classNames('px-3 py-1 text-sm', authUi.mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300')}>Signup</button>
              </div>
            </div>
            <DialogDescription className="sr-only">Use email and password to authenticate. Signup collects basic profile info.</DialogDescription>
            {authUi.mode === 'signin' ? (
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <label htmlFor="signin-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input id="signin-email" type="email" required autoComplete="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signin-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <input id="signin-password" type="password" required autoComplete="current-password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your password" />
                </div>
                {signInError && <p className="text-sm text-red-600">{signInError}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-blue-600 text-white px-4 py-3 font-semibold hover:bg-blue-500 transition">{isSubmitting ? 'Logging in...' : 'Login'}</button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-firstname" className="text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                    <input id="signup-firstname" type="text" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-lastname" className="text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                    <input id="signup-lastname" type="text" required autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-username" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <input id="signup-username" type="text" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input id="signup-email" type="email" required autoComplete="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <input id="signup-password" type="password" required minLength={6} autoComplete="new-password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-confirm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
                  <input id="signup-confirm" type="password" required minLength={6} autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {signUpError && <p className="text-sm text-red-600">{signUpError}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-blue-600 text-white px-4 py-3 font-semibold hover:bg-blue-500 transition">{isSubmitting ? 'Signing up...' : 'Signup'}</button>
              </form>
            )}
          </div>
        </Dialog>
      </DialogRoot>
      
    </>
  );
}
