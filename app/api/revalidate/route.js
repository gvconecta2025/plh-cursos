import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'plh2025';

export async function POST(request) {
  const pw = request.headers.get('x-admin-password');
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
