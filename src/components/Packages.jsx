import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import { content } from '../data/content';
import { reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

export default function Packages() {
  const ref = useRef(null), timeout = useRef(null);
  const [copied, setCopied] = useState(false), [status, setStatus] = useState('');
  useMotion(ref, () => reveal(ref.current));
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy(command) {
    try { await navigator.clipboard.writeText(command); setCopied(true); setStatus('Command copied.'); clearTimeout(timeout.current); timeout.current = setTimeout(() => { setCopied(false); setStatus(''); }, 2500); }
    catch { setStatus('Select and copy the command shown above.'); }
  }
  return <section ref={ref} id="packages" className="section packages" aria-labelledby="packages-title">
    <p className="eyebrow" data-reveal>05 / NPM PACKAGES & BLOGS</p><h2 id="packages-title" className="section-title" data-reveal>Beyond the <span className="text-muted">codebase.</span></h2>
    <div className="package-grid">{content.packages.map((item) => <article key={item.name} className="package-card" data-reveal><Terminal size={28} strokeWidth={1.3} className="text-accent" /><h3>{item.name}</h3><p className="package-subtitle">{item.subtitle}</p><p className="text-muted">{item.description}</p><div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      {item.command && <div className="command-row"><code>{item.command}</code><button className="icon-button" onClick={() => copy(item.command)} aria-label={copied ? 'Command copied' : 'Copy CLI command'}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></div>}
      <div className="package-links">{item.links.map((link) => <a key={link.label} className="text-link" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}: ${link.label} (opens new tab)`}>{link.label}<ArrowUpRight size={16} /></a>)}</div>
    </article>)}</div><p className="eyebrow copy-status" role="status">{status}</p>
  </section>;
}
