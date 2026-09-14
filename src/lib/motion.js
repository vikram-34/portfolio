import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };
// GSAP is the single clock for Lenis and the shader's elapsed time.
export const motionClock = { time: 0, scroll: 0 };
export const scrollEngine = { current: null };

export function reveal(scope) {
  // Alternating offsets and small child staggers preserve each section's hierarchy.
  gsap.utils.toArray('[data-reveal]', scope).forEach((element, index) => {
    gsap.from(element, {
      y: index % 2 ? 30 : 52, opacity: 0, duration: 0.85,
      ease: 'power3.out', delay: (index % 3) * 0.055,
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
    });
  });
}
