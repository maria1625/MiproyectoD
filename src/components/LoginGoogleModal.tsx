import React, { useState } from 'react';
import { X, UserPlus, Lock, ChevronRight, Mail } from 'lucide-react';

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
  const [cargandoEmail, setCargandoEmail] = useState<string | null>(null);
  const [modoAgregar, setModoAgregar] = useState<boolean>(false);
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevoEmail, setNuevoEmail] = useState<string>('');

  // Cuentas de Google predeterminadas para seleccionar directamente sin contraseña
  const cuentasPredefinidas: GoogleUser[] = [
    {
      nombre: 'María Camila Rodríguez',
      email: 'maria.rodriguez@gmail.com',
      fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      proveedor: 'google'
    },
    {
      nombre: 'Carlos Eduardo Mendoza',
      email: 'carlos.mendoza@gmail.com',
      fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      proveedor: 'google'
    },
    {
      nombre: 'Juan Pablo Pérez',
      email: 'juan.perez@gobierno.gov.co',
      fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      proveedor: 'google'
    }
  ];

  if (!isOpen) return null;

  const seleccionarCuenta = (user: GoogleUser) => {
    setCargandoEmail(user.email);
    setTimeout(() => {
      setCargandoEmail(null);
      onLoginSuccess(user);
    }, 750);
  };

  const handleAgregarCuenta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEmail.trim()) return;

    const emailValido = nuevoEmail.includes('@') ? nuevoEmail.trim() : `${nuevoEmail.trim()}@gmail.com`;
    const nombreValido = nuevoNombre.trim() || emailValido.split('@')[0];

    const nuevaCuenta: GoogleUser = {
      nombre: nombreValido,
      email: emailValido,
      fotoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreValido)}&background=003399&color=fff`,
      proveedor: 'google'
    };

    seleccionarCuenta(nuevaCuenta);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.68)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        maxWidth: '460px',
        width: '100%',
        padding: '32px 28px',
        boxShadow: '0 25px 60px rgba(0, 51, 153, 0.22)',
        border: '1px solid #e2e8f0',
        position: 'relative',
        animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
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

        {/* Official Google Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>Google</span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#003399', margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>
            Elige una cuenta para ingresar
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Inicia sesión sin contraseña a través de Google OAuth
          </p>
        </div>

        {/* LISTA DE CUENTAS POR DEFECTO */}
        {!modoAgregar ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cuentasPredefinidas.map((cuenta) => {
              const estaCargando = cargandoEmail === cuenta.email;
              return (
                <button
                  key={cuenta.email}
                  onClick={() => seleccionarCuenta(cuenta)}
                  disabled={cargandoEmail !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    background: estaCargando ? 'rgba(0, 51, 153, 0.06)' : '#ffffff',
                    cursor: cargandoEmail ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#003399';
                    e.currentTarget.style.background = 'rgba(0, 51, 153, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={cuenta.fotoUrl}
                      alt={cuenta.nombre}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #003399' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {cuenta.nombre}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                        {cuenta.email}
                      </p>
                    </div>
                  </div>

                  <div style={{ color: '#003399' }}>
                    {estaCargando ? (
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Entrando...</span>
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>
                </button>
              );
            })}

            {/* BOTÓN PARA AGREGAR NUEVA CUENTA DE GOOGLE */}
            <button
              onClick={() => setModoAgregar(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px dashed #003399',
                background: 'rgba(0, 51, 153, 0.04)',
                color: '#003399',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                marginTop: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#003399',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserPlus size={18} />
              </div>
              <span>Usar / Agregar otra cuenta de Google</span>
            </button>
          </div>
        ) : (
          /* FORMULARIO PARA AGREGAR NUEVA CUENTA GOOGLE */
          <form onSubmit={handleAgregarCuenta} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Correo Electrónico de Google
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="ejemplo@gmail.com o @institucional.edu.co"
                  value={nuevoEmail}
                  onChange={(e) => setNuevoEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <Mail size={16} color="#003399" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Nombre del Solicitante (Opcional)
              </label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setModoAgregar(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Volver a la lista
              </button>

              <button
                type="submit"
                style={{
                  flex: 1.5,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#003399',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 51, 153, 0.25)'
                }}
              >
                Continuar con esta cuenta
              </button>
            </div>
          </form>
        )}

        {/* Footer Informativo */}
        <div style={{
          marginTop: '24px',
          padding: '12px 14px',
          background: 'rgba(0, 51, 153, 0.04)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 51, 153, 0.12)',
          fontSize: '0.8rem',
          color: '#003399',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={15} style={{ flexShrink: 0 }} />
          <span>Para continuar, Google compartirá tu nombre e email con el portal.</span>
        </div>
      </div>
    </div>
  );
};
