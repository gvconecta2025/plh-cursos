'use client';

import { useState } from 'react';

const TABS = ['Cursos', 'Notícias'];
const STATUS_OPTIONS = ['Aberto', 'Em breve', 'Fechado'];

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6b5c4e', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1.5px solid #d0c5b5',
  borderRadius: 8,
  fontSize: 15,
  background: '#faf7f2',
  color: '#2c2421',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

function CursoForm({ password, onSuccess }) {
  const empty = { nome: '', slug: '', descricao: '', status: 'Em breve', preco: '', whatsapp: '', dataInicio: '', imagem: '', publicado: false };
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function set(k, v) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === 'nome') next.slug = toSlug(v);
      return next;
    });
  }

  async function submit() {
    if (!form.nome || !form.slug) { setMsg({ err: true, text: 'Nome e Slug são obrigatórios.' }); return; }
    setSaving(true); setMsg(null);
    try {
      const res = await fetch('/api/admin/curso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) { await fetch('/api/revalidate', { method: 'POST', headers: { 'x-admin-password': password } }); setMsg({ err: false, text: '✓ Curso criado e site atualizado!' }); setForm(empty); onSuccess(); }
      else setMsg({ err: true, text: 'Erro ao criar curso.' });
    } catch { setMsg({ err: true, text: 'Erro de conexão.' }); }
    setSaving(false);
  }

  return (
    <div>
      <Field label="Nome do Curso *">
        <input style={inputStyle} value={form.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Ex: Matemática Básica" />
      </Field>
      <Field label="Slug (URL) *">
        <input style={inputStyle} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="matematica-basica" />
        <p style={{ fontSize: 12, color: '#8a7a6c', marginTop: 3 }}>URL: /cursos/{form.slug || '...'}</p>
      </Field>
      <Field label="Descrição">
        <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} value={form.descricao} onChange={(e) => set('descricao', e.target.value)} placeholder="Breve descrição..." />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Status">
          <select style={inputStyle} value={form.status} onChange={(e) => set('status', e.target.value)}>
            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Preço">
          <input style={inputStyle} value={form.preco} onChange={(e) => set('preco', e.target.value)} placeholder="R$ 97,00" />
        </Field>
      </div>
      <Field label="Data de Início">
        <input type="date" style={inputStyle} value={form.dataInicio} onChange={(e) => set('dataInicio', e.target.value)} />
      </Field>
      <Field label="Link WhatsApp">
        <input style={inputStyle} value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="https://wa.me/5521999999999" />
      </Field>
      <Field label="URL da Imagem">
        <input style={inputStyle} value={form.imagem} onChange={(e) => set('imagem', e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Publicar">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
          <input type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#c07010' }} />
          Publicar agora no site
        </label>
      </Field>
      {msg && <p style={{ fontSize: 14, color: msg.err ? '#842029' : '#1a6632', background: msg.err ? '#f8d7da' : '#d4edda', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>{msg.text}</p>}
      <button onClick={submit} disabled={saving} style={{ background: '#c07010', color: '#fff', fontWeight: 700, fontSize: 15, padding: '11px 24px', borderRadius: 9, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, width: '100%', fontFamily: 'inherit' }}>
        {saving ? 'Salvando...' : 'Criar Curso'}
      </button>
    </div>
  );
}

function NoticiaForm({ password, onSuccess }) {
  const empty = { titulo: '', slug: '', descricao: '', data: new Date().toISOString().split('T')[0], imagem: '', publicado: false };
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function set(k, v) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === 'titulo') next.slug = toSlug(v);
      return next;
    });
  }

  async function submit() {
    if (!form.titulo || !form.slug) { setMsg({ err: true, text: 'Título e Slug são obrigatórios.' }); return; }
    setSaving(true); setMsg(null);
    try {
      const res = await fetch('/api/admin/noticia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) { await fetch('/api/revalidate', { method: 'POST', headers: { 'x-admin-password': password } }); setMsg({ err: false, text: '✓ Notícia criada e site atualizado!' }); setForm(empty); onSuccess(); }
      else setMsg({ err: true, text: 'Erro ao criar notícia.' });
    } catch { setMsg({ err: true, text: 'Erro de conexão.' }); }
    setSaving(false);
  }

  return (
    <div>
      <Field label="Título *">
        <input style={inputStyle} value={form.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Ex: Nova turma disponível!" />
      </Field>
      <Field label="Slug (URL) *">
        <input style={inputStyle} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="nova-turma-disponivel" />
        <p style={{ fontSize: 12, color: '#8a7a6c', marginTop: 3 }}>URL: /noticias/{form.slug || '...'}</p>
      </Field>
      <Field label="Descrição">
        <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} value={form.descricao} onChange={(e) => set('descricao', e.target.value)} placeholder="Breve descrição..." />
      </Field>
      <Field label="Data">
        <input type="date" style={inputStyle} value={form.data} onChange={(e) => set('data', e.target.value)} />
      </Field>
      <Field label="URL da Imagem">
        <input style={inputStyle} value={form.imagem} onChange={(e) => set('imagem', e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Publicar">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
          <input type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#c07010' }} />
          Publicar agora no site
        </label>
      </Field>
      {msg && <p style={{ fontSize: 14, color: msg.err ? '#842029' : '#1a6632', background: msg.err ? '#f8d7da' : '#d4edda', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>{msg.text}</p>}
      <button onClick={submit} disabled={saving} style={{ background: '#c07010', color: '#fff', fontWeight: 700, fontSize: 15, padding: '11px 24px', borderRadius: 9, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, width: '100%', fontFamily: 'inherit' }}>
        {saving ? 'Salvando...' : 'Criar Notícia'}
      </button>
    </div>
  );
}

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('login');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tab, setTab] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  async function login() {
    setChecking(true); setPwError(false);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (data.ok) setStep('panel');
      else setPwError(true);
    } catch { setPwError(true); }
    setChecking(false);
  }

  function close() { setOpen(false); setStep('login'); setPw(''); setPwError(false); }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Painel Administrativo"
        style={{ position: 'fixed', bottom: 24, right: 24, width: 48, height: 48, borderRadius: '50%', background: '#3a2e26', border: '2px solid #c07010', color: '#c07010', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, boxShadow: '0 4px 16px rgba(0,0,0,0.25)', transition: 'transform 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(30deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {open && <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000 }} />}

      {open && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#faf7f2', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.3)', zIndex: 10001, width: '92vw', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', padding: 28 }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 18, color: '#2c2421' }}>
              {step === 'login' ? 'Acesso Administrativo' : 'Painel Admin'}
            </h2>
            <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: '#8a7a6c', lineHeight: 1, padding: 0 }}>×</button>
          </div>

          {step === 'login' && (
            <div>
              <p style={{ fontSize: 14, color: '#6b5c4e', marginBottom: 20 }}>Digite a senha para acessar o painel.</p>
              <Field label="Senha">
                <input type="password" style={{ ...inputStyle, borderColor: pwError ? '#842029' : '#d0c5b5' }} value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} placeholder="••••••••" autoFocus />
                {pwError && <p style={{ fontSize: 13, color: '#842029', marginTop: 4 }}>Senha incorreta.</p>}
              </Field>
              <button onClick={login} disabled={checking || !pw} style={{ background: '#c07010', color: '#fff', fontWeight: 700, fontSize: 15, padding: '11px 24px', borderRadius: 9, border: 'none', cursor: (checking || !pw) ? 'not-allowed' : 'pointer', opacity: (checking || !pw) ? 0.6 : 1, width: '100%', fontFamily: 'inherit' }}>
                {checking ? 'Verificando...' : 'Entrar'}
              </button>
            </div>
          )}

          {step === 'panel' && (
            <div>
              <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#ede8df', borderRadius: 10, padding: 4 }}>
                {TABS.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit', background: tab === i ? '#c07010' : 'transparent', color: tab === i ? '#fff' : '#6b5c4e', transition: 'background 0.15s' }}>
                    {t}
                  </button>
                ))}
              </div>
              {tab === 0 && <CursoForm password={pw} onSuccess={() => setSuccessCount((n) => n + 1)} />}
              {tab === 1 && <NoticiaForm password={pw} onSuccess={() => setSuccessCount((n) => n + 1)} />}
              {successCount > 0 && (
                <p style={{ marginTop: 16, fontSize: 13, color: '#6b5c4e', textAlign: 'center', background: '#fff3cd', padding: '8px 12px', borderRadius: 8 }}>
                  ✓ Site atualizado automaticamente.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
