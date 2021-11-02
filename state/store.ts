import { themeType } from './../utils/themeUtils';
import create from 'zustand';

let savedTheme: string | null;
if (typeof window !== 'undefined') {
  savedTheme = localStorage.getItem('theme');
}

interface GithubUser {
  name: string,
  username: string,
}

const useStore = create(set => ({
  theme: savedTheme || themeType.dark,
  userData: null,
  input: 'octocat',
  setTheme: (newTheme: string) => {
    set({ theme: newTheme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  },
  setUserData: (newUserData: GithubUser) => {
    set({ userData: newUserData });
  },
  setInput: (newInput: string) => {
    set({ input: newInput });
  }
}));

export default useStore;
