import { useState, useEffect } from 'react';
import { TarjetaTramite } from './components/TarjetaTramite';
import { ConsultasPage } from './pages/ConsultasPage';
import { DetalleConsultaPage } from './pages/DetalleConsultaPage';
import { LoginGoogleModal, type GoogleUser } from './components/LoginGoogleModal';
import { CambiarPasswordModal } from './components/CambiarPasswordModal';
import { Droplets, Trash2, Lightbulb, Building2, Search, PhoneCall, HelpCircle, CheckCircle, FileSearch, Home, UserCheck, KeyRound, LogOut } from 'lucide-react';

export function App() {
  const [paginaActual, setPaginaActual] = useState<'inicio' | 'consultas'>('inicio');
  const [radicadoSeleccionadoId, setRadicadoSeleccionadoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTramite, setSelectedTramite] = useState<string | null>(null);

  // Estados de Autenticación Google & Cambio de Contraseña
  const [usuarioLogueado, setUsuarioLogueado] = useState<GoogleUser | null>(null);
  const [passwordEstablecida, setPasswordEstablecida] = useState<string | null>(null);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [notificacionExito, setNotificacionExito] = useState<string | null>(null);

  // Parsear URL inicial para rutas del tipo /consultas/1 o /consultas/RAD-2026-001
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/consultas/')) {
      const id = path.split('/consultas/')[1];
      if (id) {
        setRadicadoSeleccionadoId(id);
        setPaginaActual('consultas');
      }
    }
  }, []);

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

  const handleSeleccionarRadicado = (id: string) => {
    setRadicadoSeleccionadoId(id);
    setPaginaActual('consultas');
    window.history.pushState({}, '', `/consultas/${id}`);
  };

  const handleVolverAConsultas = () => {
    setRadicadoSeleccionadoId(null);
    setPaginaActual('consultas');
    window.history.pushState({}, '', '/');
  };

  // Callback de Ingreso Exitoso con Google sin Contraseña
  const handleLoginGoogleExito = (user: GoogleUser) => {
    setUsuarioLogueado(user);
    setModalLoginOpen(false);
    // Abrir inmediatamente la pantalla para establecer/cambiar la contraseña
    setModalPasswordOpen(true);
  };

  // Callback de Guardado de Nueva Contraseña
  const handlePasswordGuardadaExito = (nuevaPass: string) => {
    setPasswordEstablecida(nuevaPass);
    setModalPasswordOpen(false);
    setNotificacionExito(`¡Contraseña establecida correctamente para ${usuarioLogueado?.nombre}! Ahora tu cuenta cuenta con doble factor de acceso.`);

    setTimeout(() => {
      setNotificacionExito(null);
    }, 6000);
  };

  const handleCerrarSesion = () => {
    setUsuarioLogueado(null);
    setPasswordEstablecida(null);
    setNotificacionExito(null);
  };

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

          {/* Navigation Bar & Auth Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setRadicadoSeleccionadoId(null); setPaginaActual('inicio'); window.history.pushState({}, '', '/'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: (paginaActual === 'inicio' && !radicadoSeleccionadoId) ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: (paginaActual === 'inicio' && !radicadoSeleccionadoId) ? '#003399' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Home size={16} /> Inicio
            </button>

            <button
              onClick={() => { setRadicadoSeleccionadoId(null); setPaginaActual('consultas'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: (paginaActual === 'consultas' || radicadoSeleccionadoId) ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: (paginaActual === 'consultas' || radicadoSeleccionadoId) ? '#003399' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FileSearch size={16} /> Consultar Radicados (PQRS)
            </button>

            {/* Login & User Profile Controls */}
            {usuarioLogueado ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', padding: '4px 10px 4px 6px', borderRadius: '30px' }}>
                <img
                  src={usuarioLogueado.fotoUrl}
                  alt={usuarioLogueado.nombre}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                  {usuarioLogueado.nombre.split(' ')[0]}
                </span>

                <button
                  onClick={() => setModalPasswordOpen(true)}
                  title={passwordEstablecida ? "Contraseña asignada (Clic para cambiar)" : "Establecer Contraseña"}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <KeyRound size={13} /> Pass
                </button>

                <button
                  onClick={handleCerrarSesion}
                  title="Cerrar Sesión"
                  style={{
                    background: 'rgba(239, 68, 68, 0.3)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 8px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalLoginOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: '#ffffff',
                  color: '#003399',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s ease'
                }}
              >
                <UserCheck size={16} /> Ingresar con Google
              </button>
            )}

            <span style={{ fontSize: '0.85rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}>
              <PhoneCall size={15} /> Línea 070
            </span>
          </div>
        </div>
      </header>

      {/* Banner de Notificación de Éxito al Establecer Contraseña */}
      {notificacionExito && (
        <div style={{
          background: '#dcfce7',
          borderBottom: '1px solid #86efac',
          color: '#14532d',
          padding: '12px 24px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.92rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={18} color="#16a34a" /> {notificacionExito}
        </div>
      )}

      {/* Modal 1: Login con Google sin Contraseña */}
      <LoginGoogleModal
        isOpen={modalLoginOpen}
        onClose={() => setModalLoginOpen(false)}
        onLoginSuccess={handleLoginGoogleExito}
      />

      {/* Modal 2: Cambiar/Establecer Contraseña (se abre tras login con Google) */}
      <CambiarPasswordModal
        isOpen={modalPasswordOpen}
        usuario={usuarioLogueado}
        onPasswordGuardada={handlePasswordGuardadaExito}
      />

      {/* Conditional Rendering Based on Active Page / Radicado Selection */}
      {radicadoSeleccionadoId ? (
        <main style={{ flex: 1 }}>
          <DetalleConsultaPage
            radicadoId={radicadoSeleccionadoId}
            onVolver={handleVolverAConsultas}
          />
        </main>
      ) : paginaActual === 'consultas' ? (
        <main style={{ flex: 1 }}>
          <ConsultasPage onSeleccionarRadicado={handleSeleccionarRadicado} />
        </main>
      ) : (
        <>
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
        </>
      )}

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
