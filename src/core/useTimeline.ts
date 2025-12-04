import { create } from "zustand";

interface TimelineState {
  globalTime: number;
  isPlaying: boolean;
  duration: number;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export const useTimeline = create<TimelineState>((set, get) => {
  let lastFrame = 0;

  function loop(timestamp: number) {
    if (!get().isPlaying) return;

    const dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;

    const newTime = get().globalTime + dt;

    if (newTime >= get().duration) {
      set({ isPlaying: false, globalTime: get().duration });
      return;
    }

    set({ globalTime: newTime });
    requestAnimationFrame(loop);
  }

  return {
    globalTime: 0,
    isPlaying: false,
    duration: 120,
    play: () => {
      if (!get().isPlaying) {
        set({ isPlaying: true });
        lastFrame = performance.now();
        requestAnimationFrame(loop);
      }
    },
    pause: () => set({ isPlaying: false }),
    reset: () => set({ globalTime: 0, isPlaying: false }),
  };
});
