import { assetsDirName, scriptEntryName, sharedStyleName, styleEntryName } from './projects.ts';

/**
 * The entry files of a page: `style.css` and `main.js`.
 *
 * Every page references exactly one script, `main.js`, which pulls in its stylesheet and carries its behaviour – the
 * shape a Vite project expects and the shape the hand written examples have. The files are generated rather than
 * authored, because their content is mechanical: both of them carry what the page needs of the shared sources.
 *
 * Everything shared is **copied, not imported** – the stylesheet as much as the behaviour: an example is read, not
 * executed, so everything it takes to make the pattern work – its markup, its utilities, its styles and its dummy
 * JavaScript – has to be visible without following imports across the tree. The shared sources stay single-sourced in
 * `src/assets/`; they are simply no longer emitted, which is why a generated project has no `assets/` folder at all.
 *
 * The stylesheet is the only one that needs no assembling: `src/assets/styles.css` is copied next to every page as it
 * is, which is why there is no `getStyleEntry()` – see `scripts/build.ts`. It carries no relative path, so the copy
 * works at any depth, and Tailwind's automatic source detection covers the pages from the root of the Vite project.
 *
 * The dev server has none of these files on disk: it renders pages on the fly, so it rewrites the very tag the build
 * resolves through them – see `rewriteEntriesForDev()`.
 */

/** The tag every page renders; the build resolves it through the generated entries, the dev server rewrites it. */
export const scriptEntryTag = `<script type="module" src="${scriptEntryName}"></script>`;

const scriptEntryTagRegex = new RegExp(`<script type="module" src="${scriptEntryName}"></script>`);
const REGEX_HEAD = /<\/head>/;

/**
 * Behaviour shared by every page showing a given element, single-sourced in `assets/` instead of being copied per
 * example. It is inlined into the entries that need it, so `assets/*.js` is a build input and never emitted.
 *
 * Which of them a page needs is derived from its markup rather than declared as a prop: the element a script wires up
 * is the condition, so a page cannot forget its script or keep one it no longer needs.
 */
const sharedScripts = [
  { fileName: 'header.js', isUsedBy: (html: string) => html.includes('id="nav-drilldown"') },
  { fileName: 'video.js', isUsedBy: (html: string) => html.includes('id="pause-button"') },
] as const;

/** The shared scripts a rendered page needs, in a stable order. */
export const getSharedScripts = (html: string): string[] =>
  sharedScripts.filter(({ isUsedBy }) => isUsedBy(html)).map(({ fileName }) => fileName);

/** A shared snippet with its content, ready to be inlined into the entry of a page. */
export type SharedBehaviour = {
  /** File name inside `assets/`, kept as the section label so the single source stays findable. */
  fileName: string;
  content: string;
};

/** The warning every example script carries. Inlined snippets share one entry, so it is emitted once at its top. */
export const exampleBanner = `// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.`;

const stripBanner = (code: string): string => code.replace(exampleBanner, '').trim();

/** Top level declarations of a snippet – inlining merges the module scopes, so their names have to stay unique. */
const getTopLevelDeclarations = (code: string): string[] =>
  Array.from(code.matchAll(/^(?:const|let|var|function|class)\s+([\w$]+)/gm), ([, name]) => name);

type Section = { label: string; code: string };

/**
 * Fails the build when two inlined snippets declare the same name.
 *
 * Separate modules each had their own scope; one entry has a single one, so a clash would only surface as a
 * `SyntaxError` in the browser of whoever opens the example.
 */
const assertUniqueDeclarations = (sections: Section[]): void => {
  const seen = new Map<string, string>();

  for (const { label, code } of sections) {
    for (const name of getTopLevelDeclarations(code)) {
      const other = seen.get(name);
      if (other) {
        throw new Error(
          `[examples] "${label}" and "${other}" both declare "${name}" at the top level – they are inlined into one ${scriptEntryName}, so the name has to be unique or wrapped in a block`
        );
      }
      seen.set(name, label);
    }
  }
};

type ScriptEntryOptions = {
  /** Behaviour authored next to the page, inlined like the shared one so a page keeps exactly one script file. */
  behaviour?: string;
  /** Shared behaviour the page needs, resolved from `getSharedScripts()`. */
  sharedBehaviour: SharedBehaviour[];
};

/**
 * Content of the generated `main.js` of a page: the stylesheet import, then the behaviour of the example itself.
 *
 * Each snippet keeps a section comment naming the file it is single-sourced from, so an example stays one file to
 * read while a fix still has one place to go.
 */
export const getScriptEntry = ({ behaviour, sharedBehaviour }: ScriptEntryOptions): string => {
  const sections: Section[] = [
    ...sharedBehaviour.map(({ fileName, content }) => ({
      label: `${assetsDirName}/${fileName}`,
      code: stripBanner(content),
    })),
    ...(behaviour?.trim() ? [{ label: 'behaviour of this example', code: stripBanner(behaviour) }] : []),
  ].filter(({ code }) => code !== '');

  assertUniqueDeclarations(sections);

  const body = sections.map(({ label, code }) => (sections.length > 1 ? `// --- ${label} ---\n\n${code}` : code));

  return `${[`import './${styleEntryName}';`, ...(body.length ? [exampleBanner] : []), ...body].join('\n\n')}\n`;
};

type DevEntryOptions = {
  /** Whether the page has behaviour authored next to it, which the dev server serves as it is. */
  hasBehaviour: boolean;
  /** Shared behaviour the page needs, as returned by `getSharedScripts()`. */
  sharedScripts: string[];
};

/**
 * Dev server counterpart of the generated entries.
 *
 * Nothing is generated in dev: the shared snippets are served from the source tree as the separate modules they are
 * authored as, and the page's own behaviour is loaded only if it exists – where the build inlines all of them into one
 * `main.js`. Everything else about the markup is identical, so this is the one place where the two differ – like the
 * CDN rewrite in `partials.ts`.
 *
 * It has to run **before** `server.transformIndexHtml()`, not in a `transformIndexHtml()` hook: Vite's own HTML hook
 * runs ahead of the normal plugin hooks and warms up every `<script src>` it finds, so a page still carrying its
 * `main.js` makes it log "Failed to load url /main.js" – that file exists in the built projects only.
 * `plugins/jsx.ts` therefore applies this to the rendered markup directly.
 */
export const rewriteEntriesForDev = (html: string, { hasBehaviour, sharedScripts: scripts }: DevEntryOptions): string =>
  html
    .replace(REGEX_HEAD, `<link rel="stylesheet" href="/${assetsDirName}/${sharedStyleName}" />$&`)
    .replace(
      scriptEntryTagRegex,
      [
        ...scripts.map((fileName) => `<script type="module" src="/${assetsDirName}/${fileName}"></script>`),
        ...(hasBehaviour ? [scriptEntryTag] : []),
      ].join('')
    );
