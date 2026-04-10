'use client';

import Link from 'next/link';
import ShareButton from './ShareButton';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
}

export default function NewsCard({ noticia }) {
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
      {noticia.imagem ? (
        <Link href={`/noticias/${noticia.slug}`}>
          <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </Link>
      ) : (
        <Link href={`/noticias/${noticia.slug}`}>
          <div
            style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #7a5c3c 0%, #4a3520 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 40 }}>📰</span>
          </div>
        </Link>
      )}

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Date */}
        {noticia.data && (
          <p style={{ fontSize: 12, color: '#8a7a6c', fontWeight: 600 }}>
            {formatDate(noticia.data)}
          </p>
        )}

        {/* Title */}
        <Link href={`/noticias/${noticia.slug}`}>
          <h3
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 18,
              color: '#2c2421',
              lineHeight: 1.3,
            }}
          >
            {noticia.titulo}
          </h3>
        </Link>

        {/* Description */}
        {noticia.descricao && (
          <p style={{ fontSize: 14, color: '#6b5c4e', lineHeight: 1.6, flex: 1 }}>
            {noticia.descricao.length > 120 ? noticia.descricao.slice(0, 120) + '…' : noticia.descricao}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
          <Link
            href={`/noticias/${noticia.slug}`}
            style={{
              color: '#c07010',
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Ler mais →
          </Link>
          <ShareButton title={noticia.titulo} path={`/noticias/${noticia.slug}`} />
        </div>
      </div>
    </article>
  );
}
