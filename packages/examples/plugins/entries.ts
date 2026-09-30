import { assetsDirName, scriptEntryName, sharedStyleName, styleEntryName } from './projects.ts';

/**
 * The entry files of a page: `style.css` and `main.js`.
 *
 * A page is authored as one component – markup, Tailwind classes and behaviour, the latter in `<Script>` elements
 * (`src/_partials/Script.tsx`) next to the markup they wire up. The build moves those scripts into one `main.js`, which
 * imports the page's `style.css`, and links it at the end of the body: the shape a Vite project expects, and the shape
 * the hand written examples have.
 *
 * The stylesheet needs no assembling: `src/assets/styles.css` is copied next to every page as it is, which is why there
 * is no `getStyleEntry()` – see `scripts/build.ts`. It carries no relative path, so the copy works at any depth, and
 * Tailwind's automatic source detection covers the pages from the root of the Vite project.
 *
 * The dev server generates nothing: it serves the scripts where they stand, and links the shared stylesheet instead
 * of the entry – see `linkStylesForDev()`.
 */

/** The tag the build links every page's entry with. */
export const scriptEntryTag = `<script type="module" src="${scriptEntryName}"></script>`;

/** The warning every example script carries, emitted once at the top of the behaviour. */
export const exampleBanner = `// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.`;

/** An inline module script as `<Script>` renders it, with the indentation of its line and the line break after it. */
const REGEX_INLINE_SCRIPT = /[ \t]*<script type="module">([\s\S]*?)<\/script>[ \t]*\n?/g;
const REGEX_BODY_END = /^([ \t]*)<\/body>/m;
const REGEX_HEAD_END = /<\/head>/;
const REGEX_IMPORT = /^import\s[^;]+;$/gm;

/**
 * Removes the indentation the formatter gave a script, and the blank lines around it.
 *
 * `renderPage()` formats scripts with `embeddedLanguageFormatting: 'off'`, which keeps the code as it is written and
 * only indents every line to the depth of the element – so taking the common indentation off again gives back exactly
 * what was authored.
 */
export const dedent = (code: string): string => {
  const lines = code
    .replace(/^(?:[ \t]*\n)+/, '')
    .trimEnd()
    .split('\n');
  const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.search(/\S/)));

  return lines.map((line) => (line.trim() ? line.slice(indent) : '')).join('\n');
};

/**
 * Moves the inline scripts out of a rendered page and links the entry they end up in instead.
 *
 * The scripts are returned in document order, which is the order the browser runs modules in as well. The entry is
 * linked as the last element of the body, where the layouts used to reference it.
 */
export const extractScripts = (html: string): { html: string; scripts: string[] } => {
  const scripts: string[] = [];
  const markup = html.replace(REGEX_INLINE_SCRIPT, (_match, code: string) => {
    const script = dedent(code);
    if (script) {
      scripts.push(script);
    }
    return '';
  });

  if (!REGEX_BODY_END.test(markup)) {
    throw new Error('[examples] a page has to render a closing </body> – is it using one of the layouts?');
  }

  return { html: markup.replace(REGEX_BODY_END, `$1  ${scriptEntryTag}\n$1</body>`), scripts };
};

/** Top level declarations of a script – one entry merges the module scopes, so their names have to stay unique. */
const getTopLevelDeclarations = (code: string): string[] =>
  Array.from(code.matchAll(/^(?:(?:async\s+)?function\*?|const|let|var|class)\s+([\w$]+)/gm), ([, name]) => name);

/** The first line of a script, which is how a clash names it – every script opens with a comment saying what it is. */
const labelOf = (code: string): string => code.split('\n')[0];

/**
 * Fails the build when two scripts of a page declare the same name.
 *
 * In dev each `<Script>` is a module of its own; the entry is a single one, so a clash would only surface as a
 * `SyntaxError` in the browser of whoever opens the built example.
 */
const assertUniqueDeclarations = (scripts: string[]): void => {
  const seen = new Map<string, string>();

  for (const code of scripts) {
    for (const name of getTopLevelDeclarations(code)) {
      const other = seen.get(name);
      if (other !== undefined) {
        throw new Error(
          `[examples] two scripts of a page both declare "${name}" at the top level – they end up in one ${scriptEntryName}, so the name has to be unique or wrapped in a block:\n  ${other}\n  ${labelOf(code)}`
        );
      }
      seen.set(name, labelOf(code));
    }
  }
};

/**
 * Content of the generated `main.js` of a page: the stylesheet import, the imports of its scripts, then the scripts
 * themselves in document order.
 *
 * The imports are hoisted so the entry reads like a hand written module; the order of evaluation is unaffected, since
 * the browser evaluates the imports of a module before its body anyway.
 */
export const getScriptEntry = (scripts: string[]): string => {
  const imports = new Set([`import './${styleEntryName}';`]);
  const bodies = scripts
    .map((code) =>
      code
        .replace(REGEX_IMPORT, (statement) => {
          imports.add(statement);
          return '';
        })
        .trim()
    )
    .filter(Boolean);

  assertUniqueDeclarations(bodies);

  return `${[[...imports].join('\n'), ...(bodies.length ? [exampleBanner, ...bodies] : [])].join('\n\n')}\n`;
};

/**
 * Dev server counterpart of the generated entries: links the shared stylesheet, which the build copies next to every
 * page and imports from its `main.js`.
 *
 * Nothing else differs, because the scripts stay where the page renders them and Vite serves inline module scripts
 * itself, bare imports included – like the CDN rewrite in `partials.ts`, this is one of two differences between the
 * page in dev and the emitted one.
 */
export const linkStylesForDev = (html: string): string =>
  html.replace(REGEX_HEAD_END, `<link rel="stylesheet" href="/${assetsDirName}/${sharedStyleName}" />$&`);
