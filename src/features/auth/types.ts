export type User = {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = LoginCredentials & {
  displayName: string;
};
