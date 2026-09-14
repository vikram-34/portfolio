import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useMotion';

export default function Magnetic({ children, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });
  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.16);
    y.set((event.clientY - box.top - box.height / 2) * 0.16);
  }
  return <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>;
}
