import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemLoaderProps {
  onComplete: () => void;
}

const SystemLoader = ({ onComplete }: SystemLoaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;
    const duration = 2500; // 2.5 seconds total loading
    const startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      
      // Calculate damping ratio zeta: 
      // Starts unstable (-0.1) and linearly becomes stable (1.0)
      const progress = Math.min(elapsed / duration, 1);
      const zeta = -0.1 + (progress * 1.1); // from -0.1 to 1.0
      
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      
      // Clear canvas with trace
      ctx.fillStyle = 'rgba(252, 251, 249, 0.4)'; // Milky bg
      ctx.fillRect(0, 0, width, height);

      // Draw target axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.stroke();

      // Render the curve
      ctx.beginPath();
      const points = 200;
      for (let i = 0; i < points; i++) {
        const x = (i / points) * width;
        // x_axis scaled by time
        const sim_t = (i / points) * 20 + t; 
        
        const omega = 1.5;
        let yDisp = 0;

        if (zeta < 1) {
          const wd = omega * Math.sqrt(Math.abs(1 - zeta * zeta));
          yDisp = Math.exp(-zeta * omega * sim_t) * Math.cos(wd * sim_t);
        } else {
          yDisp = Math.exp(-omega * sim_t);
        }

        const y = centerY - (yDisp * height * 0.2);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#D98A78'; // Clay Red plot
      ctx.lineWidth = 3;
      ctx.stroke();

      t += 0.05;

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Stabilized. Hold for 200ms then unmount
        setTimeout(() => {
          setComplete(true);
          onComplete();
        }, 200);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: 'var(--bg-color)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
          }}
        >
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
          <p style={{
            position: 'absolute', bottom: '2rem', 
            fontFamily: 'var(--font-math)', fontSize: '0.85rem', color: 'var(--accent-indigo)',
            zIndex: 10
          }}>
            [ SYSTEM IDENTIFICATION: Tuning Control Loop... ]
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemLoader;
