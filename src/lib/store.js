import { create } from 'zustand';

export const useUI = create((set) => ({
  ready: false, paused: false, project: null,
  setReady: () => set({ ready: true }),
  toggleMotion: () => set((state) => ({ paused: !state.paused })),
  openProject: (project) => set({ project }),
  closeProject: () => set({ project: null }),
}));
