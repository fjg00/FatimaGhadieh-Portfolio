import { useEffect, useRef } from 'react';

interface VibeCanvasProps {
  isPlayMode: boolean;
}

const VibeCanvas = ({ isPlayMode }: VibeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: {baseX: number, baseY: number, x: number, y: number, vx: number, vy: number}[] = [];
    const spacing = 30; // Distance between dots
    
    // Spring physics constants
    const k = 0.05; // Spring constant (return to origin)
    const damping = 0.8; // Dampens the oscillation
    
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      dots = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            baseX: x, baseY: y,
            x: x, y: y,
            vx: 0, vy: 0
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse = { ...mouse };
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlayMode) {
        // Render interacting dots
        ctx.fillStyle = 'rgba(124, 131, 188, 0.5)'; // Soft Indigo dots
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          
          // Repulsion disturbance
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
             const force = (100 - dist) / 100;
             dot.vx -= (dx / dist) * force * 2;
             dot.vy -= (dy / dist) * force * 2;
          }

          // Return to grid
          const restX = dot.x - dot.baseX;
          const restY = dot.y - dot.baseY;
          
          dot.vx += -k * restX;
          dot.vy += -k * restY;
          
          dot.vx *= damping;
          dot.vy *= damping;
          
          dot.x += dot.vx;
          dot.y += dot.vy;
          
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // If in work mode, either don't draw or draw rigid faint dots
        // Actually the prompt says "the dot-grid disappears".
        // We'll clear the canvas implicitly by resting.
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isPlayMode]); // Re-run effect or rely on state inside frame

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: isPlayMode ? 1 : 0,
        transition: 'opacity 0.6s ease'
      }}
    />
  );
};

export default VibeCanvas;
