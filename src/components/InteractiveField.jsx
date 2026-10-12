import React, { useRef } from 'react';

const dots = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: (index * 37) % 100,
  y: (index * 61) % 100,
  size: 2 + (index % 4),
  delay: `${(index % 7) * -0.7}s`,
  duration: `${5 + (index % 5)}s`,
}));

export default function InteractiveField({ variant = 'cyan' }) {
  const ref = useRef(null);
  const move = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    ref.current.style.setProperty('--pointer-x', `${x * 18}px`);
    ref.current.style.setProperty('--pointer-y', `${y * 18}px`);
    ref.current.style.setProperty('--tilt-x', `${y * -3}deg`);
    ref.current.style.setProperty('--tilt-y', `${x * 3}deg`);
  };
  const reset = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--pointer-x', '0px');
    ref.current.style.setProperty('--pointer-y', '0px');
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
  };
  return <div ref={ref} className={`interactive-field field-${variant}`} onPointerDown={move} onPointerMove={move} onPointerUp={reset} onPointerCancel={reset} onPointerLeave={reset} aria-hidden="true"><div className="field-glow" /><div className="field-planet"><span /><i /><b /></div>{dots.map((dot) => <span key={dot.id} className="field-particle" style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size, animationDelay: dot.delay, animationDuration: dot.duration }} />)}</div>;
}
