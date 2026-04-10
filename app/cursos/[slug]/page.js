import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCursoBySlug, getCursos, getPageBlocks } from '../../../lib/notion';
import NotionRenderer from '../../../components/NotionRenderer';
import ShareButton from '../../../components/ShareButton';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const cursos = await getCursos();
    return cursos.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const curso = await getCursoBySlug(params.slug);
    if (!curso) return {};
    return {
      title: curso.nome,
      description: curso.descricao,
    };
  } catch {
    return {};
  }
}

const STATUS_COLORS = {
  Aberto: { bg: '#d4edda', color: '#1a6632' },
  Fechado: { bg: '#f8d7da', color: '#842029' },
  'Em breve': { bg: '#fff3cd', color: '#7d5a00' },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
}

export default async function CursoPage({ params }) {
  const curso = await getCursoBySlug(params.slug).catch(() => null);
  if (!curso) notFound();
  const blocks = await getPageBlocks(curso.id).catch(() => []);

  const statusStyle = STATUS_COLORS[curso.status] ?? STATUS_COLORS['Em breve'];

  return (
    <div style={{ padding: '40px 0 72px' }}>
      <div className="container" style={{ maxWidth: 800 }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: 14, color: '#8a7a6c', marginBottom: 24 }}>
          <Link href="/" style={{ color: '#c07010' }}>Cursos</Link>
          {' → '}
          {curso.nome}
        </p>

        {/* Image */}
        {curso.imagem && (
          <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 32, aspectRatio: '16/7' }}>
            <img
              src={curso.imagem}
              alt={curso.nome}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Status + Date */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: 20,
              background: statusStyle.bg,
              color: statusStyle.color,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {curso.status}
          </span>
          {curso.dataInicio && (
            <span style={{ fontSize: 14, color: '#8a7a6c' }}>
              Início: {formatDate(curso.dataInicio)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(26px, 4vw, 38px)',
            color: '#2c2421',
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          {curso.nome}
        </h1>

        {/* Price */}
        {curso.preco && (
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#c07010',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              marginBottom: 28,
            }}
          >
            {curso.preco}
          </p>
        )}

        {/* Short description */}
        {curso.descricao && (
          <p style={{ fontSize: 18, color: '#4a3f35', lineHeight: 1.7, marginBottom: 32, borderLeft: '4px solid #c07010', paddingLeft: 16 }}>
            {curso.descricao}
          </p>
        )}

        {/* Notion content */}
        <NotionRenderer blocks={blocks} />

        {/* Divider */}
        <div style={{ borderTop: '1px solid #d0c5b5', margin: '40px 0 32px' }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {curso.whatsapp && (
            <a
              href={curso.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#fff',
                fontWeight: 700,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: 16,
                padding: '14px 32px',
                borderRadius: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Quero me inscrever
            </a>
          )}
          <ShareButton title={curso.nome} path={`/cursos/${curso.slug}`} />
        </div>
      </div>
    </div>
  );
}
