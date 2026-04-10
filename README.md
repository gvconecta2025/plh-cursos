# PLH Cursos

Informativo semanal de cursos abertos do Professor Luiz Henrique.

**Stack:** Next.js 14.2.3 · Notion CMS · Vercel

---

## Páginas

| URL | Descrição |
|---|---|
| `/` | Cursos Abertos — grid de todos os cursos |
| `/cursos/[slug]` | Página individual do curso |
| `/noticias` | Feed de notícias |
| `/noticias/[slug]` | Página individual da notícia |
| `/sobre` | Sobre Nós — professor, serviços, livros |

---

## 1. Notion — Criação dos bancos de dados

### Database: Cursos

Crie um novo Full Page Database no Notion com as seguintes propriedades:

| Nome da coluna | Tipo |
|---|---|
| `Nome` | Title |
| `Slug` | Text |
| `Imagem` | URL |
| `Descrição` | Text |
| `Status` | Select → opções: `Aberto`, `Fechado`, `Em breve` |
| `Preço` | Text |
| `Link WhatsApp` | URL |
| `Data Início` | Date |

O **conteúdo completo** do curso vai no corpo da página do Notion (blocos normais).

**Slug:** use letras minúsculas, sem acento e com hífens. Ex: `matematica-basica`.

---

### Database: Notícias

| Nome da coluna | Tipo |
|---|---|
| `Título` | Title |
| `Slug` | Text |
| `Imagem` | URL |
| `Descrição` | Text |
| `Data` | Date |

O **texto completo** da notícia vai no corpo da página do Notion.

---

### Conectar a API do Notion

1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Crie uma integração e copie o **Internal Integration Token** → este é o `NOTION_API_KEY`
3. Abra cada database no Notion → menu `···` → **Add connections** → selecione sua integração
4. Copie o ID de cada database na URL:
   - URL: `https://www.notion.so/SEU-ID-AQUI?v=...`
   - Copie apenas os caracteres antes do `?`

---

## 2. Variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_CURSOS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_NOTICIAS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 4. Deploy no GitHub + Vercel

### GitHub

```bash
# Na pasta do projeto
git init
git add .
git commit -m "init: PLH Cursos"
git remote add origin https://github.com/SEU_USUARIO/plh-cursos.git
git push -u origin main
```

### Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repositório `plh-cursos`
3. Em **Environment Variables**, adicione as três variáveis do `.env.local`
4. Clique em **Deploy**

---

## 5. Atualizar conteúdo

- **Novo curso:** adicione uma nova página no database Cursos do Notion
- **Nova notícia:** adicione uma nova página no database Notícias
- O site se atualiza automaticamente a cada 1 hora (revalidate: 3600)
- Para forçar atualização imediata: redeploy no Vercel (botão **Redeploy**)

---

## 6. Personalizar WhatsApp

No código, substitua `5500000000000` pelo número real com DDI+DDD:
- `app/page.js` — CTA da home
- `app/sobre/page.js` — botões de contato e livros
- `components/Footer.js` — link do footer

Formato: `5521999999999` (DDI 55 + DDD + número)
