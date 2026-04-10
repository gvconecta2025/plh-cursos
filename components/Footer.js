import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#3a2e26',
        color: '#c8bfb4',
        padding: '32px 0',
        marginTop: 64,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: '#f0e8dc',
              marginBottom: 6,
            }}
          >
            PLH Cursos
          </p>
          <p style={{ fontSize: 14, color: '#9e9188', maxWidth: 260 }}>
            Desenvolvimento prático para jovens e famílias. Professor Luiz Henrique.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#c07010', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>
              Páginas
            </p>
            {[
              { href: '/', label: 'Cursos Abertos' },
              { href: '/noticias', label: 'Notícias' },
              { href: '/sobre', label: 'Sobre Nós' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: 'block', fontSize: 14, color: '#c8bfb4', marginBottom: 6 }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#c07010', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>
              Contato
            </p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 14, color: '#c8bfb4', marginBottom: 6 }}
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/professorluiz.plh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 14, color: '#c8bfb4', marginBottom: 6 }}
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@professorluizhenrique"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 14, color: '#c8bfb4', marginBottom: 6 }}
            >
              YouTube
            </a>
            <a
              href="mailto:professorluizhenrique.edu@gmail.com"
              style={{ display: 'block', fontSize: 14, color: '#c8bfb4', marginBottom: 6 }}
            >
              E-mail
            </a>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #4e3f35' }}
      >
        <p style={{ fontSize: 13, color: '#6e6058' }}>
          © {new Date().getFullYear()} PLH Cursos — Professor Luiz Henrique. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
