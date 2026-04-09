import { useEffect, useRef } from 'react';

const MathCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: {x: number, y: number, vy: number, base_y: number}[] = [];
    const numPoints = 120;
    
    // Physics parameters for a second order transfer function approximation
    // G(s) = w_n^2 / (s^2 + 2*zeta*w_n*s + w_n^2)
    const k = 0.05; // Spring constant roughly equivalent to w_n^2
    const damping = 0.85; // Damping factor (1 - zeta)
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      points = [];
      const spacing = canvas.width / numPoints;
      for (let i = 0; i <= numPoints; i++) {
        points.push({
          x: i * spacing,
          y: canvas.height * 0.4,
          vy: 0,
          base_y: canvas.height * 0.4
        });
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

      // Process physics
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Mouse disturbance
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
           const force = Math.max(0, 150 - dist) / 150;
           p.vy += (mouse.vy * force * 0.05); // Inject momentum disturbance
        }

        // Spring restoration
        const extension = p.y - p.base_y;
        const restorationForce = -k * extension;
        
        p.vy += restorationForce;
        p.vy *= damping;
        p.y += p.vy;
      }

      // Draw the beautiful mathematical string
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      
      ctx.strokeStyle = 'rgba(163, 184, 204, 0.4)'; // Muted Periwinkle
      ctx.lineWidth = 2;
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

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
        pointerEvents: 'none'
      }}
    />
  );
};

export default MathCanvas;
