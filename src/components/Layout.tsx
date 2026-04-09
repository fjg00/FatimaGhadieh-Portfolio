import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import VibeCanvas from './VibeCanvas';
import SystemLoader from './SystemLoader';

export interface VibeContextType {
  isPlayMode: boolean;
  triggerMathFilter?: (x: number, y: number) => void;
}

const Layout = () => {
  const [isPlayMode, setIsPlayMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  // Optional trigger for the math filter communication from cards down to Canvas
  const [mathTarget, setMathTarget] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    if (isPlayMode) {
      document.body.classList.remove('work-mode');
    } else {
      document.body.classList.add('work-mode');
    }
  }, [isPlayMode]);

  const triggerMathFilter = (x: number, y: number) => setMathTarget({x, y});

  const routes = [
    { path: '/', label: 'About' },
    { path: '/research', label: 'Research' },
    { path: '/teaching', label: 'Teaching' },
    { path: '/projects', label: 'Projects' },
    { path: '/updates', label: 'Updates' },
    { path: '/gallery', label: 'Archive' }
  ];

  return (
    <>
      {!isLoaded ? (
        <SystemLoader onComplete={() => setIsLoaded(true)} />
      ) : (
        <>
          <VibeCanvas isPlayMode={isPlayMode} mathTarget={mathTarget} resetMathTarget={() => setMathTarget(null)} />
          <div className="app-container max-w-4xl">
            
            <div className="toggle-wrapper">
              <div className="toggle-container">
                <span className="toggle-label" style={{color: isPlayMode ? 'var(--accent-clay)' : 'var(--text-muted)'}}>Play</span>
                
                <div 
                  style={{
                    width: '40px', height: '24px', background: isPlayMode ? 'var(--accent-clay)' : '#ddd',
                    borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
                  }}
                  onClick={() => setIsPlayMode(!isPlayMode)}
                >
                  <div style={{
                    position: 'absolute', top: '2px', left: isPlayMode ? 'calc(100% - 22px)' : '2px',
                    width: '20px', height: '20px', background: 'white', borderRadius: '50%',
                    transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }} />
                </div>
                
                <span className="toggle-label" style={{color: !isPlayMode ? 'var(--accent-indigo)' : 'var(--text-muted)'}}>Work</span>
              </div>
            </div>

            <header className="global-header">
              <h1 className="header-title">Fatima Ghadieh</h1>
              <p className="header-subtitle">Systems & Society</p>
              
              <span className="annotation" style={{position: 'absolute', top: '1rem', right: '4rem'}}>
                (The Toggle Masterstroke! &uarr;)
              </span>

              <nav className="navbar">
                <div className="nav-links">
                  {routes.map(r => (
                    <NavLink 
                      key={r.path} 
                      to={r.path} 
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      end={r.path === '/'}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? (isPlayMode ? 'var(--accent-clay)' : 'var(--accent-indigo)') : 'transparent'
                      })}
                    >
                      {r.label}
                    </NavLink>
                  ))}
                </div>
              </nav>
            </header>

            <main className="main-content">
              <Outlet context={{ isPlayMode, triggerMathFilter } satisfies VibeContextType} />
            </main>

            <footer className="footer">
              <p className="footer-text">
                &copy; {new Date().getFullYear()} Fatima Ghadieh
              </p>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
