import { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../lib/store';
import { scrollEngine } from '../lib/motion';
import { useReducedMotion } from '../hooks/useMotion';
import ProjectArt from './ProjectArt';

export default function CaseStudy() {
  const project = useUI((state) => state.project), close = useUI((state) => state.closeProject);
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current, previous = document.activeElement;
    const overflow = document.body.style.overflow;
    scrollEngine.current?.stop(); document.body.style.overflow = 'hidden';
    dialog.showModal(); dialog.scrollTop = 0;
    return () => { dialog.close(); document.body.style.overflow = overflow; scrollEngine.current?.start(); previous?.focus({ preventScroll: true }); };
  }, [project]);
  return <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === ref.current) close(); }} data-lenis-prevent>
    {project && <motion.article className="case-content" initial={reduced ? false : { y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="case-top"><span className="eyebrow">PROJECT / {project.number} / {project.type}</span><button autoFocus className="icon-button" aria-label="Close case study" onClick={close}><X /></button></div>
      <h2 id="case-title">{project.name}</h2><p className="case-subtitle">{project.title}</p><ProjectArt project={project} />
      <section className="case-section"><h3>The project</h3><p>{project.summary}</p></section>
      <section className="case-section"><h3>What it does</h3><ul className="detail-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
      <section className="case-section"><h3>Technology</h3><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
      <a className="button button-primary" href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub (opens new tab)`}><Github size={18} />View repository<ArrowUpRight size={18} /></a>
    </motion.article>}
  </dialog>;
}
