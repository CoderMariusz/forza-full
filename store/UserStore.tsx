import { create } from 'zustand';

interface UserState {
  name: string;
  email: string;
  id: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setId: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  email: '',
  id: '',
  setName: (name: string) => set((state) => ({ ...state, name })),
  setEmail: (email: string) => set((state) => ({ ...state, email })),
  setId: (id: string) => set((state) => ({ ...state, id }))
}));
