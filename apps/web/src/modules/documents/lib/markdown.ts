// Robust markdown-to-HTML and HTML-to-markdown converters to allow
// seamless format switching between raw Markdown and the Rich Text Editor.

export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Escaping HTML characters first
  const html = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Split into paragraphs/blocks by double newline
  const blocks = html.split(/\n\n+/);
  const convertedBlocks = blocks.map((block) => {
    const line = block.trim();
    if (!line) return '';

    // Headers
    if (line.startsWith('### ')) {
      return `<h3>${convertInlineMarkdown(line.slice(4))}</h3>`;
    }
    if (line.startsWith('## ')) {
      return `<h2>${convertInlineMarkdown(line.slice(3))}</h2>`;
    }
    if (line.startsWith('# ')) {
      return `<h1>${convertInlineMarkdown(line.slice(2))}</h1>`;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      return `<blockquote>${convertInlineMarkdown(line.slice(2))}</blockquote>`;
    }

    // List items (unordered list support)
    if (line.startsWith('- ')) {
      const items = line.split(/\n- /);
      const listContent = items
        .map((item, idx) => {
          const itemText = idx === 0 ? item.slice(2) : item;
          return `<li>${convertInlineMarkdown(itemText)}</li>`;
        })
        .join('');
      return `<ul>${listContent}</ul>`;
    }

    // Plain paragraph
    return `<p>${convertInlineMarkdown(line)}</p>`;
  });

  return convertedBlocks.filter(Boolean).join('');
}

function convertInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br />');
}

export function htmlToMarkdown(html: string): string {
  if (!html) return '';
  let text = html;

  // Blockquotes
  text = text.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n');

  // Headers
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');

  // Bold / Strong / Italic / Em
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, '**$2**');
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, '*$2*');

  // Code
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Lists and list items
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  text = text.replace(/<(ul|ol)[^>]*>([\s\S]*?)<\/(ul|ol)>/gi, '$2\n');

  // Paragraphs & Line Breaks
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Strip all other HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode standard HTML entities
  text = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Cleanup newlines: collapse three or more newlines into double newlines
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}
