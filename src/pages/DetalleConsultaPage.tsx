import React, { useEffect, useState } from 'react';
import { ArrowLeft, Copy, Check, FileText, User, Calendar, Tag, ShieldCheck, Clock, CheckCircle2, Building2, Share2, Info } from 'lucide-react';
import type { PqrsItem } from './ConsultasPage';

interface DetalleConsultaPageProps {
  radicadoId?: string;
  onVolver: () => void;
}

export const DetalleConsultaPage: React.FC<DetalleConsultaPageProps> = ({ radicadoId = 'RAD-2026-001', onVolver }) => {
  const [item, setItem] = useState<PqrsItem | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<boolean>(false);

  useEffect(() => {
    const obtenerDetalle = async () => {
      setCargando(true);
      try {
        const res = await fetch('/api/pqrs');
        let data: PqrsItem[] = [];
        if (res.ok) {
          data = await res.json();
        } else {
          const resFallback = await fetch('/data/pqrs.json');
          data = await resFallback.json();
        }

        // Buscar coincidencia por ID o índice
        const encontrado = data.find((p, index) => 
          p.id.toLowerCase() === radicadoId.toLowerCase() ||
          (index + 1).toString() === radicadoId ||
          p.id.endsWith(radicadoId)
        ) || data[0];

        setItem(encontrado || null);
        setError(null);
      } catch (err) {
        console.error('Error al obtener detalle:', err);
        setError('No se pudo cargar la información del radicado.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalle();
  }, [radicadoId]);

  const copiarEnlace = () => {
    const urlDirecta = `${window.location.origin}/consultas/${item?.id || radicadoId}`;
    navigator.clipboard.writeText(urlDirecta);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  if (cargando) {
    return (
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '60px 24px', border: '1px solid #e2e8f0' }}>
          <Clock size={36} color="#003399" className="spin" style={{ marginBottom: '12px' }} />
          <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 600 }}>Cargando ficha técnica del radicado...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '48px 24px', border: '1px solid #e2e8f0' }}>
          <Info size={36} color="#dc2626" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Radicado no encontrado</h3>
          <p style={{ color: '#64748b' }}>No fue posible ubicar los detalles de la solicitud especificada.</p>
          <button
            onClick={onVolver}
            style={{
              background: '#003399',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Volver a Consultas
          </button>
        </div>
      </div>
    );
  }

  const esResuelto = item.estado === 'Resuelto';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px', width: '100%', boxSizing: 'border-box' }}>
      {/* Botón Volver & Acciones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={onVolver}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            color: '#003399',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '0.92rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={18} /> Volver a Consultas
        </button>

        <button
          onClick={copiarEnlace}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: copiado ? '#dcfce7' : '#003399',
            color: copiado ? '#15803d' : '#ffffff',
            border: copiado ? '1px solid #86efac' : 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '0.92rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 51, 153, 0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          {copiado ? <Check size={18} /> : <Copy size={18} />}
          {copiado ? '¡Enlace Copiado!' : 'Copiar Enlace'}
        </button>
      </div>

      {/* Main Ficha Técnica Container */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 8px 30px rgba(0, 51, 153, 0.08)',
        overflow: 'hidden'
      }}>
        {/* Banner Superior Institucional */}
        <div style={{
          background: 'linear-gradient(135deg, #003399 0%, #002266 100%)',
          color: '#ffffff',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              <ShieldCheck size={14} /> Ficha Técnica Oficial del Trámite
            </span>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Radicado: {item.id}
            </h1>
          </div>

          {/* Badge Estado */}
          <div>
            {esResuelto ? (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                color: '#15803d',
                padding: '8px 18px',
                borderRadius: '30px',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <CheckCircle2 size={18} /> RESUELTO
              </span>
            ) : (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fef3c7',
                color: '#b45309',
                padding: '8px 18px',
                borderRadius: '30px',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <Clock size={18} /> EN TRÁMITE
              </span>
            )}
          </div>
        </div>

        {/* Grid de Metadatos Rápidos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '24px 32px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={13} /> Solicitante
            </span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '4px 0 0 0' }}>
              {item.solicitante}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={13} /> Categoría
            </span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#003399', margin: '4px 0 0 0' }}>
              {item.categoria}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> Fecha Radicación
            </span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '4px 0 0 0' }}>
              {item.fechaRadicacion}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> Plazo de Respuesta
            </span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#003399', margin: '4px 0 0 0' }}>
              {item.plazoLegal}
            </p>
          </div>
        </div>

        {/* Detalle y Descripción */}
        <div style={{ padding: '32px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#003399" /> Descripción Detallada del Trámite
            </h3>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px 20px', color: '#334155', lineHeight: 1.6, fontSize: '0.98rem' }}>
              {item.descripcion}
            </div>
          </div>

          {/* Respuesta Oficial */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="#003399" /> Dictamen y Respuesta Oficial de la Entidad
            </h3>
            <div style={{
              background: esResuelto ? 'rgba(22, 163, 74, 0.06)' : 'rgba(217, 119, 6, 0.06)',
              border: `1px solid ${esResuelto ? '#bbf7d0' : '#fde68a'}`,
              borderRadius: '12px',
              padding: '20px',
              color: esResuelto ? '#14532d' : '#78350f',
              lineHeight: 1.6,
              fontSize: '0.98rem'
            }}>
              <strong>Respuesta Emitida:</strong>
              <p style={{ margin: '8px 0 0 0' }}>{item.respuestaOficial}</p>
            </div>
          </div>

          {/* Timeline de Seguimiento */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Línea de Tiempo del Trámite
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#003399', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>Radicación Registrada</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Ingresado al sistema el {item.fechaRadicacion}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#003399', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>Asignación de Cuadrilla y Evaluación</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Dirección de {item.categoria}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: esResuelto ? '#16a34a' : '#d97706', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>3</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>
                    {esResuelto ? 'Cierre y Notificación de Respuesta' : 'Atención en Curso'}
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>{item.respuestaOficial}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Strip */}
        <div style={{
          padding: '20px 32px',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Share2 size={14} color="#003399" /> Comparte esta ficha con el código de seguimiento <strong>{item.id}</strong>
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={copiarEnlace}
              style={{
                background: '#ffffff',
                color: '#003399',
                border: '1px solid #003399',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {copiado ? '¡Copiado!' : 'Copiar Enlace Directo'}
            </button>
            <button
              onClick={onVolver}
              style={{
                background: '#003399',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Volver a la Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleConsultaPage;
