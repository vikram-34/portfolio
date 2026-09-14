import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motionClock } from '../lib/motion';
import { useReducedMotion } from '../hooks/useMotion';
import SceneBoundary from './SceneBoundary';

function Grain() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(() => { uniforms.uTime.value = motionClock.time; });
  return <mesh><planeGeometry args={[2, 2]} /><shaderMaterial transparent depthWrite={false} uniforms={uniforms}
    vertexShader={/* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`}
    fragmentShader={/* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){
        // Slow drifting cells reveal sparse, softly pulsing particles over fine grain.
        vec2 p = vUv * vec2(65.0, 38.0) + vec2(uTime * 0.04, uTime * 0.018);
        vec2 cell = floor(p);
        float seed = hash(cell);
        float dotLight = (1.0 - smoothstep(0.015, 0.12, length(fract(p) - 0.5))) * step(0.965, seed);
        float pulse = 0.55 + 0.45 * sin(uTime * 0.6 + seed * 25.0);
        float grain = hash(gl_FragCoord.xy) * 0.025;
        gl_FragColor = vec4(vec3(1.0, 0.52, 0.32), dotLight * pulse * 0.3 + grain);
      }
    `} /></mesh>;
}
export default function ContactScene() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(ref.current);
    const media = window.matchMedia('(max-width: 767px)');
    const resize = () => setMobile(media.matches);
    media.addEventListener('change', resize);
    return () => { observer.disconnect(); media.removeEventListener('change', resize); };
  }, []);
  // Mobile/reduced-motion readers keep the static CSS noise, without a second GL context.
  return <div ref={ref} className="contact-canvas" aria-hidden="true">{visible && !reduced && !mobile && !failed && <SceneBoundary><Canvas dpr={1} gl={{ alpha: true, antialias: false }} fallback={null} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => setFailed(true), { once: true })}><Grain /></Canvas></SceneBoundary>}</div>;
}
