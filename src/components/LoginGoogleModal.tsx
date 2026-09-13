import React, { useState } from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

export interface GoogleUser {
  nombre: string;
  email: string;
  fotoUrl: string;
  proveedor: 'google';
}

interface LoginGoogleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: GoogleUser) => void;
}

export const LoginGoogleModal: React.FC<LoginGoogleModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [cargando, setCargando] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setCargando(true);

    // Simulación de autenticación OAuth de Google rápida sin contraseña
    setTimeout(() => {
      const mockUser: GoogleUser = {
        nombre: 'María Camila Rodríguez',
        email: 'maria.rodriguez@gmail.com',
        fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        proveedor: 'google'
      };
      setCargando(false);
      onLoginSuccess(mockUser);
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        maxWidth: '440px',
        width: '100%',
        padding: '32px',
        boxShadow: '0 20px 50px rgba(0, 51, 153, 0.2)',
        border: '1px solid #e2e8f0',
        position: 'relative',
        animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(0, 51, 153, 0.08)',
            color: '#003399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto'
          }}>
            <ShieldCheck size={30} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#003399', margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>
            Iniciar Sesión Institucional
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Accede rápidamente con tu cuenta de Google sin necesidad de contraseña inicial.
          </p>
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#1e293b',
            fontWeight: 700,
            fontSize: '0.98rem',
            cursor: cargando ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          {/* SVG Oficial de Google */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
          </svg>

          {cargando ? 'Autenticando con Google...' : 'Continuar con Google'}
        </button>

        {/* Info Note */}
        <div style={{
          marginTop: '24px',
          padding: '12px 16px',
          background: 'rgba(0, 51, 153, 0.05)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 51, 153, 0.15)',
          fontSize: '0.82rem',
          color: '#003399',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={15} style={{ flexShrink: 0 }} />
          <span>Acceso seguro sin contraseña mediante Google OAuth 2.0</span>
        </div>
      </div>
    </div>
  );
};
