'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Cursos Abertos' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/sobre', label: 'Sobre Nós' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header
      style={{
        background: '#e8dfd0',
        borderBottom: '1px solid #d0c5b5',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: '#c07010',
            letterSpacing: '-0.4px',
          }}
        >
          PLH Cursos
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          {links.map((l) => {
            const active = path === l.href || (l.href !== '/' && path.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: active ? '#c07010' : '#4a3f35',
                  borderBottom: active ? '2px solid #c07010' : '2px solid transparent',
                  paddingBottom: 2,
                  transition: 'color 0.15s',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mobile-nav" style={{ background: '#e8dfd0', borderTop: '1px solid #d0c5b5' }}>
          {links.map((l) => {
            const active = path === l.href || (l.href !== '/' && path.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: active ? '#c07010' : '#4a3f35',
                  borderBottom: '1px solid #d0c5b5',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
