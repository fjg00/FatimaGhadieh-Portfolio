import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Teaching = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <header className="page-header">
        <h1>Teaching</h1>
        <p className="page-desc">Instruction &amp; Mentorship</p>
      </header>

      <div className="tactile-grid">
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
           <span className="item-meta">Fall 2025</span>
           <h3 className="item-title">CSC300: Computers & Society</h3>
           <p className="item-desc" style={{marginBottom: '0.5rem', fontWeight: 600, color: 'var(--accent-indigo)'}}>Head Teaching Assistant</p>
           <p className="item-desc" style={{margin: 0}}>Managed a team of 5 TAs, led weekly tutorial sections of 40+ students, and specialized in algorithmic fairness and ethics discussions.</p>
        </motion.div>

        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
           <span className="item-meta">Winter 2024</span>
           <h3 className="item-title">CSC207: Software Design</h3>
           <p className="item-desc" style={{marginBottom: '0.5rem', fontWeight: 600, color: 'var(--accent-indigo)'}}>Teaching Assistant</p>
           <p className="item-desc" style={{margin: 0}}>Facilitated weekly labs, taught design patterns (MVC, Singleton), grading Java and clean code principles.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Teaching;
