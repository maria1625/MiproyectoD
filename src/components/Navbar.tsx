import React from 'react';
import { Layers, Moon, Sun, Zap, Terminal, CheckCircle2, Cpu, Globe } from 'lucide-react';

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, activeTab, setActiveTab }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Brand & Project Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
          color: '#ffffff'
        }}>
          <Zap size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.3rem', margin: 0, letterSpacing: '-0.02em' }}>
              Mi proyecto_D
            </h1>
            <span className="badge badge-indigo">
              <span className="pulse-dot" /> React + Vite + TS
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Entorno de Desarrollo Activo • Servidor Local
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '4px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        {[
          { id: 'dashboard', label: 'Panel Principal', icon: Layers },
          { id: 'tasks', label: 'Tareas & Features', icon: CheckCircle2 },
          { id: 'console', label: 'Consola Live', icon: Terminal },
          { id: 'showcase', label: 'Componentes', icon: Cpu }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'var(--gradient-brand)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.15)',
          padding: '4px 8px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setTheme('dark')}
            title="Modo Oscuro"
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              background: theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
              color: theme === 'dark' ? '#818cf8' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Moon size={16} />
          </button>
          <button
            onClick={() => setTheme('light')}
            title="Modo Claro"
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              background: theme === 'light' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
              color: theme === 'light' ? '#6366f1' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setTheme('cyberpunk')}
            title="Modo Cyberpunk"
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              background: theme === 'cyberpunk' ? 'rgba(236, 72, 153, 0.3)' : 'transparent',
              color: theme === 'cyberpunk' ? '#ec4899' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Globe size={16} />
          </button>
        </div>

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <Globe size={15} /> :5173
        </a>
      </div>
    </header>
  );
};
