import { useEffect, useState } from 'react';

const CursorHover = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.getAttribute('data-hover-img');
      if (img) {
         setActiveImage(img);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('data-hover-img')) {
         setActiveImage(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        transform: `translate(${position.x + 20}px, ${position.y + 20}px)`,
        opacity: activeImage ? 1 : 0,
        transition: 'opacity 0.3s ease-out, transform 0.1s linear',
      }}
    >
      {activeImage && (
        <img 
          src={activeImage} 
          alt="Hover Preview" 
          style={{ width: '300px', height: 'auto', border: '1px solid black', display: 'block', backgroundColor: 'white' }} 
        />
      )}
    </div>
  );
};

export default CursorHover;
