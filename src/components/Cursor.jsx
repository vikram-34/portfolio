import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { useReducedMotion } from '../hooks/useMotion';

export default function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const context = gsap.context(() => {
      const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.3, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.3, ease: 'power3.out' });
      const dotX = gsap.quickSetter(dot.current, 'x', 'px'), dotY = gsap.quickSetter(dot.current, 'y', 'px');
      function move(event) { dotX(event.clientX); dotY(event.clientY); ringX(event.clientX); ringY(event.clientY); gsap.set([dot.current, ring.current], { opacity: 1 }); }
      function over(event) {
        const target = event.target.closest('a, button, input, textarea, [data-cursor]');
        ring.current.dataset.mode = target?.closest('[data-cursor="view"]') ? 'view' : target ? 'active' : '';
      }
      function hide() { gsap.set([dot.current, ring.current], { opacity: 0 }); }
      window.addEventListener('pointermove', move);
      document.addEventListener('pointerover', over);
      document.documentElement.addEventListener('pointerleave', hide);
      window.addEventListener('blur', hide);
      return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); document.documentElement.removeEventListener('pointerleave', hide); window.removeEventListener('blur', hide); };
    });
    return () => context.revert();
  }, [reduced]);
  if (reduced) return null;
  return <div aria-hidden="true" className="cursor-layer"><div className="cursor-dot" ref={dot} /><div className="cursor-ring" ref={ring}><span>VIEW</span></div></div>;
}
