import { themeType } from './../utils/themeUtils';
import create from 'zustand';

let savedTheme: string | null;
if (typeof window !== 'undefined') {
  savedTheme = localStorage.getItem('theme');
}

const useStore = create(set => ({
  theme: savedTheme || themeType.dark,
  setTheme: (newTheme: string) => {
    set({ theme: newTheme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  },
}));

export default useStore;
