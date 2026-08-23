import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, AlertTriangle, FileCheck, Clock, CheckCircle2, ShieldCheck, Tag, User, Calendar } from 'lucide-react';

export interface PqrsItem {
  id: string;
  solicitante: string;
  categoria: string;
  descripcion: string;
  estado: 'En trámite' | 'Resuelto';
  fechaRadicacion: string;
  plazoLegal: string;
  respuestaOficial: string;
}

interface ConsultasPageProps {
  onSeleccionarRadicado?: (id: string) => void;
}

export const ConsultasPage: React.FC<ConsultasPageProps> = ({ onSeleccionarRadicado }) => {
  const [datos, setDatos] = useState<PqrsItem[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch('/api/pqrs');
      if (!respuesta.ok) {
        throw new Error(`Error en el servidor (${respuesta.status})`);
      }
      const data = await respuesta.json();
      setDatos(data);
    } catch (err: any) {
      console.error('Error al consultar /api/pqrs:', err);
      // Fallback a static json si la API dev requiere fallback
      try {
        const resStatic = await fetch('/data/pqrs.json');
        if (!resStatic.ok) throw new Error('Falló fallback estático');
        const dataStatic = await resStatic.json();
        setDatos(dataStatic);
        setError(null);
      } catch {
        setError('No fue posible establecer conexión con el servidor de trámites.');
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Filtrado en tiempo real
  const datosFiltrados = datos.filter((item) => {
    const coincideTexto =
      item.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.solicitante.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;

    return coincideTexto && coincideCategoria;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', width: '100%', boxSizing: 'border-box' }}>
      {/* Header Institucional de Consultas */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '32px 28px',
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(0, 51, 153, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#003399', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
          <ShieldCheck size={16} /> Consulta Ciudadana de Trámites
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#003399', margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif" }}>
          Estado de Radicados y Solicitudes (PQRS)
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', margin: 0, maxWidth: '750px', lineHeight: 1.6 }}>
          Ingresa el código de tu trámite o tu nombre para hacer seguimiento en tiempo real de tus solicitudes de Agua, Basura y Alumbrado Público.
        </p>

        {/* Buscador en Tiempo Real y Filtro */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar por # de radicado, solicitante o detalle..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            />
            <Search size={18} color="#003399" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              background: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Agua y Alcantarillado">Agua y Alcantarillado</option>
            <option value="Recolección de Basura">Recolección de Basura</option>
            <option value="Alumbrado Público">Alumbrado Público</option>
          </select>
        </div>
      </div>

      {/* ESTADO 1: CARGANDO */}
      {cargando && (
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '60px 24px',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0, 51, 153, 0.04)'
        }}>
          <RefreshCw size={40} color="#003399" className="spin" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700 }}>
            Cargando información de radicados...
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            Consultando el servicio oficial `/api/pqrs`. Por favor espera un momento.
          </p>
        </div>
      )}

      {/* ESTADO 2: ERROR */}
      {!cargando && error && (
        <div style={{
          background: '#fef2f2',
          borderRadius: '16px',
          padding: '48px 24px',
          textAlign: 'center',
          border: '1px solid #fecaca',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.05)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <AlertTriangle size={28} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#991b1b', margin: '0 0 8px 0', fontWeight: 700 }}>
            Error al consultar la API
          </h3>
          <p style={{ color: '#7f1d1d', fontSize: '0.95rem', margin: '0 0 20px 0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            {error}
          </p>
          <button
            onClick={cargarDatos}
            style={{
              background: '#003399',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 51, 153, 0.2)'
            }}
          >
            <RefreshCw size={16} /> Reintentar
          </button>
        </div>
      )}

      {/* ESTADO 3: VACÍO (No se encontraron trámites) */}
      {!cargando && !error && datosFiltrados.length === 0 && (
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '56px 24px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Search size={28} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 8px 0', fontWeight: 700 }}>
            No se encontraron trámites
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            No hay registros que coincidan con la búsqueda "<strong>{busqueda}</strong>". Intenta con otro término o borra el filtro.
          </p>
          <button
            onClick={() => { setBusqueda(''); setFiltroCategoria('Todas'); }}
            style={{
              marginTop: '16px',
              background: 'transparent',
              color: '#003399',
              border: '1px solid #003399',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Restablecer búsqueda
          </button>
        </div>
      )}

      {/* ESTADO 4: LISTA CON DATOS */}
      {!cargando && !error && datosFiltrados.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {datosFiltrados.map((item) => {
            const esResuelto = item.estado === 'Resuelto';
            return (
              <article
                key={item.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(0, 51, 153, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Accent Status Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: esResuelto ? '#16a34a' : '#d97706'
                }} />

                <div>
                  {/* Category & Status Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#003399',
                      background: 'rgba(0, 51, 153, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Tag size={12} /> {item.categoria}
                    </span>

                    {/* Status Badge in Color */}
                    {esResuelto ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: '#dcfce7',
                        color: '#15803d',
                        border: '1px solid #bbf7d0'
                      }}>
                        <CheckCircle2 size={14} /> Resuelto
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: '#fef3c7',
                        color: '#b45309',
                        border: '1px solid #fde68a'
                      }}>
                        <Clock size={14} /> En trámite
                      </span>
                    )}
                  </div>

                  {/* ID Radicado */}
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#003399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileCheck size={18} /> {item.id}
                  </div>

                  {/* Solicitante */}
                  <div style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} color="#64748b" /> Solicitante: <strong style={{ color: '#0f172a' }}>{item.solicitante}</strong>
                  </div>

                  {/* Descripcion */}
                  <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                    {item.descripcion}
                  </p>
                </div>

                {/* Response / Footer */}
                <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '6px', lineHeight: 1.5, background: '#f8fafc', padding: '10px 12px', borderRadius: '8px' }}>
                    <strong style={{ color: '#003399' }}>Respuesta oficial:</strong> {item.respuestaOficial}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {item.fechaRadicacion}
                    </span>
                    <span>Plazo: <strong>{item.plazoLegal}</strong></span>
                  </div>

                  <button
                    onClick={() => onSeleccionarRadicado && onSeleccionarRadicado(item.id)}
                    style={{
                      width: '100%',
                      marginTop: '14px',
                      padding: '8px',
                      background: 'rgba(0, 51, 153, 0.06)',
                      color: '#003399',
                      border: '1px solid rgba(0, 51, 153, 0.2)',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Ver Ficha Técnica Completa →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConsultasPage;
