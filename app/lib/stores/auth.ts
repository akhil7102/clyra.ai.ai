import { atom } from 'nanostores';

export interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

const storedAuth =
  typeof window !== 'undefined' ? window.localStorage.getItem('bolt_auth') : null;

const initialAuthState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      email: null,
      firstName: null,
      lastName: null,
    };

export const authStore = atom<AuthState>(initialAuthState);

export function setAuthState(next: AuthState) {
  authStore.set(next);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('bolt_auth', JSON.stringify(next));
  }
}

export function signOut() {
  setAuthState({ isAuthenticated: false, email: null, firstName: null, lastName: null });
}

export interface AuthUiState {
  open: boolean;
  mode: 'signin' | 'signup';
}

export const authUiStore = atom<AuthUiState>({ open: false, mode: 'signin' });

export function openAuthModal(mode: 'signin' | 'signup') {
  authUiStore.set({ open: true, mode });
}

export function closeAuthModal() {
  const current = authUiStore.get();
  authUiStore.set({ ...current, open: false });
}
