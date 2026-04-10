'use client';

import Link from 'next/link';
import ShareButton from './ShareButton';

const STATUS_COLORS = {
  Aberto: { bg: '#d4edda', color: '#1a6632' },
  Fechado: { bg: '#f8d7da', color: '#842029' },
  'Em breve': { bg: '#fff3cd', color: '#7d5a00' },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${day} de ${months[parseInt(month, 10) - 1]} de ${year}`;
}

export default function CourseCard({ curso }) {
  const statusStyle = STATUS_COLORS[curso.status] ?? STATUS_COLORS['Em breve'];

  return (
    <article
      style={{
        background: '#f5f0e8',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
      }}
    >
      {/* Image */}
      {curso.imagem ? (
        <Link href={`/cursos/${curso.slug}`}>
          <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={curso.imagem}
              alt={curso.nome}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.2s' }}
            />
          </div>
        </Link>
      ) : (
        <Link href={`/cursos/${curso.slug}`}>
          <div
            style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #c07010 0%, #8b4f00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 40 }}>📚</span>
          </div>
        </Link>
      )}

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Status + Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              background: statusStyle.bg,
              color: statusStyle.color,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {curso.status}
          </span>
          {curso.dataInicio && (
            <span style={{ fontSize: 12, color: '#8a7a6c' }}>
              Início: {formatDate(curso.dataInicio)}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/cursos/${curso.slug}`}>
          <h3
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 18,
              color: '#2c2421',
              lineHeight: 1.3,
            }}
          >
            {curso.nome}
          </h3>
        </Link>

        {/* Description */}
        {curso.descricao && (
          <p style={{ fontSize: 14, color: '#6b5c4e', lineHeight: 1.6, flex: 1 }}>
            {curso.descricao.length > 120 ? curso.descricao.slice(0, 120) + '…' : curso.descricao}
          </p>
        )}

        {/* Price */}
        {curso.preco && (
          <p style={{ fontSize: 15, fontWeight: 700, color: '#c07010', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            {curso.preco}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
          <Link
            href={`/cursos/${curso.slug}`}
            style={{
              background: '#c07010',
              color: '#fff',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              display: 'inline-block',
            }}
          >
            Ver Curso →
          </Link>
          <ShareButton title={curso.nome} path={`/cursos/${curso.slug}`} />
        </div>
      </div>
    </article>
  );
}
