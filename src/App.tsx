import React, { useState } from 'react';
import { TarjetaTramite } from './components/TarjetaTramite';
import { Droplets, Trash2, Lightbulb, Building2, Search, PhoneCall, HelpCircle, CheckCircle } from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTramite, setSelectedTramite] = useState<string | null>(null);

  const tramites = [
    {
      id: 'agua',
      titulo: 'Agua y Alcantarillado',
      descripcion: 'Reporte de fugas de agua, cortes programados de servicio y mantenimiento a la red de alcantarillado.',
      categoria: 'Servicios Sanitarios',
      icono: <Droplets size={22} color="#003399" />
    },
    {
      id: 'basura',
      titulo: 'Recolección de Basura',
      descripcion: 'Consulta de horarios y rutas de recolección, reporte de acumulación de desechos y puntos críticos.',
      categoria: 'Limpia y Medio Ambiente',
      icono: <Trash2 size={22} color="#003399" />
    },
    {
      id: 'alumbrado',
      titulo: 'Alumbrado Público',
      descripcion: 'Reporte de lámparas apagadas, luminarias defectuosas, postes caídos o fallas de iluminación en tu colonia.',
      categoria: 'Infraestructura Urbana',
      icono: <Lightbulb size={22} color="#003399" />
    }
  ];

  const filteredTramites = tramites.filter(t =>
    t.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Top Institutional Header */}
      <header className="header-institucional">
        <div className="header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#003399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Building2 size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Portal Institucional de Servicios
              </h1>
              <p style={{ fontSize: '0.78rem', margin: 0, opacity: 0.9, color: '#e2e8f0' }}>
                Atención Ciudadana y Trámites Urbanos
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PhoneCall size={16} /> Línea Ciudadana: 070
            </span>
          </div>
        </div>
      </header>

      {/* Main Title Section: "Respuestas" */}
      <section className="hero-respuestas">
        <div className="hero-container">
          <h1 className="titulo-respuestas">Respuestas</h1>
          <p className="subtitulo-respuestas">
            Encuentra soluciones rápidas y realiza tus reportes sobre los servicios públicos esenciales de la ciudad.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '540px',
            margin: '24px auto 0',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Buscar trámite o servicio (ej. fugas, lámparas, horarios)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 44px',
                borderRadius: '30px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 4px 14px rgba(0, 51, 153, 0.05)',
                transition: 'border-color 0.2s ease'
              }}
            />
            <Search
              size={18}
              color="#003399"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area: Responsive Card Grid */}
      <main style={{ flex: 1 }}>
        <div className="grid-tarjetas">
          {filteredTramites.map((item) => (
            <TarjetaTramite
              key={item.id}
              titulo={item.titulo}
              descripcion={item.descripcion}
              categoria={item.categoria}
              icono={item.icono}
              onClick={() => setSelectedTramite(item.titulo)}
            />
          ))}
        </div>

        {filteredTramites.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <HelpCircle size={40} color="#003399" style={{ marginBottom: '12px' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No se encontraron trámites coincidentes</p>
            <p style={{ fontSize: '0.9rem' }}>Intenta buscando con términos como "agua", "basura" o "alumbrado".</p>
          </div>
        )}

        {/* Action Confirmation Notice when clicking card */}
        {selectedTramite && (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto 30px',
            padding: '0 24px'
          }}>
            <div style={{
              background: 'rgba(0, 51, 153, 0.06)',
              border: '1px solid #003399',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#003399'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  Has seleccionado: <strong>{selectedTramite}</strong>. El formulario de atención directa está listo.
                </span>
              </div>
              <button
                onClick={() => setSelectedTramite(null)}
                style={{
                  background: '#003399',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.88rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 Portal Institucional de Servicios Públicos</span>
          <span style={{ color: '#003399', fontWeight: 600 }}>Atención Ciudadana 24/7</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
