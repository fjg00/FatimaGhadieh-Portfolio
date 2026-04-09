import { useEffect, useRef } from 'react';

interface VibeCanvasProps {
  isPlayMode: boolean;
  mathTarget: {x: number, y: number} | null;
  resetMathTarget: () => void;
}

const VibeCanvas = ({ isPlayMode, mathTarget, resetMathTarget }: VibeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numParticles = 250;
    let particles: {x: number, y: number, vx: number, vy: number}[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    // Math Filter State
    let filtering = false;
    let filterTimer = 0;
    let filterTarget = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlayMode) {
        
        if (mathTarget) {
           filtering = true;
           filterTimer = 60; // frames
           filterTarget = { ...mathTarget };
           resetMathTarget();
        }

        ctx.fillStyle = 'rgba(124, 131, 188, 0.4)'; // Indigo particles

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          if (filtering) {
            // Apply Gaussian distribution polarization target
            // Normal distribution: y = a * e^(-(x-b)^2 / 2c^2)
            const c = 300; // spread
            const a = 200; // peak height
            
            // X stays roughly same but drift towards center slightly
            const targetX = p.x;
            const distFromCenter = targetX - filterTarget.x;
            
            // Calculate height off the click Y axis
            const gaussianOffset = a * Math.exp(-(distFromCenter * distFromCenter) / (2 * c * c));
            const targetY = filterTarget.y - gaussianOffset;
            
            // Move particle drastically to target
            p.vx += (targetX - p.x) * 0.05;
            p.vy += (targetY - p.y) * 0.05;
            
          } else {
            // Ambient Noise (Brownian)
            p.vx += (Math.random() - 0.5) * 0.1;
            p.vy += (Math.random() - 0.5) * 0.1;
            
            // Gravity Well (Cursor attraction logic)
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
              const force = (200 - dist) / 200;
              p.vx += (dx / dist) * force * 0.8;
              p.vy += (dy / dist) * force * 0.8;
            }
          }

          // Damping and limits
          const damping = 0.95;
          p.vx *= damping;
          p.vy *= damping;
          
          // Speed limit
          const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
          if (speed > 8) {
             p.vx = (p.vx / speed) * 8;
             p.vy = (p.vy / speed) * 8;
          }

          p.x += p.vx;
          p.y += p.vy;
          
          // Wrap screen
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (filtering) {
          filterTimer--;
          if (filterTimer <= 0) filtering = false;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isPlayMode, mathTarget, resetMathTarget]);

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
