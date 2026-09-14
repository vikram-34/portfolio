import { useRef } from 'react';
import { content } from '../data/content';
import { gsap, reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

export default function Experience() {
  const ref = useRef(null);
  useMotion(ref, () => {
    reveal(ref.current);
    // Normalize path length so the SVG draws at the same pace at any screen height.
    gsap.from('.timeline-path', { strokeDashoffset: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 75%', scrub: true } });
    gsap.from('.timeline-node', { scale: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.timeline', start: 'top 80%', once: true } });
  });
  return <section ref={ref} id="experience" className="section experience" aria-labelledby="experience-title">
    <div className="experience-intro"><p className="eyebrow" data-reveal>04 / WORK EXPERIENCE</p><h2 id="experience-title" className="section-title" data-reveal>From code<br />to <span className="text-muted">production.</span></h2><p className="text-muted" data-reveal>Manufacturing systems, sales platforms, and the engineering that keeps them running.</p></div>
    <div className="timeline"><svg className="timeline-svg" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true"><path d="M1 0V100" stroke="#343830" strokeWidth="1" /><path className="timeline-path" d="M1 0V100" pathLength="1" stroke="#ff784f" strokeWidth="1" strokeDasharray="1" /></svg>
      {content.experience.map((item) => <article className="timeline-item" key={item.period}><span className="timeline-node" /><div data-reveal><p className="eyebrow text-accent">{item.period}</p><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><ul className="detail-list">{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}
    </div>
  </section>;
}
