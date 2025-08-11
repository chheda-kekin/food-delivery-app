import { User } from '@/type';
import { create } from 'zustand';

import { getCurrentUser } from '@/lib/appwrite';
import * as Sentry from "@sentry/react-native";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (isAuth: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setUser: (user: User | null) => void;

    fetchAuthenticatedUser: () => Promise<void>;


}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setIsAuthenticated: (isAuth) => set({isAuthenticated: isAuth}),
  setIsLoading: (value) => set({isLoading: value}),
  setUser: (user) => set({user}),
  fetchAuthenticatedUser: async () => {
    set({isLoading: true});
    try {
        const user = await getCurrentUser();
        if(user) {
            set({isAuthenticated: true, user: user as User});
        } else {
            set({isAuthenticated: false, user: null});
        }
        return;
    } catch(error: any) {
        Sentry.captureEvent(error);
        set({isAuthenticated: false, user: null})
        throw error;
    } finally {
        set({isLoading: false});
    }
  },
}));

export default useAuthStore;
