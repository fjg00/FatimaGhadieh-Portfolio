import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import type { VibeContextType } from '../components/Layout';

const ProjectProjectile = ({ id, color, isPlayMode, triggerMathFilter, meta, title, desc, links }: any) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile avoiding SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force expanded state on mobile or when in Work Mode
  const isExpanded = isMobile || !isPlayMode || hovered;

  const handleInteraction = (e: any) => {
    if (triggerMathFilter && isPlayMode && !isExpanded) {
       triggerMathFilter(e.clientX, e.clientY);
    }
    setHovered(true);
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', minHeight: "250px", display: 'flex', alignItems: isExpanded ? 'stretch' : 'flex-start', justifyContent: isExpanded ? 'stretch' : 'center' }}
      onMouseEnter={handleInteraction}
      onMouseLeave={() => setHovered(false)}
      onClick={handleInteraction}
    >
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            layoutId={`proj-${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              width: '60px', height: '60px', backgroundColor: color,
              borderRadius: id % 2 === 0 ? '50%' : '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          />
        )}
      </AnimatePresence>
      
      {isExpanded && (
        <motion.div
          layoutId={`proj-${id}`}
          className={`tactile-card ${isPlayMode ? 'draggable' : ''}`}
          drag={isPlayMode}
          dragSnapToOrigin={true}
          style={{ width: '100%' }}
          transition={{ type: "spring", stiffness: 600, damping: 10, mass: 1 }}
        >
           <span className="item-meta">{meta}</span>
           <h3 className="item-title">{title}</h3>
           <p className="item-desc">{desc}</p>
           <div style={{marginTop: 'auto', display: 'flex', gap: '1rem'}}>
             {links.map((link: any, i: number) => (
                <a key={i} href="#" className="tactile-btn" style={link.bg ? {backgroundColor: link.bg, color: 'white'} : {}}>{link.text}</a>
             ))}
           </div>
        </motion.div>
      )}
    </div>
  );
};

const Projects = () => {
  const { isPlayMode, triggerMathFilter } = useOutletContext<VibeContextType>();

  const projects = [
    {
       id: 1, color: 'var(--accent-clay)', meta: 'Rust · CLI', title: 'Terminal Task Runner',
       desc: 'A lightweight CLI tool to automate daily research scripts. Built entirely in Rust with high concurrency support and precision output.',
       links: [{text: 'Repository', bg: 'var(--accent-clay)'}]
    },
    {
       id: 2, color: 'var(--accent-indigo)', meta: 'D3.js · React · Python', title: 'ML Visualization Board',
       desc: 'An interactive dashboard to visualize neural network attention mechanisms for interpretability experiments using generative aesthetic coding techniques.',
       links: [{text: 'Live Demo', bg: 'var(--accent-indigo)'}, {text: 'Source'}]
    },
    {
       id: 3, color: 'var(--text-secondary)', meta: 'React · Setup', title: 'Tactile Dynamics Engine',
       desc: 'A highly sophisticated state-space portfolio interface designed with physical bounds, bouncy physics, and a dual-voice toggle.',
       links: [{text: 'Source'}]
    }
  ];

  return (
    <div className="section-padding page-container">
      <header className="page-header" style={{position:'relative'}}>
        <h1>Projects</h1>
        <p className="page-desc"><span className="math-text">{"\\dot{x} = A x + B u"}</span></p>
        <span className="annotation" style={{position: 'absolute', top: '1rem', right: '0rem'}}>
          (Hover the shapes below!)
        </span>
      </header>

      <div className="tactile-grid">
        {projects.map(p => (
          <ProjectProjectile key={p.id} {...p} isPlayMode={isPlayMode} triggerMathFilter={triggerMathFilter} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
