import { useRef } from 'react';
import { GraduationCap, Users } from 'lucide-react';
import { content } from '../data/content';
import { reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

export default function Background() {
  const ref = useRef(null);
  useMotion(ref, () => reveal(ref.current));
  return <section ref={ref} id="education" className="section background-section" aria-labelledby="background-title">
    <p className="eyebrow" data-reveal>06 / EDUCATION & LEADERSHIP</p><h2 id="background-title" className="section-title" data-reveal>Learning.<br /><span className="text-muted">Leading. Building.</span></h2>
    <div className="background-grid"><div><h3 className="background-label" data-reveal><GraduationCap size={22} />Academic record</h3>{content.education.map((item) => <article className="education-card" key={item.degree} data-reveal><p className="eyebrow text-accent">{item.year}</p><h4>{item.degree}</h4><p>{item.school}</p><p className="text-muted">{item.affiliation}</p><strong>{item.result}</strong></article>)}</div>
      <div id="leadership"><h3 className="background-label" data-reveal><Users size={22} />Community & leadership</h3><div className="leadership-card" data-reveal><h4>{content.leadership.organization}</h4><p className="eyebrow text-accent">{content.leadership.tenure}</p><ol>{content.leadership.roles.map((item) => <li key={item.role}><h5>{item.role}</h5><p>{item.period}</p><span className="text-muted">{item.duration}</span></li>)}</ol></div></div>
    </div>
  </section>;
}
