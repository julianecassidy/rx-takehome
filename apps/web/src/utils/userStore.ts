import { UserToken } from '@/types';
import { create } from 'zustand';
import decodeToken from '@/utils/decodeJwt';

interface UserDataState {
  userData: UserToken | null;
  getUserFromToken: (token: string) => void;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  getUserFromToken: (token) => set(() => ({
    userData: decodeToken(token)
  })),
}));