import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const Updates = () => {
  const { isPlayMode } = useOutletContext<VibeContextType>();

  return (
    <div className="section-padding page-container">
      <header className="page-header">
        <h1>Timeline</h1>
        <p className="page-desc">Action Log</p>
      </header>

      <div className="tactile-grid" style={{gridTemplateColumns: 'minmax(300px, 1fr)'}}>
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{flexDirection: 'row', gap: '2rem', alignItems: 'center'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
           <div><span className="item-meta" style={{margin: 0}}>04.2026</span></div>
           <div>
             <h3 className="item-title">Paper Accepted at WebConf '26</h3>
             <p className="item-desc" style={{margin: 0}}>Our paper on portfolio architectures has been accepted for presentation.</p>
           </div>
        </motion.div>
        
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{flexDirection: 'row', gap: '2rem', alignItems: 'center'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
           <div><span className="item-meta" style={{margin: 0}}>12.2025</span></div>
           <div>
             <h3 className="item-title">Guest Speaker at Systems Seminar</h3>
             <p className="item-desc" style={{margin: 0}}>Delivered a talk on "Building Scalable Web Interfaces" to the department.</p>
           </div>
        </motion.div>
        
        <motion.div 
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          style={{flexDirection: 'row', gap: '2rem', alignItems: 'center'}}
          drag={isPlayMode} dragSnapToOrigin={true}
        >
           <div><span className="item-meta" style={{margin: 0}}>09.2025</span></div>
           <div>
             <h3 className="item-title">Awarded Best TA for CSC300</h3>
             <p className="item-desc" style={{margin: 0}}>Honored to receive the departmental teaching award for work in Computers and Society.</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Updates;
