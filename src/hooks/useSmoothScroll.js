import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, motionClock, scrollEngine } from '../lib/motion';
import { useReducedMotion } from './useMotion';

export function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    scrollEngine.current = lenis;
    const update = () => {
      motionClock.scroll = window.scrollY;
      ScrollTrigger.update();
    };
    lenis.on('scroll', update);
    const tick = (time) => { motionClock.time = time; lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', update);
      lenis.destroy();
      scrollEngine.current = null;
    };
  }, [reduced]);
}
