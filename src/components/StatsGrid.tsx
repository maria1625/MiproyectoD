import React, { useEffect, useRef, useState } from 'react';
import { Activity, Clock, Cpu, HardDrive, RefreshCw, Sparkles, Zap } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState({
    hmrSpeed: 14,
    modulesCount: 142,
    memoryUsage: 38.4,
    requests: 89,
    serverUptime: '00:04:12'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Draw real-time performance sparkline on HTML Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw grid background lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw wave graph line
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;

      const points: { x: number; y: number }[] = [];
      for (let x = 0; x <= width; x += 10) {
        const y = height / 2 + Math.sin((x + offset) * 0.03) * 20 + Math.cos((x + offset * 0.5) * 0.05) * 10;
        points.push({ x, y });
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fill area under line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      offset += 1.5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        hmrSpeed: Math.floor(Math.random() * 8) + 10,
        modulesCount: 142 + Math.floor(Math.random() * 5),
        memoryUsage: +(35 + Math.random() * 6).toFixed(1),
        requests: metrics.requests + Math.floor(Math.random() * 10),
        serverUptime: metrics.serverUptime
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Metric Cards Grid */}
      <div className="grid-responsive">
        {/* Card 1 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Velocidad Vite HMR
            </span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '8px', borderRadius: '10px' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {metrics.hmrSpeed} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>ms</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={13} /> Recarga ultra rápida activa
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Módulos TypeScript
            </span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '8px', borderRadius: '10px' }}>
              <Cpu size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {metrics.modulesCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>módulos</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Compilación estricta sin errores
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Uso de Memoria Node
            </span>
            <div style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '8px', borderRadius: '10px' }}>
              <HardDrive size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {metrics.memoryUsage} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>MB</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            Optimizado para alto rendimiento
          </p>
        </div>

        {/* Card 4 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Tiempo Activo del Servidor
            </span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '8px', borderRadius: '10px' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {metrics.serverUptime}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Puerto local: http://localhost:5173
          </p>
        </div>
      </div>

      {/* Real-time Activity Canvas Chart Panel */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--accent-primary)" />
              Telemetría de Rendimiento en Tiempo Real
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              Respuesta del servidor dev y ciclo de renderizado React
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin' : ''} /> Refresh Telemetría
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={140}
          style={{ width: '100%', height: '140px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}
        />
      </div>
    </div>
  );
};
