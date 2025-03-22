import { create } from "zustand";
import { authApi } from "./api";
import { AuthState, LoginCredentials, SignUpCredentials, User } from "./types";

type AuthStore = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authApi.login(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
        isLoading: false,
      });
    }
  },

  signUp: async (credentials: SignUpCredentials) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authApi.signUp(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during sign up",
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await authApi.logout();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during logout",
        isLoading: false,
      });
    }
  },

  setUser: (user: User | null) => set({ user }),
  setError: (error: string | null) => set({ error }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
