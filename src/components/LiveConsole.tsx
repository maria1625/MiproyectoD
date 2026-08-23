import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, ShieldCheck, Copy, Check } from 'lucide-react';

interface LogEntry {
  id: number;
  time: string;
  type: 'info' | 'success' | 'warn' | 'system';
  message: string;
}

export const LiveConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, time: '09:42:15', type: 'system', message: 'Iniciando entorno Vite v6.0.0...' },
    { id: 2, time: '09:42:16', type: 'info', message: 'Cargando configuración vite.config.ts' },
    { id: 3, time: '09:42:17', type: 'success', message: 'Servidor Vite arrancado en http://localhost:5173' },
    { id: 4, time: '09:42:18', type: 'info', message: 'HMR conectado activamente (Hot Module Replacement)' },
    { id: 5, time: '09:42:20', type: 'success', message: 'Proyecto Mi proyecto_D compilado correctamente en 14ms.' },
  ]);

  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logContainerRef.current?.scrollTo({ top: logContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [logs]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;

    const newLog: LogEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      type: 'info',
      message: `$ ${inputCmd}`
    };

    setLogs(prev => [...prev, newLog]);

    const cmd = inputCmd.trim().toLowerCase();
    setInputCmd('');

    setTimeout(() => {
      let response = '';
      let type: LogEntry['type'] = 'success';

      if (cmd.includes('build')) {
        response = '✓ dist/assets/index.js 148.2 kB │ gzip: 44.1 kB — Compilación completada.';
      } else if (cmd.includes('status')) {
        response = '⚡ Servidor local corriendo en http://localhost:5173 — HMR 100% operativo';
      } else if (cmd.includes('clear')) {
        setLogs([]);
        return;
      } else {
        response = `Comando ejecutable recibido: "${cmd}". Ejecución limpia finalizada.`;
        type = 'system';
      }

      setLogs(prev => [...prev, {
        id: Date.now() + 1,
        time: new Date().toLocaleTimeString(),
        type,
        message: response
      }]);
    }, 400);
  };

  const copyLogs = () => {
    const text = logs.map(l => `[${l.time}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal color="var(--accent-cyan)" size={20} /> Terminal de Desarrollo & Logs de Vite
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Visualiza eventos HMR y salida del servidor en tiempo real
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={copyLogs} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar Logs'}
          </button>
          <button onClick={() => setLogs([])} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Limpiar
          </button>
        </div>
      </div>

      {/* Terminal Viewbox */}
      <div
        ref={logContainerRef}
        style={{
          background: '#090d16',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          height: '320px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {logs.map((log) => {
          let color = '#9ca3af';
          if (log.type === 'success') color = '#34d399';
          if (log.type === 'system') color = '#818cf8';
          if (log.type === 'warn') color = '#fbbf24';

          return (
            <div key={log.id} style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: '#4b5563', userSelect: 'none' }}>[{log.time}]</span>
              <span style={{ color }}>{log.message}</span>
            </div>
          );
        })}
      </div>

      {/* Command Prompt Input */}
      <form onSubmit={handleRunCommand} style={{ display: 'flex', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="input-field"
            placeholder="Escribe un comando (ej: npm run build, status, clear)..."
            value={inputCmd}
            onChange={(e) => setInputCmd(e.target.value)}
            style={{ fontFamily: 'var(--font-mono)', paddingLeft: '32px' }}
          />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
            $
          </span>
        </div>
        <button type="submit" className="btn btn-primary">
          <Play size={16} /> Ejecutar
        </button>
      </form>
    </div>
  );
};
