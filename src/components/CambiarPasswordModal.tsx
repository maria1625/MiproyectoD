import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import type { GoogleUser } from './LoginGoogleModal';

interface CambiarPasswordModalProps {
  isOpen: boolean;
  usuario: GoogleUser | null;
  onPasswordGuardada: (nuevaPassword: string) => void;
}

export const CambiarPasswordModal: React.FC<CambiarPasswordModalProps> = ({ isOpen, usuario, onPasswordGuardada }) => {
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  if (!isOpen || !usuario) return null;

  // Calculador de fortaleza de contraseña
  const tieneLargo = password.length >= 8;
  const tieneNumero = /\d/.test(password);
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let fortalezaScore = 0;
  if (tieneLargo) fortalezaScore++;
  if (tieneNumero) fortalezaScore++;
  if (tieneMayuscula) fortalezaScore++;
  if (tieneEspecial) fortalezaScore++;

  let fortalezaTexto = 'Muy Débil';
  let fortalezaColor = '#ef4444';
  if (fortalezaScore === 2) { fortalezaTexto = 'Débil'; fortalezaColor = '#f97316'; }
  if (fortalezaScore === 3) { fortalezaTexto = 'Media'; fortalezaColor = '#eab308'; }
  if (fortalezaScore >= 4) { fortalezaTexto = 'Fuerte / Segura'; fortalezaColor = '#22c55e'; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tieneLargo) {
      setErrorMsg('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!tieneNumero) {
      setErrorMsg('La contraseña debe incluir al menos un número.');
      return;
    }
    if (password !== confirmarPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor verifica.');
      return;
    }

    setErrorMsg(null);
    setGuardando(true);

    setTimeout(() => {
      setGuardando(false);
      onPasswordGuardada(password);
    }, 700);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.7)',
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
        maxWidth: '480px',
        width: '100%',
        padding: '36px',
        boxShadow: '0 25px 60px rgba(0, 51, 153, 0.25)',
        border: '1px solid #e2e8f0',
        animation: 'modalSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Profile Success Header */}
        <div style={{
          background: 'rgba(0, 51, 153, 0.05)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(0, 51, 153, 0.15)'
        }}>
          <img
            src={usuario.fotoUrl}
            alt={usuario.nombre}
            style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #003399' }}
          />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} /> Autenticado con Google
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
              {usuario.nombre}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              {usuario.email}
            </p>
          </div>
        </div>

        {/* Action Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: '#003399',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px auto',
            boxShadow: '0 4px 12px rgba(0, 51, 153, 0.3)'
          }}>
            <KeyRound size={22} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#003399', margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>
            Establece tu Contraseña
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>
            Has ingresado con Google. Por seguridad de tu cuenta, asigna tu nueva contraseña para futuros accesos.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMsg && (
            <div style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {/* Nueva Contraseña Input */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Nueva Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Escribe tu nueva contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength Meter Bar */}
            {password.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
                  <span>Seguridad de contraseña:</span>
                  <strong style={{ color: fortalezaColor }}>{fortalezaTexto}</strong>
                </div>
                <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(fortalezaScore / 4) * 100}%`,
                    background: fortalezaColor,
                    transition: 'all 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* Confirmar Contraseña Input */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Confirmar Contraseña
            </label>
            <input
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Vuelve a escribir la contraseña..."
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
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

          {/* Validation Rules Checklist */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '0.8rem',
            color: '#475569',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tieneLargo ? '#16a34a' : '#64748b' }}>
              <CheckCircle2 size={13} color={tieneLargo ? '#16a34a' : '#94a3b8'} /> Al menos 8 caracteres
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tieneNumero ? '#16a34a' : '#64748b' }}>
              <CheckCircle2 size={13} color={tieneNumero ? '#16a34a' : '#94a3b8'} /> Incluye al menos un número (0-9)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tieneMayuscula ? '#16a34a' : '#64748b' }}>
              <CheckCircle2 size={13} color={tieneMayuscula ? '#16a34a' : '#94a3b8'} /> Incluye una letra mayúscula
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={guardando}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: '#003399',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: guardando ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(0, 51, 153, 0.3)',
              marginTop: '8px'
            }}
          >
            {guardando ? 'Guardando contraseña...' : <>Guardar y Acceder al Portal <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};
