// Server component — renders Notion block array to HTML

function renderRichText(richTextArr) {
  if (!richTextArr || !richTextArr.length) return null;
  return richTextArr.map((rt, i) => {
    let text = rt.plain_text;
    const { bold, italic, code, strikethrough, underline } = rt.annotations ?? {};
    let el = code ? <code key={i}>{text}</code> : <span key={i}>{text}</span>;
    if (bold) el = <strong key={i}>{el}</strong>;
    if (italic) el = <em key={i}>{el}</em>;
    if (strikethrough) el = <s key={i}>{el}</s>;
    if (underline) el = <u key={i}>{el}</u>;
    if (rt.href) el = <a key={i} href={rt.href} target="_blank" rel="noopener noreferrer" style={{ color: '#c07010', textDecoration: 'underline' }}>{el}</a>;
    return el;
  });
}

function renderBlock(block) {
  const { type, id } = block;

  switch (type) {
    case 'paragraph':
      return (
        <p key={id}>
          {renderRichText(block.paragraph.rich_text) || <br />}
        </p>
      );

    case 'heading_1':
      return <h1 key={id}>{renderRichText(block.heading_1.rich_text)}</h1>;

    case 'heading_2':
      return <h2 key={id}>{renderRichText(block.heading_2.rich_text)}</h2>;

    case 'heading_3':
      return <h3 key={id}>{renderRichText(block.heading_3.rich_text)}</h3>;

    case 'quote':
      return (
        <blockquote key={id}>
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );

    case 'divider':
      return <hr key={id} />;

    case 'image': {
      const src =
        block.image?.file?.url ??
        block.image?.external?.url ??
        null;
      const caption = block.image?.caption?.map((c) => c.plain_text).join('') ?? '';
      if (!src) return null;
      return (
        <figure key={id} style={{ margin: '1.5rem 0' }}>
          <img
            src={src}
            alt={caption || 'Imagem'}
            style={{ width: '100%', borderRadius: 10, maxHeight: 480, objectFit: 'cover' }}
          />
          {caption && (
            <figcaption style={{ fontSize: 13, color: '#7a6a5c', marginTop: 6, textAlign: 'center' }}>
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

function renderBlocks(blocks) {
  const elements = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === 'bulleted_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(blocks[i]);
        i++;
      }
      elements.push(
        <ul key={`ul-${items[0].id}`}>
          {items.map((b) => (
            <li key={b.id}>{renderRichText(b.bulleted_list_item.rich_text)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.type === 'numbered_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(blocks[i]);
        i++;
      }
      elements.push(
        <ol key={`ol-${items[0].id}`}>
          {items.map((b) => (
            <li key={b.id}>{renderRichText(b.numbered_list_item.rich_text)}</li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(renderBlock(block));
    i++;
  }

  return elements;
}

export default function NotionRenderer({ blocks }) {
  if (!blocks || !blocks.length) {
    return (
      <div className="notion-content">
        <p style={{ color: '#7a6a5c', fontStyle: 'italic' }}>Conteúdo em breve.</p>
      </div>
    );
  }

  return <div className="notion-content">{renderBlocks(blocks)}</div>;
}
