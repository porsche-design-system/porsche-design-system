// Bundled into every record that prints Figma text, so a designer's text reaches the snippet as that text. Every
// label's markup decodes HTML entities in attribute values and between tags, so one escape per position serves all four.

/** Text in a double-quoted attribute value. */
export const escapeAttribute = (text: string): string => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** Text between tags, where `<` opens a tag, `>`, `{` and `}` are code in JSX, and `{`, `}` and `@` are in Angular. */
export const escapeText = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[{}@]/g, (char) => `&#${char.charCodeAt(0)};`);
