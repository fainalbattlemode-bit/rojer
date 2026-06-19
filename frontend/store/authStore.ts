import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        // TODO: API call
        set({ isAuthenticated: true });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
      setUser: (user: User, token: string) => {
        set({ isAuthenticated: true, user, token });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
