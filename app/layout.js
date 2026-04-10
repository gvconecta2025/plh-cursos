import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminPanel from '../components/AdminPanel';

export const metadata = {
  title: {
    default: 'PLH Cursos',
    template: '%s | PLH Cursos',
  },
  description: 'Cursos abertos do Professor Luiz Henrique — desenvolvimento prático para jovens.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 64px - 80px)' }}>
          {children}
        </main>
        <Footer />
        <AdminPanel />
      </body>
    </html>
  );
}
