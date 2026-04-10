'use client';

import { useState, useEffect } from 'react';

const SENHA_KEY = 'plh_admin_ok';

const INPUT = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1.5px solid #d0c5b5',
  background: '#faf7f2',
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#2c2421',
  outline: 'none',
  marginBottom: 12,
};

const BTN = {
  background: '#c07010',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 22px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const BTN_SEC = {
  ...BTN,
  background: 'transparent',
  color: '#c07010',
  border: '1.5px solid #c07010',
};

const CARD = {
  background: '#f5f0e8',
  borderRadius: 12,
  padding: '20px 22px',
  marginBottom: 14,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ─── Login ────────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    fetch('/api/admin/curso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha, _check: true }),
    }).then(async (res) => {
      // qualquer resposta que não seja 401 = senha correta
      if (res.status === 401) {
        setErro('Senha incorreta.');
      } else {
        sessionStorage.setItem(SENHA_KEY, senha);
        onLogin(senha);
      }
    });
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ede8df' }}>
      <div style={{ background: '#f5f0e8', borderRadius: 16, padding: 40, width: '100%', maxWidth: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
        <h1 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 22, color: '#c07010', marginBottom: 8 }}>PLH Cursos</h1>
        <p style={{ fontSize: 14, color: '#7a6a5c', marginBottom: 24 }}>Painel de Administração</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={INPUT}
            autoFocus
          />
          {erro && <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 10 }}>{erro}</p>}
          <button type="submit" style={{ ...BTN, width: '100%' }}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

// ─── Formulário de Curso ──────────────────────────────────────────────────────

function FormCurso({ inicial, senha, onSalvo, onCancelar }) {
  const [form, setForm] = useState(inicial || {
    nome: '', slug: '', descricao: '', status: 'Aberto',
    preco: '', whatsapp: '', dataInicio: '', imagem: '', publicado: false,
  });
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState('');

  function set(k, v) {
    setForm((f) => {
      const novo = { ...f, [k]: v };
      if (k === 'nome' && !inicial) novo.slug = slugify(v);
      return novo;
    });
  }

  async function salvar(e) {
    e.preventDefault();
    setSalvando(true);
    setMsg('');
    const res = await fetch('/api/admin/curso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, senha }),
    });
    const data = await res.json();
    setSalvando(false);
    if (data.ok) {
      setMsg('✓ Salvo com sucesso!');
      setTimeout(() => { onSalvo(); }, 800);
    } else {
      setMsg('Erro: ' + data.error);
    }
  }

  return (
    <form onSubmit={salvar} style={{ maxWidth: 560 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Nome do Curso *</label>
      <input style={INPUT} value={form.nome} onChange={(e) => set('nome', e.target.value)} required placeholder="Ex: Matemática Básica" />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Slug (URL)</label>
      <input style={INPUT} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="matematica-basica" />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Descrição curta</label>
      <textarea style={{ ...INPUT, minHeight: 80, resize: 'vertical' }} value={form.descricao} onChange={(e) => set('descricao', e.target.value)} placeholder="Descrição que aparece no card" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Status</label>
          <select style={{ ...INPUT, marginBottom: 0 }} value={form.status} onChange={(e) => set('status', e.target.value)}>
            <option>Aberto</option>
            <option>Em breve</option>
            <option>Fechado</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Preço</label>
          <input style={{ ...INPUT, marginBottom: 0 }} value={form.preco} onChange={(e) => set('preco', e.target.value)} placeholder="R$ 97,00" />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Data de Início</label>
        <input type="date" style={INPUT} value={form.dataInicio} onChange={(e) => set('dataInicio', e.target.value)} />
      </div>

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Link WhatsApp</label>
      <input style={INPUT} value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="https://wa.me/5521999999999" />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>URL da Imagem</label>
      <input style={INPUT} value={form.imagem} onChange={(e) => set('imagem', e.target.value)} placeholder="https://..." />

      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
        <input type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#c07010' }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: '#2c2421' }}>Publicado (aparece no site)</span>
      </label>

      {msg && <p style={{ fontSize: 14, color: msg.startsWith('✓') ? '#1a6632' : '#c0392b', marginBottom: 12 }}>{msg}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" style={BTN} disabled={salvando}>{salvando ? 'Salvando...' : (inicial?.id ? 'Salvar alterações' : 'Criar Curso')}</button>
        {onCancelar && <button type="button" style={BTN_SEC} onClick={onCancelar}>Cancelar</button>}
      </div>
    </form>
  );
}

// ─── Formulário de Notícia ────────────────────────────────────────────────────

function FormNoticia({ inicial, senha, onSalvo, onCancelar }) {
  const [form, setForm] = useState(inicial || {
    titulo: '', slug: '', descricao: '', data: '', imagem: '', publicado: false,
  });
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState('');

  function set(k, v) {
    setForm((f) => {
      const novo = { ...f, [k]: v };
      if (k === 'titulo' && !inicial) novo.slug = slugify(v);
      return novo;
    });
  }

  async function salvar(e) {
    e.preventDefault();
    setSalvando(true);
    setMsg('');
    const res = await fetch('/api/admin/noticia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, senha }),
    });
    const data = await res.json();
    setSalvando(false);
    if (data.ok) {
      setMsg('✓ Salvo com sucesso!');
      setTimeout(() => { onSalvo(); }, 800);
    } else {
      setMsg('Erro: ' + data.error);
    }
  }

  return (
    <form onSubmit={salvar} style={{ maxWidth: 560 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Título *</label>
      <input style={INPUT} value={form.titulo} onChange={(e) => set('titulo', e.target.value)} required placeholder="Título da notícia" />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Slug (URL)</label>
      <input style={INPUT} value={form.slug} onChange={(e) => set('slug', e.target.value)} />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Descrição curta</label>
      <textarea style={{ ...INPUT, minHeight: 80, resize: 'vertical' }} value={form.descricao} onChange={(e) => set('descricao', e.target.value)} />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>Data</label>
      <input type="date" style={INPUT} value={form.data} onChange={(e) => set('data', e.target.value)} />

      <label style={{ fontSize: 13, fontWeight: 600, color: '#4a3f35' }}>URL da Imagem</label>
      <input style={INPUT} value={form.imagem} onChange={(e) => set('imagem', e.target.value)} placeholder="https://..." />

      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
        <input type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#c07010' }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: '#2c2421' }}>Publicada (aparece no site)</span>
      </label>

      {msg && <p style={{ fontSize: 14, color: msg.startsWith('✓') ? '#1a6632' : '#c0392b', marginBottom: 12 }}>{msg}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" style={BTN} disabled={salvando}>{salvando ? 'Salvando...' : (inicial?.id ? 'Salvar alterações' : 'Criar Notícia')}</button>
        {onCancelar && <button type="button" style={BTN_SEC} onClick={onCancelar}>Cancelar</button>}
      </div>
    </form>
  );
}

// ─── Painel Principal ─────────────────────────────────────────────────────────

function Painel({ senha }) {
  const [aba, setAba] = useState('cursos');
  const [cursos, setCursos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [criando, setCriando] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => { carregar(); }, [aba]);

  async function carregar() {
    setCarregando(true);
    try {
      if (aba === 'cursos') {
        const res = await fetch('/api/admin/lista?tipo=cursos&senha=' + encodeURIComponent(senha));
        const data = await res.json();
        setCursos(data.items || []);
      } else {
        const res = await fetch('/api/admin/lista?tipo=noticias&senha=' + encodeURIComponent(senha));
        const data = await res.json();
        setNoticias(data.items || []);
      }
    } catch {}
    setCarregando(false);
  }

  const lista = aba === 'cursos' ? cursos : noticias;

  return (
    <div style={{ minHeight: '100vh', background: '#ede8df' }}>
      {/* Header */}
      <div style={{ background: '#e8dfd0', borderBottom: '1px solid #d0c5b5', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 800, fontSize: 18, color: '#c07010' }}>
          PLH Cursos — Admin
        </span>
        <a href="/" style={{ fontSize: 13, color: '#7a6a5c' }}>← Ver site</a>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>
        {/* Abas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['cursos', 'noticias'].map((a) => (
            <button
              key={a}
              onClick={() => { setAba(a); setEditando(null); setCriando(false); }}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                background: aba === a ? '#c07010' : '#e8dfd0',
                color: aba === a ? '#fff' : '#4a3f35',
              }}
            >
              {a === 'cursos' ? '📚 Cursos' : '📰 Notícias'}
            </button>
          ))}
        </div>

        {/* Criar novo */}
        {!criando && !editando && (
          <button style={{ ...BTN, marginBottom: 24 }} onClick={() => setCriando(true)}>
            + Novo {aba === 'cursos' ? 'Curso' : 'Notícia'}
          </button>
        )}

        {/* Form criar */}
        {criando && (
          <div style={CARD}>
            <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 18, marginBottom: 20 }}>
              Novo {aba === 'cursos' ? 'Curso' : 'Notícia'}
            </h2>
            {aba === 'cursos'
              ? <FormCurso senha={senha} onSalvo={() => { setCriando(false); carregar(); }} onCancelar={() => setCriando(false)} />
              : <FormNoticia senha={senha} onSalvo={() => { setCriando(false); carregar(); }} onCancelar={() => setCriando(false)} />
            }
          </div>
        )}

        {/* Lista */}
        {!criando && (
          <>
            {carregando ? (
              <p style={{ color: '#8a7a6c' }}>Carregando...</p>
            ) : lista.length === 0 ? (
              <p style={{ color: '#8a7a6c' }}>Nenhum item ainda.</p>
            ) : (
              lista.map((item) => (
                <div key={item.id} style={CARD}>
                  {editando?.id === item.id ? (
                    <>
                      <h3 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 16, marginBottom: 16 }}>
                        Editando: {item.nome || item.titulo}
                      </h3>
                      {aba === 'cursos'
                        ? <FormCurso inicial={editando} senha={senha} onSalvo={() => { setEditando(null); carregar(); }} onCancelar={() => setEditando(null)} />
                        : <FormNoticia inicial={editando} senha={senha} onSalvo={() => { setEditando(null); carregar(); }} onCancelar={() => setEditando(null)} />
                      }
                    </>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{
                            fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                            background: item.publicado ? '#d4edda' : '#f8d7da',
                            color: item.publicado ? '#1a6632' : '#842029',
                          }}>
                            {item.publicado ? 'Publicado' : 'Rascunho'}
                          </span>
                          {item.status && (
                            <span style={{ fontSize: 12, color: '#8a7a6c' }}>{item.status}</span>
                          )}
                        </div>
                        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 16, color: '#2c2421' }}>
                          {item.nome || item.titulo}
                        </p>
                        {(item.descricao) && (
                          <p style={{ fontSize: 13, color: '#7a6a5c', marginTop: 4 }}>
                            {item.descricao.slice(0, 80)}{item.descricao.length > 80 ? '…' : ''}
                          </p>
                        )}
                        {item.preco && <p style={{ fontSize: 13, color: '#c07010', fontWeight: 700, marginTop: 4 }}>{item.preco}</p>}
                      </div>
                      <button style={BTN_SEC} onClick={() => setEditando(item)}>Editar</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [senha, setSenha] = useState(null);

  useEffect(() => {
    const s = sessionStorage.getItem(SENHA_KEY);
    if (s) setSenha(s);
  }, []);

  if (!senha) return <Login onLogin={setSenha} />;
  return <Painel senha={senha} />;
}
