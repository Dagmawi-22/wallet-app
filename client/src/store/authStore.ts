import { atomWithStorage } from "jotai/utils";

interface User {
  id: string;
  username: string;
  fullName: string;
  account: {
    balance: number;
  };
}

interface AuthState {
  access_token: string | null;
  user: User | null;
}

export const isValidAuthState = (state: AuthState | null): boolean => {
  if (!state) return false;
  return !!(state.access_token && state.user?.id);
};

export const userAtom = atomWithStorage<AuthState | null>("auth", null);
