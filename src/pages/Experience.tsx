import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import type { VibeContextType } from '../components/Layout';

// Draggable box component that forcibly updates arrow rendering on drag frame
const TransferBlock = ({ id, title, label, x, y, isPlayMode, color = 'var(--text-primary)' }: any) => {
  const updateXarrow = useXarrow();
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
        zIndex: 10
      }}
      drag={isPlayMode}
      dragMomentum={false}
      onDrag={updateXarrow}
      whileDrag={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0,0,0,0.15)' }}
    >
      <span className="item-meta" style={{ color: color }}>{label}</span>
      <h3 className="item-title" style={{ fontSize: '1.1rem', margin: 0 }}>{title}</h3>
    </motion.div>
  );
};

const SummingJunction = ({ id, x, y, isPlayMode }: any) => {
  const updateXarrow = useXarrow();
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
      onDrag={updateXarrow}
    >
      +
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
            (Drag the blocks around!)
          </span>
        )}
      </header>

      {/* The Diagram Field */}
      <div style={{ position: 'relative', width: '100%', height: '600px', marginTop: '2rem' }}>
        <Xwrapper>
          
          <div id="signal-in" style={{ position: 'absolute', left: '-50px', top: '120px' }}>
            <span className="math-text">x(t)</span>
          </div>

          <TransferBlock 
            id="block-bsc" title="B.Sc. in System Engineering" label="G_1(s)" 
            x="50px" y="100px" isPlayMode={isPlayMode} color="var(--accent-clay)"
          />

          <TransferBlock 
            id="block-epfl" title="EPFL Research Internship" label="H_1(s)" 
            x="450px" y="0px" isPlayMode={isPlayMode} color="var(--accent-indigo)"
          />

          <SummingJunction 
            id="junction-1" x="430px" y="240px" isPlayMode={isPlayMode}
          />

          <TransferBlock 
            id="block-phd" title="Direct Ph.D. Candidate" label="G_2(s)" 
            x="540px" y="222px" isPlayMode={isPlayMode} color="var(--accent-clay)"
          />

          <div id="signal-out" style={{ position: 'absolute', left: '900px', top: '270px' }}>
            <span className="math-text">y(t)</span>
          </div>

          {/* Connections */}
          <Xarrow start="signal-in" end="block-bsc" color={arrowColor} strokeWidth={2} path="straight" />
          <Xarrow start="block-bsc" end="block-epfl" color={arrowColor} strokeWidth={2} path="grid" />
          <Xarrow start="block-bsc" end="junction-1" color={arrowColor} strokeWidth={2} path="grid" />
          <Xarrow start="block-epfl" end="junction-1" color={arrowColor} strokeWidth={2} path="grid" headSize={4} headShape="arrow1" />
          <Xarrow start="junction-1" end="block-phd" color={arrowColor} strokeWidth={2} path="straight" />
          <Xarrow start="block-phd" end="signal-out" color={arrowColor} strokeWidth={2} path="straight" />

        </Xwrapper>
      </div>
    </div>
  );
};

export default Experience;
