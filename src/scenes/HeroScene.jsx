import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { MathUtils, Vector3 } from 'three';
import { vertexShader, fragmentShader } from './shaders';
import { motionClock } from '../lib/motion';
import { useReducedMotion } from '../hooks/useMotion';
import SceneBoundary from './SceneBoundary';
function Sculpture({ reduced, mobile }) {
  const mesh = useRef(null);
  const hover = useRef(0);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uStrength: { value: 0 }, uPointer: { value: new Vector3(8, 8, 8) } }), []);
  useFrame((state, delta) => {
    if (reduced || !mesh.current) return;
    const step = Math.min(delta, 0.05);
    uniforms.uTime.value = motionClock.time;
    uniforms.uStrength.value = MathUtils.damp(uniforms.uStrength.value, hover.current, 5, step);
    mesh.current.rotation.y += step * 0.095;
    mesh.current.rotation.x = MathUtils.damp(mesh.current.rotation.x, state.pointer.y * 0.12, 3, step);
    mesh.current.position.y = MathUtils.damp(mesh.current.position.y, -motionClock.scroll * 0.00045, 3, step);
  });
  // R3F owns and automatically disposes these declarative geometries/materials.
  return <Float enabled={!reduced} speed={1.3} rotationIntensity={0.16} floatIntensity={0.2}>
    <mesh ref={mesh} rotation={[0.15, 0.15, -0.28]} onPointerMove={(event) => { if (!reduced) { uniforms.uPointer.value.copy(mesh.current.worldToLocal(event.point.clone())); hover.current = 1; } }} onPointerOut={() => { hover.current = 0; }}>
      <torusKnotGeometry args={[1.35, 0.43, mobile ? 100 : 200, mobile ? 12 : 28, 2, 3]} />
      {mobile ? <meshStandardMaterial color="#fa784f" roughness={0.4} metalness={0.6} /> : <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />}
    </mesh>
    {!reduced && <Sparkles count={mobile ? 18 : 65} scale={[8, 6, 5]} size={mobile ? 1.5 : 2} speed={0.25} opacity={0.36} color="#ffd0b8" />}
  </Float>;
}
export default function HeroScene() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  const [lost, setLost] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    observer.observe(ref.current);
    const media = window.matchMedia('(max-width: 767px)');
    const resize = () => setMobile(media.matches);
    media.addEventListener('change', resize);
    return () => { observer.disconnect(); media.removeEventListener('change', resize); };
  }, []);
  return <div ref={ref} className="hero-canvas" aria-hidden="true">
    <SceneBoundary>{lost ? <div className="scene-fallback" /> : <Canvas dpr={[1, mobile ? 1.25 : 1.6]} camera={{ position: [0, 0, mobile ? 7.5 : 9.5], fov: 42 }} frameloop={visible && !reduced ? 'always' : 'demand'} gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }} fallback={<div className="scene-fallback" />} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', () => setLost(true), { once: true }); }}>
      <ambientLight intensity={0.6} /><directionalLight position={[-3, 5, 4]} intensity={4} />
      <Sculpture reduced={reduced} mobile={mobile} />
    </Canvas>}</SceneBoundary>
  </div>;
}
