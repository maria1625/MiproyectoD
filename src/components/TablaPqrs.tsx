import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle2, Clock, Search, ShieldCheck, AlertCircle } from 'lucide-react';

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

export const TablaPqrs: React.FC = () => {
  const [radicados, setRadicados] = useState<PqrsItem[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

  useEffect(() => {
    const obtenerPqrs = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch('/api/pqrs');
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setRadicados(datos);
        setError(null);
      } catch (err: any) {
        console.error('Error cargando PQRS:', err);
        // Fallback a static json si fetch directo falla
        try {
          const resFallback = await fetch('/data/pqrs.json');
          const datosFallback = await resFallback.json();
          setRadicados(datosFallback);
          setError(null);
        } catch {
          setError('No se pudo consultar la API de PQRS.');
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerPqrs();
  }, []);

  const radicadosFiltrados = radicados.filter((r) => {
    const coincideTexto =
      r.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.solicitante.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria = filtroCategoria === 'Todas' || r.categoria === filtroCategoria;
    const coincideEstado = filtroEstado === 'Todos' || r.estado === filtroEstado;

    return coincideTexto && coincideCategoria && coincideEstado;
  });

  return (
    <section style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '0 24px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '28px',
        boxShadow: '0 4px 20px rgba(0, 51, 153, 0.06)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 51, 153, 0.08)',
              color: '#003399',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '8px'
            }}>
              <ShieldCheck size={14} /> Consulta en Tiempo Real (/api/pqrs)
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
              Radicados Oficiales de Servicios Públicos (PQRS)
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '4px 0 0 0' }}>
              Listado actualizado de solicitudes de Agua, Basura y Alumbrado Público
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#003399', background: '#f0f4ff', padding: '6px 14px', borderRadius: '8px' }}>
              {radicadosFiltrados.length} Radicados
            </span>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '20px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar radicado o solicitante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search size={16} color="#003399" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {/* Filter Category */}
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#ffffff'
            }}
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Agua y Alcantarillado">Agua y Alcantarillado</option>
            <option value="Recolección de Basura">Recolección de Basura</option>
            <option value="Alumbrado Público">Alumbrado Público</option>
          </select>

          {/* Filter Status */}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#ffffff'
            }}
          >
            <option value="Todos">Todos los estados</option>
            <option value="En trámite">En trámite</option>
            <option value="Resuelto">Resuelto</option>
          </select>
        </div>

        {/* Content Table / Cards */}
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            <Clock size={32} color="#003399" className="spin" style={{ marginBottom: '10px' }} />
            <p>Cargando datos del endpoint /api/pqrs...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '16px', background: '#fef2f2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <AlertCircle size={20} /> {error}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 14px' }}>Radicado</th>
                  <th style={{ padding: '12px 14px' }}>Solicitante</th>
                  <th style={{ padding: '12px 14px' }}>Categoría</th>
                  <th style={{ padding: '12px 14px' }}>Descripción</th>
                  <th style={{ padding: '12px 14px' }}>Estado</th>
                  <th style={{ padding: '12px 14px' }}>Plazo</th>
                </tr>
              </thead>
              <tbody>
                {radicadosFiltrados.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '14px', fontWeight: 700, color: '#003399', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={15} /> {item.id}
                      </span>
                    </td>
                    <td style={{ padding: '14px', fontWeight: 600, color: '#0f172a' }}>
                      {item.solicitante}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        background: 'rgba(0, 51, 153, 0.07)',
                        color: '#003399'
                      }}>
                        {item.categoria}
                      </span>
                    </td>
                    <td style={{ padding: '14px', color: '#334155', maxWidth: '300px' }}>
                      <div>{item.descripcion}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                        <strong>Respuesta:</strong> {item.respuestaOficial}
                      </div>
                    </td>
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      {item.estado === 'Resuelto' ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background: '#dcfce7',
                          color: '#166534'
                        }}>
                          <CheckCircle2 size={13} /> Resuelto
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background: '#fef3c7',
                          color: '#92400e'
                        }}>
                          <Clock size={13} /> En trámite
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px', color: '#64748b', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      <div>{item.plazoLegal}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Radicado: {item.fechaRadicacion}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
