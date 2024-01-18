import { create } from 'zustand';
import { account } from '@/appwrite';
interface UserState {
  name: string;
  email: string;
  id: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setId: (id: string) => void;
  loginUser: (email: string, password: string) => void;
  loginUserBySession: (session: string) => void;
  logOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  email: '',
  id: '',
  setName: (name: string) => set((state) => ({ ...state, name })),
  setEmail: (email: string) => set((state) => ({ ...state, email })),
  setId: (id: string) => set((state) => ({ ...state, id })),
  loginUser: async (email: string, password: string) => {
    try {
      const user = await account.createEmailSession(email, password);
      localStorage.setItem('session', user.$id);
      localStorage.setItem('uid', user.userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  loginUserBySession: async (session: string) => {
    try {
      const user = await account.getSession(session);

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  logOut: async () => {
    const session = localStorage.getItem('session');
    session && (await account.deleteSession(session));
    localStorage.removeItem('session');
    localStorage.removeItem('uid');
  }
}));
