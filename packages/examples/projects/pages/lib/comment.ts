/**
 * Comments in the markup of an example – rendered by the `Comment` partial, converted by `renderPage()`.
 *
 * Preact cannot render an HTML comment, so `Comment` renders this element instead, with the text as it is, and
 * `renderComments()` turns it into `<!-- … -->` before the page is formatted. The element never reaches a page.
 */
export const commentTag = 'example-comment';

const commentElement = `<${commentTag}>([\\s\\S]*?)</${commentTag}>`;
const REGEX_COMMENT_ELEMENT = new RegExp(commentElement, 'g');
/** Comment elements following one another, with nothing but whitespace between them. */
const REGEX_COMMENT_ELEMENTS = new RegExp(`${commentElement}(?:\\s*${commentElement})*`, 'g');

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

/**
 * Turns the comment elements rendered by `Comment` into HTML comments – each reason the first time it occurs on the
 * page, and reasons following one another as one comment.
 *
 * A page showing a partial more than once would otherwise repeat every reason with it, three tiles saying thrice why
 * they are built the way they are. So a reason is given where it first applies, and the markup repeating it stands
 * without: it is read in the code view of the page from top to bottom, where the first occurrence has explained it.
 *
 * An element built for several reasons has several `Comment`s before it, since partials and blocks each add their
 * own. They become one comment with a line per reason – see `wrapComments()` – rather than a comment each.
 */
export const renderComments = (html: string): string => {
  const given = new Set<string>();

  return html.replace(REGEX_COMMENT_ELEMENTS, (elements) => {
    const reasons: string[] = [];

    for (const [, text] of elements.matchAll(REGEX_COMMENT_ELEMENT)) {
      const reason = text.trim().replace(/\s+/g, ' ');

      if (!given.has(reason)) {
        given.add(reason);
        reasons.push(reason);
      }
    }

    return reasons.length ? `<!-- ${reasons.join('\n')} -->` : '';
  });
};

/** The `printWidth` of `renderPage()`, which Prettier does not apply to the text of a comment. */
const maxLineLength = 120;

/** A comment of `renderComments()` on lines of its own: a single reason, or several with a line break between them. */
const REGEX_COMMENT = /^( *)<!-- ((?:(?!-->)[\s\S])*?) -->$/gm;

/** Breaks a text into lines of at most the given width. */
const breakIntoLines = (text: string, width: number): string[] =>
  text.split(' ').reduce<string[]>((lines, word) => {
    const last = lines.at(-1);
    if (last !== undefined && `${last} ${word}`.length <= width) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
    return lines;
  }, []);

/**
 * Gives a comment that exceeds the line length of the page, or holds more than one reason, lines of its own between
 * `<!--` and `-->` – the shape of `exampleNote`. Several reasons become a list, so that a reason broken at the line
 * length is told from the next one. Prettier keeps the text of a comment as it is, so this runs after formatting,
 * when the indentation of the comment is known.
 */
export const wrapComments = (html: string): string =>
  html.replace(REGEX_COMMENT, (comment, indent: string, text: string) => {
    const reasons = text.split('\n').map((reason) => reason.trim());

    if (reasons.length === 1 && comment.length <= maxLineLength) {
      return comment;
    }
    const width = maxLineLength - indent.length - 2;
    const lines =
      reasons.length === 1
        ? breakIntoLines(reasons[0], width)
        : reasons.flatMap((reason) =>
            breakIntoLines(reason, width - 2).map((line, index) => `${index === 0 ? '-' : ' '} ${line}`)
          );

    return [`${indent}<!--`, ...lines.map((line) => `${indent}  ${line}`), `${indent}-->`].join('\n');
  });
