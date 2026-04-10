import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ─── Parsers ──────────────────────────────────────────────────────────────────

function richText(prop) {
  return prop?.rich_text?.map((r) => r.plain_text).join('') ?? '';
}

function titleText(prop) {
  return prop?.title?.map((r) => r.plain_text).join('') ?? '';
}

function parseCurso(page) {
  const p = page.properties;
  return {
    id: page.id,
    nome: titleText(p['Nome']),
    slug: richText(p['Slug']),
    imagem: p['Imagem']?.url ?? null,
    descricao: richText(p['Descrição']),
    status: p['Status']?.select?.name ?? 'Aberto',
    preco: richText(p['Preço']),
    whatsapp: p['Link WhatsApp']?.url ?? null,
    dataInicio: p['Data Início']?.date?.start ?? null,
    publicado: p['Publicado']?.checkbox ?? false,
  };
}

function parseNoticia(page) {
  const p = page.properties;
  return {
    id: page.id,
    titulo: titleText(p['Título']),
    slug: richText(p['Slug']),
    imagem: p['Imagem']?.url ?? null,
    descricao: richText(p['Descrição']),
    data: p['Data']?.date?.start ?? null,
    publicado: p['Publicado']?.checkbox ?? false,
  };
}

// ─── Cursos (público — só publicados) ────────────────────────────────────────

export async function getCursos() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_CURSOS_DB_ID,
    filter: { property: 'Publicado', checkbox: { equals: true } },
    sorts: [{ property: 'Data Início', direction: 'ascending' }],
  });
  return res.results.map(parseCurso);
}

export async function getCursoBySlug(slug) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_CURSOS_DB_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  });
  if (!res.results.length) return null;
  return parseCurso(res.results[0]);
}

// ─── Cursos (admin — todos) ───────────────────────────────────────────────────

export async function getCursosAdmin() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_CURSOS_DB_ID,
    sorts: [{ property: 'Data Início', direction: 'descending' }],
  });
  return res.results.map(parseCurso);
}

export async function createCurso(data) {
  return await notion.pages.create({
    parent: { database_id: process.env.NOTION_CURSOS_DB_ID },
    properties: {
      'Nome': { title: [{ text: { content: data.nome } }] },
      'Slug': { rich_text: [{ text: { content: data.slug } }] },
      'Descrição': { rich_text: [{ text: { content: data.descricao || '' } }] },
      'Status': { select: { name: data.status || 'Em breve' } },
      'Preço': { rich_text: [{ text: { content: data.preco || '' } }] },
      'Link WhatsApp': data.whatsapp ? { url: data.whatsapp } : { url: null },
      'Data Início': data.dataInicio ? { date: { start: data.dataInicio } } : { date: null },
      'Imagem': data.imagem ? { url: data.imagem } : { url: null },
      'Publicado': { checkbox: data.publicado === true },
    },
  });
}

export async function updateCurso(pageId, data) {
  return await notion.pages.update({
    page_id: pageId,
    properties: {
      'Nome': { title: [{ text: { content: data.nome } }] },
      'Slug': { rich_text: [{ text: { content: data.slug } }] },
      'Descrição': { rich_text: [{ text: { content: data.descricao || '' } }] },
      'Status': { select: { name: data.status || 'Em breve' } },
      'Preço': { rich_text: [{ text: { content: data.preco || '' } }] },
      'Link WhatsApp': data.whatsapp ? { url: data.whatsapp } : { url: null },
      'Data Início': data.dataInicio ? { date: { start: data.dataInicio } } : { date: null },
      'Imagem': data.imagem ? { url: data.imagem } : { url: null },
      'Publicado': { checkbox: data.publicado === true },
    },
  });
}

// ─── Notícias (público — só publicadas) ──────────────────────────────────────

export async function getNoticias() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOTICIAS_DB_ID,
    filter: { property: 'Publicado', checkbox: { equals: true } },
    sorts: [{ property: 'Data', direction: 'descending' }],
  });
  return res.results.map(parseNoticia);
}

export async function getNoticiaBySlug(slug) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOTICIAS_DB_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  });
  if (!res.results.length) return null;
  return parseNoticia(res.results[0]);
}

// ─── Notícias (admin — todas) ─────────────────────────────────────────────────

export async function getNoticiasAdmin() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOTICIAS_DB_ID,
    sorts: [{ property: 'Data', direction: 'descending' }],
  });
  return res.results.map(parseNoticia);
}

export async function createNoticia(data) {
  return await notion.pages.create({
    parent: { database_id: process.env.NOTION_NOTICIAS_DB_ID },
    properties: {
      'Título': { title: [{ text: { content: data.titulo } }] },
      'Slug': { rich_text: [{ text: { content: data.slug } }] },
      'Descrição': { rich_text: [{ text: { content: data.descricao || '' } }] },
      'Data': data.data ? { date: { start: data.data } } : { date: null },
      'Imagem': data.imagem ? { url: data.imagem } : { url: null },
      'Publicado': { checkbox: data.publicado === true },
    },
  });
}

export async function updateNoticia(pageId, data) {
  return await notion.pages.update({
    page_id: pageId,
    properties: {
      'Título': { title: [{ text: { content: data.titulo } }] },
      'Slug': { rich_text: [{ text: { content: data.slug } }] },
      'Descrição': { rich_text: [{ text: { content: data.descricao || '' } }] },
      'Data': data.data ? { date: { start: data.data } } : { date: null },
      'Imagem': data.imagem ? { url: data.imagem } : { url: null },
      'Publicado': { checkbox: data.publicado === true },
    },
  });
}

// ─── Blocks (conteúdo da página) ──────────────────────────────────────────────

export async function getPageBlocks(pageId) {
  const res = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return res.results;
}
