import { getNoticiasAdmin, createNoticia } from '../../../../lib/notion';

function checkAuth(request) {
  const senha = request.headers.get('x-admin-senha');
  return senha === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }
  try {
    const noticias = await getNoticiasAdmin();
    return Response.json(noticias);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }
  try {
    const data = await request.json();
    const page = await createNoticia(data);
    return Response.json({ id: page.id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
