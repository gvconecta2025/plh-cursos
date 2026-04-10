import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNoticiaBySlug, getNoticias, getPageBlocks } from '../../../lib/notion';
import NotionRenderer from '../../../components/NotionRenderer';
import ShareButton from '../../../components/ShareButton';

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const noticias = await getNoticias();
    return noticias.map((n) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const n = await getNoticiaBySlug(params.slug);
    if (!n) return {};
    return { title: n.titulo, description: n.descricao };
  } catch {
    return {};
  }
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
}

export default async function NoticiaPage({ params }) {
  const noticia = await getNoticiaBySlug(params.slug).catch(() => null);
  if (!noticia) notFound();
  const blocks = await getPageBlocks(noticia.id).catch(() => []);

  return (
    <div style={{ padding: '40px 0 72px' }}>
      <div className="container" style={{ maxWidth: 780 }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: 14, color: '#8a7a6c', marginBottom: 24 }}>
          <Link href="/noticias" style={{ color: '#c07010' }}>Notícias</Link>
          {' → '}
          {noticia.titulo}
        </p>

        {/* Image */}
        {noticia.imagem && (
          <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 28, aspectRatio: '16/7' }}>
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Date */}
        {noticia.data && (
          <p style={{ fontSize: 13, color: '#8a7a6c', fontWeight: 600, marginBottom: 12 }}>
            {formatDate(noticia.data)}
          </p>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#2c2421',
            marginBottom: 24,
            lineHeight: 1.25,
          }}
        >
          {noticia.titulo}
        </h1>

        {/* Short description */}
        {noticia.descricao && (
          <p style={{ fontSize: 18, color: '#4a3f35', lineHeight: 1.7, marginBottom: 32, borderLeft: '4px solid #c07010', paddingLeft: 16 }}>
            {noticia.descricao}
          </p>
        )}

        {/* Notion content */}
        <NotionRenderer blocks={blocks} />

        {/* Share */}
        <div style={{ borderTop: '1px solid #d0c5b5', margin: '40px 0 0', paddingTop: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
          <ShareButton title={noticia.titulo} path={`/noticias/${noticia.slug}`} />
          <Link href="/noticias" style={{ fontSize: 14, color: '#8a7a6c' }}>
            ← Voltar para Notícias
          </Link>
        </div>
      </div>
    </div>
  );
}
