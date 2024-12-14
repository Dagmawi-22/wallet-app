import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface User {
  id: string;
  username: string;
  fullName: string;
  balance: number;
}

export const userAtom = atomWithStorage<User | null>("user", null);
export const isAuthenticatedAtom = atom<boolean>(
  (get) => get(userAtom) !== null
);
