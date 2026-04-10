import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

// Custom dynamic SVG arrow that renders natively mapping between DOM nodes
const DynamicArrow = ({ start, end, color }: { start: string, end: string, color: string }) => {
  const [path, setPath] = useState('');

  useEffect(() => {
    let animationFrameId: number;
    const updatePath = () => {
      const startEl = document.getElementById(start);
      const endEl = document.getElementById(end);
      const containerEl = document.getElementById('diagram-container');

      if (startEl && endEl && containerEl) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        // Calculate centers of source and target
        const startX = startRect.left + startRect.width / 2 - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;
        const endX = endRect.left + endRect.width / 2 - containerRect.left;
        const endY = endRect.top + endRect.height / 2 - containerRect.top;

        // Bounding box offsets so lines don't enter the center but stick to edges
        const startRadius = startRect.width / 2;
        const endRadius = endRect.width / 2;

        // Approximate where to attach lines relative to boundaries
        let adjustedStartX = startX;
        let adjustedStartY = startY;
        let adjustedEndX = endX;
        let adjustedEndY = endY;

        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
          adjustedStartX += (endX > startX ? 1 : -1) * startRadius;
          adjustedEndX += (startX > endX ? 1 : -1) * endRadius;
        } else {
          adjustedStartY += (endY > startY ? 1 : -1) * (startRect.height / 2);
          adjustedEndY += (startY > endY ? 1 : -1) * (endRect.height / 2);
        }

        // Smooth bezier curve formula for organic lines
        const controlPointX = (adjustedStartX + adjustedEndX) / 2;
        
        const newPath = `M ${adjustedStartX} ${adjustedStartY} C ${controlPointX} ${adjustedStartY}, ${controlPointX} ${adjustedEndY}, ${adjustedEndX} ${adjustedEndY}`;
        setPath(newPath);
      }
      animationFrameId = requestAnimationFrame(updatePath);
    };

    updatePath();
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, end]);

  if (!path) return null;

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'visible' }}>
      <defs>
        <marker id={`arrowhead-${start}-${end}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <path d={path} stroke={color} strokeWidth="2" fill="none" markerEnd={`url(#arrowhead-${start}-${end})`} />
    </svg>
  );
};

const TransferBlock = ({ id, title, label, x, y, isPlayMode, color = 'var(--text-primary)' }: any) => {
  return (
    <motion.div
      id={id}
      className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        border: `2px solid ${isPlayMode ? 'transparent' : color}`,
        width: '320px',
        padding: '1.5rem',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
      drag={isPlayMode}
      dragMomentum={false}
      whileDrag={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0,0,0,0.15)', zIndex: 20 }}
    >
      <span className="item-meta" style={{ color: color }}>{label}</span>
      <h3 className="item-title" style={{ fontSize: '1.1rem', margin: 0 }}>{title}</h3>
    </motion.div>
  );
};

const SummingJunction = ({ id, x, y, isPlayMode }: any) => {
  return (
    <motion.div
      id={id}
      className={isPlayMode ? "draggable" : ""}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '3px solid var(--accent-indigo)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        zIndex: 10,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--accent-indigo)'
      }}
      drag={isPlayMode}
      dragMomentum={false}
      whileDrag={{ scale: 1.1, zIndex: 20 }}
    >
      +
    </motion.div>
  );
};

const SignalNode = ({ id, label, x, y, isPlayMode }: any) => {
  return (
    <motion.div
      id={id}
      className={isPlayMode ? "draggable" : ""}
      style={{ position: 'absolute', left: x, top: y, zIndex: 10, background: 'transparent', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
      drag={isPlayMode}
      dragMomentum={false}
    >
      <span className="math-text" style={{ fontSize: '1.2rem' }}>{label}</span>
    </motion.div>
  );
};

const Experience = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();
  const arrowColor = isPlayMode ? 'var(--text-muted)' : 'var(--text-primary)';

  return (
    <div className="section-padding page-container" style={{ position: 'relative', minHeight: '800px', overflow: 'hidden' }}>
      <header className="page-header">
        <h1>Experience</h1>
        <p className="page-desc">System Transfer Function</p>
        {isPlayMode && (
          <span className="annotation" style={{ position: 'absolute', top: '2rem', right: '0rem' }}>
            (Drag the blocks and lines around!)
          </span>
        )}
      </header>

      <div id="diagram-container" style={{ position: 'relative', width: '100%', height: '600px', marginTop: '2rem' }}>
          
          <SignalNode id="signal-in" label="x(t)" x="0px" y="115px" isPlayMode={isPlayMode} />

          <TransferBlock 
            id="block-bsc" title="B.Sc. in System Engineering" label="G_1(s)" 
            x="100px" y="100px" isPlayMode={isPlayMode} color="var(--accent-clay)"
          />

          <TransferBlock 
            id="block-epfl" title="EPFL Research Internship" label="H_1(s)" 
            x="500px" y="0px" isPlayMode={isPlayMode} color="var(--accent-indigo)"
          />

          <SummingJunction 
            id="junction-1" x="480px" y="240px" isPlayMode={isPlayMode}
          />

          <TransferBlock 
            id="block-phd" title="Direct Ph.D. Candidate" label="G_2(s)" 
            x="590px" y="222px" isPlayMode={isPlayMode} color="var(--accent-clay)"
          />

          <SignalNode id="signal-out" label="y(t)" x="950px" y="235px" isPlayMode={isPlayMode} />

          <DynamicArrow start="signal-in" end="block-bsc" color={arrowColor} />
          <DynamicArrow start="block-bsc" end="block-epfl" color={arrowColor} />
          <DynamicArrow start="block-bsc" end="junction-1" color={arrowColor} />
          <DynamicArrow start="block-epfl" end="junction-1" color={arrowColor} />
          <DynamicArrow start="junction-1" end="block-phd" color={arrowColor} />
          <DynamicArrow start="block-phd" end="signal-out" color={arrowColor} />

      </div>
    </div>
  );
};

export default Experience;
