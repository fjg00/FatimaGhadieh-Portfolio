import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Research = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <header className="page-header" style={{position: 'relative'}}>
        <h1>Publications</h1>
        <p className="page-desc"><span className="math-text">{"\\mathcal{S}"}</span>ystems &bull; <span className="math-text">ML</span> &bull; <span className="math-text">HCI</span></p>
        
        <span className="annotation" style={{position: 'absolute', top: '1rem', right: '0rem'}}>
          (Mostly systems)
        </span>
      </header>

      <div className="tactile-grid" style={{gridTemplateColumns: '1fr'}}>
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
          <span className="item-meta">Conference &bull; 2026</span>
          <h3 className="item-title">Automating Scalable Infrastructures for Academic Portfolios</h3>
          <p className="item-desc">
            <strong style={{color: 'var(--text-primary)'}}>Fatima Ghadieh</strong>, Collaborator Name, Advisor Name<br/><br/>
            In Proceedings of The Web Conference (WWW '26), San Francisco, CA.
          </p>
          <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             <a href="#" className="tactile-btn" style={{backgroundColor: 'var(--accent-clay)', color: 'white'}}>Read Paper</a>
             <a href="#" className="tactile-btn">View Code</a>
          </div>
        </motion.div>

        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
          <span className="item-meta">Symposium &bull; 2025</span>
          <h3 className="item-title">Some Important Systems Paper</h3>
          <p className="item-desc">
            Co-Author Name, <strong style={{color: 'var(--text-primary)'}}>Fatima Ghadieh</strong>, Advisor Name<br/><br/>
            ACM Symposium on Operating Systems Principles (SOSP '25).
          </p>
          <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             <a href="#" className="tactile-btn" style={{backgroundColor: 'var(--accent-indigo)', color: 'white'}}>Read Paper</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Research;
