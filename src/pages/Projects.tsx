import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Projects = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <header className="page-header" style={{position:'relative'}}>
        <h1>Projects</h1>
        <p className="page-desc">Engineering &bull; Vibe Code</p>
        <span className="annotation" style={{position: 'absolute', top: '1rem', right: '0rem'}}>
          (My favorite stuff)
        </span>
      </header>

      <div className="tactile-grid">
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
           <span className="item-meta">Rust &middot; CLI</span>
           <h3 className="item-title">Terminal Task Runner</h3>
           <p className="item-desc">A lightweight CLI tool to automate daily research scripts. Built entirely in Rust with high concurrency support and precision output.</p>
           <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             <a href="#" className="tactile-btn" style={{backgroundColor: 'var(--accent-clay)', color: 'white'}}>Repository</a>
           </div>
        </motion.div>

        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
           <span className="item-meta">D3.js &middot; React &middot; Python</span>
           <h3 className="item-title">ML Visualization Board</h3>
           <p className="item-desc">An interactive dashboard to visualize neural network attention mechanisms for interpretability experiments using generative aesthetic coding techniques.</p>
           <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             <a href="#" className="tactile-btn" style={{backgroundColor: 'var(--accent-indigo)', color: 'white'}}>Live Demo</a>
             <a href="#" className="tactile-btn">Source</a>
           </div>
        </motion.div>
        
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
           <span className="item-meta">React &middot; Setup</span>
           <h3 className="item-title">Tactile Dynamics Engine</h3>
           <p className="item-desc">A highly sophisticated state-space portfolio interface designed with physical bounds, bouncy physics, and a dual-voice toggle.</p>
           <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             <a href="#" className="tactile-btn">Source</a>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
