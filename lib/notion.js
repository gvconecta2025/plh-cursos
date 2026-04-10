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
  };
}

// ─── Cursos ───────────────────────────────────────────────────────────────────

export async function getCursos() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_CURSOS_DB_ID,
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

// ─── Notícias ─────────────────────────────────────────────────────────────────

export async function getNoticias() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOTICIAS_DB_ID,
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

// ─── Blocks (conteúdo da página) ──────────────────────────────────────────────

export async function getPageBlocks(pageId) {
  const res = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return res.results;
}
