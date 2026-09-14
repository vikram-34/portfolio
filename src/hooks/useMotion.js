import { useLayoutEffect, useSyncExternalStore } from 'react';
import { gsap } from '../lib/motion';
import { useUI } from '../lib/store';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
export function useReducedMotion() {
  const preferred = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
  const paused = useUI((state) => state.paused);
  return preferred || paused;
}
export function useMotion(scope, build, dependencies = []) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(build, scope);
    return () => context.revert();
    // The caller declares the reactive values consumed by build.
  }, [reduced, ...dependencies]);
  return reduced;
}
