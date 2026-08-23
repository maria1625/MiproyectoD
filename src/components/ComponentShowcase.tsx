import React, { useState } from 'react';
import { Sliders, Palette, Sparkles, Heart, MessageSquare, Share2, Eye } from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  const [blurAmount, setBlurAmount] = useState(16);
  const [cardOpacity, setCardOpacity] = useState(75);
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders color="var(--accent-primary)" size={20} /> Laboratorio Interactivo de Componentes
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
          Experimenta con estilos visuales en tiempo real para Mi proyecto_D
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Controls Panel */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Palette size={16} color="var(--accent-cyan)" /> Ajustes Visuales del Componente
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Desenfoque de Cristal (Backdrop Blur): {blurAmount}px
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={blurAmount}
                onChange={(e) => setBlurAmount(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Opacidad del Fondo: {cardOpacity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={cardOpacity}
                onChange={(e) => setCardOpacity(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Color de Acento Neon:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: color,
                      border: accentColor === color ? '2px solid #ffffff' : 'none',
                      boxShadow: accentColor === color ? `0 0 12px ${color}` : 'none',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div style={{
          background: `rgba(17, 24, 39, ${cardOpacity / 100})`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          border: `1px solid ${accentColor}`,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: `0 0 25px ${accentColor}40`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge" style={{ background: `${accentColor}25`, color: accentColor, border: `1px solid ${accentColor}50` }}>
                <Sparkles size={12} /> Preview Interactivo
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={13} /> Visto por 1.2k
              </span>
            </div>

            <h3 style={{ fontSize: '1.3rem', margin: '0 0 8px 0', color: '#ffffff' }}>
              Tarjeta con Renderizado Dinámico
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Este componente se ajusta en tiempo real según los parámetros modificados en el panel interactivo.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={toggleLike}
              className="btn btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.85rem',
                color: liked ? '#ec4899' : 'var(--text-secondary)',
                borderColor: liked ? '#ec4899' : 'var(--border-color)'
              }}
            >
              <Heart size={16} fill={liked ? '#ec4899' : 'none'} /> {likesCount} Likes
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                <MessageSquare size={15} />
              </button>
              <button className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                <Share2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
