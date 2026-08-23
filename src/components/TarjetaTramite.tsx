import React from 'react';
import { ChevronRight, Tag } from 'lucide-react';

export interface TarjetaTramiteProps {
  titulo: string;
  descripcion: string;
  categoria: string;
  icono?: React.ReactNode;
  onClick?: () => void;
}

export const TarjetaTramite: React.FC<TarjetaTramiteProps> = ({
  titulo,
  descripcion,
  categoria,
  icono,
  onClick
}) => {
  return (
    <article
      className="tarjeta-tramite"
      onClick={onClick}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0, 51, 153, 0.06)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Accent Strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #003399 0%, #0055ff 100%)'
      }} />

      <div>
        {/* Category Badge & Icon Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0, 51, 153, 0.08)',
            color: '#003399',
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            <Tag size={12} /> {categoria}
          </span>

          {icono && (
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(0, 51, 153, 0.06)',
              color: '#003399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icono}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#0f172a',
          margin: '0 0 10px 0',
          lineHeight: 1.3,
          fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
        }}>
          {titulo}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.95rem',
          color: '#475569',
          lineHeight: 1.6,
          margin: 0
        }}>
          {descripcion}
        </p>
      </div>

      {/* Action Footer */}
      <div style={{
        marginTop: '20px',
        paddingTop: '14px',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          fontSize: '0.88rem',
          fontWeight: 600,
          color: '#003399',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          Consultar trámite <ChevronRight size={16} />
        </span>
      </div>
    </article>
  );
};
