import { assetsDirName, getRootRelativePath, scriptEntryName, sharedStyleName, styleEntryName } from './projects.ts';

/**
 * The entry files of a page: `style.css` and `main.js`.
 *
 * Every page references exactly one script, `main.js`, which pulls in its stylesheet and its behaviour – the shape a
 * Vite project expects and the shape the hand written examples have. The files are generated rather than authored,
 * because their content is mechanical (an import of the shared Tailwind entry, an import of the shared behaviour a
 * page needs) and their relative paths depend on how deep the page sits.
 *
 * The dev server has none of these files on disk: it renders pages on the fly, so it rewrites the very tag the build
 * resolves through them – see `rewriteEntriesForDev()`.
 */

/** The tag every page renders; the build resolves it through the generated entries, the dev server rewrites it. */
export const scriptEntryTag = `<script type="module" src="${scriptEntryName}"></script>`;

const scriptEntryTagRegex = new RegExp(`<script type="module" src="${scriptEntryName}"></script>`);
const REGEX_HEAD = /<\/head>/;

/**
 * Behaviour shared by every page showing a given element, kept in `assets/` instead of being copied per example.
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

/** Content of the generated `style.css` of a page. */
export const getStyleEntry = (pageDir: string): string =>
  `/* Styles of this example. The shared entry brings Tailwind, the Porsche Design System and the global defaults. */
@import "${getRootRelativePath(pageDir)}${assetsDirName}/${sharedStyleName}";
`;

type ScriptEntryOptions = {
  /** Behaviour authored next to the page, inlined so a page keeps exactly one script file. */
  behaviour?: string;
  /** Shared behaviour the page needs, as returned by `getSharedScripts()`. */
  sharedScripts: string[];
};

/** Content of the generated `main.js` of a page: the entry Vite bundles, imports first. */
export const getScriptEntry = (pageDir: string, { behaviour, sharedScripts: scripts }: ScriptEntryOptions): string => {
  const rootPath = getRootRelativePath(pageDir);
  const imports = [
    `import './${styleEntryName}';`,
    ...scripts.map((fileName) => `import '${rootPath}${assetsDirName}/${fileName}';`),
  ].join('\n');

  return `${[imports, behaviour?.trim()].filter(Boolean).join('\n\n')}\n`;
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
 * Nothing is generated in dev: the shared files are served from the source tree through root relative URLs, and the
 * page's own behaviour is loaded only if it exists. Everything else about the markup is identical, so this is the one
 * place where the two differ – like the CDN rewrite in `partials.ts`.
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
