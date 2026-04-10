import Link from 'next/link';

export const metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o Professor Luiz Henrique, fundador do PLH Cursos, e nossos serviços e publicações.',
};

const SERVICOS = [
  {
    emoji: '🎓',
    titulo: 'Cursos ao Vivo',
    descricao: 'Turmas presenciais e online para jovens de 9 a 17 anos. Formação prática com acompanhamento direto.',
  },
  {
    emoji: '📐',
    titulo: 'Preparatório Colégio Militar',
    descricao: 'Preparação sistemática para o concurso de admissão ao Colégio Militar. Foco em resultado.',
  },
  {
    emoji: '👨‍👩‍👦',
    titulo: 'Palestras para Pais',
    descricao: 'Palestras e workshops sobre desenvolvimento prático: como criar filhos que sabem o que fazer quando não sabem o que fazer.',
  },
  {
    emoji: '💰',
    titulo: 'Educação Financeira',
    descricao: 'Formação financeira adaptada para jovens. Conceitos reais, aplicados à realidade deles.',
  },
  {
    emoji: '✍️',
    titulo: 'Produção Textual',
    descricao: 'Desenvolvimento da escrita com técnica e propósito. Do texto básico à redação de concurso.',
  },
  {
    emoji: '📊',
    titulo: 'Matemática Aplicada',
    descricao: 'Matemática do dia a dia e de concursos. Metodologia clara, sem decoreba.',
  },
];

const LIVROS = [
  {
    titulo: 'Desenvolvimento Prático',
    subtitulo: 'Saber o que fazer quando não se sabe o que fazer',
    emoji: '📘',
    disponivel: true,
  },
  {
    titulo: 'O Caminho dos Fariseus',
    subtitulo: 'Farisaísmo e fé autêntica',
    emoji: '✝️',
    disponivel: false,
  },
];

export default function SobrePage() {
  return (
    <div style={{ padding: '0 0 72px' }}>

      {/* Hero / Professor */}
      <section
        style={{
          background: 'linear-gradient(135deg, #3a2e26 0%, #5a4030 100%)',
          padding: '56px 0 52px',
          color: '#f0e8dc',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Avatar placeholder */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: '#c07010',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                border: '4px solid rgba(255,255,255,0.15)',
              }}
            >
              👨‍🏫
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 13, color: '#c07010', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                Fundador e Idealizador
              </p>
              <h1
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: 'clamp(26px, 4vw, 38px)',
                  color: '#f0e8dc',
                  marginBottom: 16,
                }}
              >
                Professor Luiz Henrique
              </h1>
              <p style={{ fontSize: 17, color: '#c8bfb4', lineHeight: 1.75, maxWidth: 620 }}>
                Professor, autor e empreendedor educacional. Fundador do PLH Preparatórios e do PLH Cursos — plataformas dedicadas ao desenvolvimento sistemático e prático de jovens entre 9 e 17 anos.
              </p>
              <p style={{ fontSize: 17, color: '#c8bfb4', lineHeight: 1.75, maxWidth: 620, marginTop: 12 }}>
                Especialista em Matemática, Educação Financeira e Desenvolvimento Prático. Autor de múltiplos livros. Cristão praticante e teólogo autodidata.
              </p>

              {/* Social */}
              <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                <a
                  href="https://instagram.com/professorluiz.plh"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#f0e8dc',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@professorluizhenrique"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#f0e8dc',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section style={{ padding: '56px 0 0' }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 28,
              color: '#2c2421',
              marginBottom: 8,
            }}
          >
            Nossos Serviços
          </h2>
          <p style={{ fontSize: 16, color: '#7a6a5c', marginBottom: 36 }}>
            Formação prática e consistente para jovens e famílias.
          </p>

          <div className="sobre-grid">
            {SERVICOS.map((s) => (
              <div
                key={s.titulo}
                style={{
                  background: '#f5f0e8',
                  borderRadius: 12,
                  padding: '24px 22px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ fontSize: 32, marginBottom: 12 }}>{s.emoji}</p>
                <h3
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: 17,
                    color: '#2c2421',
                    marginBottom: 8,
                  }}
                >
                  {s.titulo}
                </h3>
                <p style={{ fontSize: 14, color: '#6b5c4e', lineHeight: 1.65 }}>
                  {s.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livros */}
      <section style={{ padding: '56px 0 0' }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 28,
              color: '#2c2421',
              marginBottom: 8,
            }}
          >
            Publicações
          </h2>
          <p style={{ fontSize: 16, color: '#7a6a5c', marginBottom: 36 }}>
            Livros escritos pelo Professor Luiz Henrique.
          </p>

          <div className="livros-grid">
            {LIVROS.map((l) => (
              <div
                key={l.titulo}
                style={{
                  background: '#f5f0e8',
                  borderRadius: 12,
                  padding: '28px 22px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {!l.disponivel && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontSize: 11,
                      fontWeight: 700,
                      background: '#fff3cd',
                      color: '#7d5a00',
                      padding: '2px 8px',
                      borderRadius: 20,
                    }}
                  >
                    Em breve
                  </span>
                )}
                <p style={{ fontSize: 44, marginBottom: 14 }}>{l.emoji}</p>
                <h3
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: 16,
                    color: '#2c2421',
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {l.titulo}
                </h3>
                <p style={{ fontSize: 13, color: '#7a6a5c', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {l.subtitulo}
                </p>
                {l.disponivel && (
                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: 16,
                      background: '#c07010',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '7px 16px',
                      borderRadius: 8,
                    }}
                  >
                    Adquirir →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contato */}
      <section style={{ padding: '56px 0 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #c07010 0%, #8b4f00 100%)',
              borderRadius: 16,
              padding: '44px 40px',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: 26,
                marginBottom: 12,
              }}
            >
              Quer saber mais sobre nossos serviços?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
              Entre em contato diretamente com o Professor Luiz Henrique.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  color: '#c07010',
                  fontWeight: 700,
                  padding: '12px 28px',
                  borderRadius: 10,
                  fontSize: 15,
                  display: 'inline-block',
                }}
              >
                WhatsApp →
              </a>
              <Link
                href="/"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '12px 28px',
                  borderRadius: 10,
                  fontSize: 15,
                  display: 'inline-block',
                }}
              >
                Ver Cursos Abertos →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
