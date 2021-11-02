import { themeStyle, themeType } from './../utils/themeUtils';
import create from 'zustand';

let savedTheme: keyof typeof themeStyle | null;
if (typeof window !== 'undefined') {
  savedTheme = localStorage.getItem('theme') as keyof typeof themeStyle;
}

export type GithubUser = {
  avatarUrl: string
  bio: string
  name: string
  login: string
  createdAt: string
  followerCount: number
  followingCount: number
  location: string
  twitterUsername: string
  repositoryCount: string
  websiteUrl: string
  company: string
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
