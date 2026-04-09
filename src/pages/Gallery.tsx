import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Gallery = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <header className="page-header">
        <h1>Archive</h1>
        <p className="page-desc">Visual Log</p>
      </header>

      <div className="tactile-grid">
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{padding: '1.5rem'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
          <img src="/conf_pic.png" alt="Presenting at an academic conference" style={{width: '100%', borderRadius: '12px', display: 'block'}} />
          <p className="item-title" style={{fontSize: '1rem', marginTop: '1rem', textAlign: 'center'}}>Research Presentation</p>
        </motion.div>
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{padding: '1.5rem'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
          <img src="/desk_pic.png" alt="Workspace" style={{width: '100%', borderRadius: '12px', display: 'block'}} />
          <p className="item-title" style={{fontSize: '1rem', marginTop: '1rem', textAlign: 'center'}}>Engineering Workspace</p>
        </motion.div>
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{padding: '1.5rem'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
          <img src="/lab_pic.png" alt="Lab Collaboration" style={{width: '100%', borderRadius: '12px', display: 'block'}} />
          <p className="item-title" style={{fontSize: '1rem', marginTop: '1rem', textAlign: 'center'}}>Team Brainstorm</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
