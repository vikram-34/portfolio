// Illustrative technology diagrams use the actual project's published stack.
// These are labeled overviews, not screenshots or invented product interfaces.
export default function ProjectArt({ project }) {
  return <div className={`project-art architecture-art architecture-${project.theme}`} aria-hidden="true">
    <div className="architecture-sheet">
      <div className="architecture-top"><span>PA / ENGINEERING</span><span>{project.number}</span></div>
      <h4>{project.name}</h4><p>{project.type}</p>
      <div className="architecture-flow">{project.visualNodes.map((node, index) => <div className="architecture-node" key={node}><small>{String(index + 1).padStart(2, '0')}</small><span>{node}</span></div>)}</div>
      <div className="architecture-bottom">TECHNOLOGY OVERVIEW <span>↗</span></div>
    </div>
  </div>;
}
