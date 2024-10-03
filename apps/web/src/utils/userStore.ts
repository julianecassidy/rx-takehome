import { User } from '@/types';
import { create } from 'zustand';
import decodeToken from '@/utils/decodeJwt';

interface UserDataState {
  userData: User | null;
  updateUserData: (token: string) => void;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  updateUserData: (token) => set(() => ({
    userData: decodeToken(token)
  })),
}));