import { NextResponse } from 'next/server';
import { getNoticiasAdmin, createNoticia, updateNoticia } from '../../../../lib/notion';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'plh2025';

function auth(request) {
  const pw = request.headers.get('x-admin-password');
  return pw === ADMIN_PASSWORD;
}

export async function GET(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const noticias = await getNoticiasAdmin();
  return NextResponse.json(noticias);
}

export async function POST(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const data = await request.json();
  const page = await createNoticia(data);
  return NextResponse.json({ ok: true, id: page.id });
}

export async function PUT(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const { id, ...data } = await request.json();
  await updateNoticia(id, data);
  return NextResponse.json({ ok: true });
}
