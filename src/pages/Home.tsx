import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Home = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <div className="tactile-grid" style={{gridTemplateColumns: '1fr'}}>
        
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        >
          <div style={{display: 'flex', gap: '4rem', alignItems: 'center'}}>
            <div style={{flex: 1, position: 'relative'}}>
              <span className="item-meta">Introduce</span>
              <h2 style={{fontSize: '2.5rem'}}>Hello, I'm Fatima.</h2>
              <p>
                I am a researcher passionate about solving complex problems at the intersection of technology and society. My work focuses on building robust systems that empower communities and advance academic frontiers. 
              </p>
              
              <span className="annotation" style={{position: 'absolute', top: '-1rem', right: '0rem'}}>
                &larr; Drag this card!
              </span>
            </div>
            
            <div style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
               <img src="/conf_pic.png" alt="Fatima" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        >
          <span className="item-meta">Latest Log</span>
          <h3 className="item-title">Paper accepted to WebConf '26</h3>
          <p className="item-desc" style={{margin: 0}}>San Francisco, CA</p>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
