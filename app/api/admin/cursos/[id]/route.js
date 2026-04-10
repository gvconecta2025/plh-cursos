import { updateCurso } from '../../../../../lib/notion';

function checkAuth(request) {
  const senha = request.headers.get('x-admin-senha');
  return senha === process.env.ADMIN_PASSWORD;
}

export async function PUT(request, { params }) {
  if (!checkAuth(request)) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }
  try {
    const data = await request.json();
    await updateCurso(params.id, data);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
