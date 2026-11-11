/**
 * Comments in the markup of an example – rendered by the `Comment` partial, converted by `renderPage()`.
 *
 * Preact cannot render an HTML comment, so `Comment` renders this element instead, with the text as it is, and
 * `renderComments()` turns it into `<!-- … -->` before the page is formatted. The element never reaches a page.
 */
export const commentTag = 'example-comment';

const REGEX_COMMENT_ELEMENT = new RegExp(`<${commentTag}>([\\s\\S]*?)</${commentTag}>`, 'g');

/**
 * Throws for a text that is no valid comment, or one that would change the markup around it.
 *
 * `--` is a parse error inside a comment, and `-->` or `--!>` would end it early; `<` and `>` would be read as markup by
 * `renderComments()`, and an `&` as the start of a character reference.
 */
export const assertCommentText = (text: string): void => {
  if (!text.trim()) {
    throw new Error('[examples] a comment needs a text');
  }
  if (/--|[<>&]/.test(text) || text.startsWith('-') || text.endsWith('-')) {
    throw new Error(`[examples] a comment must contain neither "--", "<", ">" nor "&": "${text}"`);
  }
};

/** Turns every comment element rendered by `Comment` into an HTML comment. */
export const renderComments = (html: string): string =>
  html.replace(REGEX_COMMENT_ELEMENT, (_match, text: string) => `<!-- ${text.trim()} -->`);

/** The `printWidth` of `renderPage()`, which Prettier does not apply to the text of a comment. */
const maxLineLength = 120;

const REGEX_SINGLE_LINE_COMMENT = /^( *)<!-- (.*) -->$/gm;

/**
 * Breaks a comment that exceeds the line length of the page into lines of its own, between `<!--` and `-->` on lines of
 * their own – the shape of `exampleNote`. Prettier keeps the text of a comment as it is, so this runs after formatting,
 * when the indentation of the comment is known.
 */
export const wrapComments = (html: string): string =>
  html.replace(REGEX_SINGLE_LINE_COMMENT, (line, indent: string, text: string) => {
    if (line.length <= maxLineLength) {
      return line;
    }
    const width = maxLineLength - indent.length - 2;
    const lines = text.split(' ').reduce<string[]>((acc, word) => {
      const last = acc.at(-1);
      if (last !== undefined && `${last} ${word}`.length <= width) {
        acc[acc.length - 1] = `${last} ${word}`;
      } else {
        acc.push(word);
      }
      return acc;
    }, []);
    return [`${indent}<!--`, ...lines.map((text) => `${indent}  ${text}`), `${indent}-->`].join('\n');
  });
