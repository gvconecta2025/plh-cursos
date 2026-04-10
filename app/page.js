import { getCursos } from '../lib/notion';
import CourseCard from '../components/CourseCard';

export const revalidate = 300; // rebuild a cada 1h

export const metadata = {
  title: 'Cursos Abertos | PLH Cursos',
  description: 'Veja os cursos abertos do Professor Luiz Henrique e garanta sua vaga.',
};

export default async function HomePage() {
  let cursos = [];
  try {
    cursos = await getCursos();
  } catch {
    // Notion não configurado ainda — mostra estado vazio
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #3a2e26 0%, #5a4030 100%)',
          padding: '56px 0 48px',
          color: '#f0e8dc',
        }}
      >
        <div className="container">
          <p style={{ fontSize: 13, color: '#c07010', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
            Informativo Semanal
          </p>
          <h1
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'clamp(28px, 5vw, 44px)',
              color: '#f0e8dc',
              marginBottom: 14,
              maxWidth: 600,
            }}
          >
            Cursos Abertos
          </h1>
          <p style={{ fontSize: 18, color: '#c8bfb4', maxWidth: 540, lineHeight: 1.6 }}>
            Formação prática para jovens e famílias. Novas turmas toda semana — garanta sua vaga antes de fechar.
          </p>
        </div>
      </section>

      {/* Courses grid */}
      <section style={{ padding: '48px 0 64px' }}>
        <div className="container">
          {cursos.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 0',
                color: '#8a7a6c',
              }}
            >
              <p style={{ fontSize: 40, marginBottom: 16 }}>📚</p>
              <p style={{ fontSize: 18 }}>
                Nenhum curso disponível no momento.
                <br />
                <span style={{ fontSize: 15 }}>Volte em breve ou acompanhe nossas notícias.</span>
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 15, color: '#8a7a6c', marginBottom: 28 }}>
                {cursos.length} curso{cursos.length !== 1 ? 's' : ''} disponível{cursos.length !== 1 ? 'veis' : ''}
              </p>
              <div className="card-grid">
                {cursos.map((curso) => (
                  <CourseCard key={curso.id} curso={curso} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ background: '#c07010', padding: '36px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Ficou com dúvida sobre algum curso?
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#fff',
              color: '#c07010',
              fontWeight: 700,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              padding: '12px 28px',
              borderRadius: 10,
              fontSize: 16,
              display: 'inline-block',
            }}
          >
            Fale no WhatsApp →
          </a>
        </div>
      </section>
    </>
  );
}
