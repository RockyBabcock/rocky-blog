import sanitizeHtml from 'sanitize-html';

export function getSanitizeHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'pre', 'code']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
      code: ['class'],
      pre: ['class'],
      span: ['class'],
    },
  });
}
