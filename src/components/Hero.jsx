import { lazy, Suspense, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { content } from '../data/content';
import { useMotion } from '../hooks/useMotion';
import { gsap, SplitText } from '../lib/motion';
import { useUI } from '../lib/store';
import Magnetic from './Magnetic';
const HeroScene = lazy(() => import('../scenes/HeroScene'));

export default function Hero() {
  const ref = useRef(null);
  const ready = useUI((state) => state.ready);
  useMotion(ref, () => {
    if (!ready) return;
    const split = SplitText.create('.hero-title', { type: 'chars', aria: 'auto' });
    // Reveal the headline first, then supporting copy and actions in a single sequence.
    gsap.timeline().from(split.chars, { yPercent: 95, rotation: 4, opacity: 0, stagger: 0.024, duration: 0.85, ease: 'power4.out' })
      .from('.hero-support', { y: 25, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.45');
    gsap.to('.hero-orbit-label', { y: -85, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    return () => split.revert();
  }, [ready]);
  return <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
    <Suspense fallback={<div className="scene-fallback" />}><HeroScene /></Suspense>
    <div className="hero-topline eyebrow hero-support"><span><i className="availability-dot" />{content.available ? content.availability : 'SDE & BACKEND ENGINEERING'}</span><span>PORTFOLIO — {new Date().getFullYear()}</span></div>
    <div className="hero-copy"><p className="eyebrow hero-support">{content.name} / {content.role}</p><h1 id="hero-title" className="hero-title">{content.headline[0]}<br /><span>{content.headline[1]}</span></h1>
      <p className="hero-description hero-support">{content.intro}</p>
      <div className="hero-actions hero-support"><Magnetic><a href="#work" className="button button-primary">Explore my work <ArrowDown size={18} /></a></Magnetic><Magnetic><a href={content.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume (opens new tab)" className="text-link">View my resume <ArrowUpRight size={18} /></a></Magnetic></div>
    </div>
    <div className="hero-orbit-label eyebrow"><span>FIG. 001</span><span>A STUDY IN<br />FORM & FUNCTION</span></div>
    <div className="hero-bottom hero-support"><span className="eyebrow">BASED IN {content.location.toUpperCase()}<br /><span className="text-muted">OPEN TO SDE / BACKEND OPPORTUNITIES</span></span><a href="#about" className="scroll-cue eyebrow">SCROLL TO DISCOVER <ArrowDown size={16} /></a></div>
  </section>;
}
