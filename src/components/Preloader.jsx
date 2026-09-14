import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { useUI } from '../lib/store';
import { useReducedMotion } from '../hooks/useMotion';
import { content } from '../data/content';

export default function Preloader() {
  const ref = useRef(null), number = useRef(null), bar = useRef(null);
  const setReady = useUI((state) => state.setReady);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setReady(); return; }
    let disposed = false, timeline;
    const counter = { value: 0 };
    let timeout;
    const fontWait = Promise.race([document.fonts.ready, new Promise((resolve) => { timeout = setTimeout(resolve, 1800); })]);
    fontWait.then(() => {
      if (disposed) return;
      // A brief introduction after fonts are ready, followed by a vertical curtain exit.
      timeline = gsap.timeline({ onComplete: setReady })
        .to(counter, { value: 100, duration: 0.7, ease: 'power2.out', onUpdate: () => { if (number.current) number.current.textContent = Math.round(counter.value).toString().padStart(3, '0'); } })
        .to(bar.current, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .to(ref.current, { yPercent: -100, duration: 0.65, ease: 'power4.inOut' }, '+=0.1');
    });
    return () => { disposed = true; clearTimeout(timeout); timeline?.kill(); };
  }, [reduced, setReady]);
  return <div ref={ref} className="preloader" aria-hidden="true"><span className="preloader-logo">{content.initials}<i>®</i></span><div className="loader-bottom"><span className="eyebrow">ENGINEERING AT SCALE</span><span className="loader-count"><span ref={number}>000</span>%</span></div><span ref={bar} className="loader-bar" /></div>;
}
