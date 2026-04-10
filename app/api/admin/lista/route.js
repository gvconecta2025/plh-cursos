import { getCursosAdmin, getNoticiasAdmin } from '../../../../lib/notion';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'plhcursos2025';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const senha = searchParams.get('senha');
  const tipo = searchParams.get('tipo');

  if (senha !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const items = tipo === 'noticias' ? await getNoticiasAdmin() : await getCursosAdmin();
    return Response.json({ items });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
