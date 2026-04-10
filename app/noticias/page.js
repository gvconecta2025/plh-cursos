import { getNoticias } from '../../lib/notion';
import NewsCard from '../../components/NewsCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Notícias',
  description: 'Acompanhe as últimas notícias e novidades do PLH Cursos.',
};

export default async function NoticiasPage() {
  let noticias = [];
  try {
    noticias = await getNoticias();
  } catch {
    // Notion não configurado ainda
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #3a2e26 0%, #5a4030 100%)',
          padding: '48px 0 40px',
          color: '#f0e8dc',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'clamp(26px, 4vw, 40px)',
              color: '#f0e8dc',
              marginBottom: 10,
            }}
          >
            Notícias
          </h1>
          <p style={{ fontSize: 17, color: '#c8bfb4', maxWidth: 480 }}>
            Acompanhe novidades, dicas e conteúdo do Professor Luiz Henrique.
          </p>
        </div>
      </section>

      {/* News grid */}
      <section style={{ padding: '48px 0 72px' }}>
        <div className="container">
          {noticias.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#8a7a6c' }}>
              <p style={{ fontSize: 40, marginBottom: 16 }}>📰</p>
              <p style={{ fontSize: 18 }}>Nenhuma notícia publicada ainda.</p>
            </div>
          ) : (
            <div className="card-grid">
              {noticias.map((n) => (
                <NewsCard key={n.id} noticia={n} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
