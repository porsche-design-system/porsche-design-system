import fs from 'node:fs';
import path from 'node:path';
import { listSkillTreeFiles } from '@skills/shared/skillTreeFiles';

/**
 * The js package's `/meta` subpath. The framework skills (angular/react/vue) link this rather
 * than their local `../meta`, because every framework wrapper's `meta/` is a re-export shim
 * (`export * from '@porsche-design-system/components-js/meta'`) — only the js package ships the
 * real `component-meta` data. The link is version-exact via the same-version js peer.
 */
export const JS_PEER_META_SPECIFIER = '@porsche-design-system/components-js/meta';

/**
 * The js package's `/scss` subpath. The framework skills link this rather than their local `../scss`,
 * because every framework wrapper's `scss/` is a `@forward '@porsche-design-system/components-js/scss'`
 * shim — only the js package ships the real partials. Same shim edge as {@link JS_PEER_META_SPECIFIER},
 * and version-exact via the same-version js peer. Tailwind needs no equivalent: its `index.css` is a
 * real copy in every wrapper, so the framework skills link the local `../tailwindcss/index.css`.
 */
export const JS_PEER_SCSS_SPECIFIER = '@porsche-design-system/components-js/scss';

/**
 * A skill tree carries two classes of reference path:
 * - `produced` — files generated into the tree (md, examples, generated assets), referenced by a
 *   path relative to the markdown file they appear in. Resolved against the staged tree.
 * - `raw` — raw implementation linked where it physically lives: the skill-root-relative `../../meta`
 *   / `../../tokens` dist siblings, or the js-peer `/meta` subpath. Resolved against the built dist.
 */
export type ReferenceKind = 'produced' | 'raw';

export type ReferenceLink = {
  /** The reference string exactly as written in the tree. */
  target: string;
  kind: ReferenceKind;
};

const MARKDOWN_LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;
const INLINE_CODE_RE = /`([^`]+)`/g;
/** Fenced code blocks (``` … ```) — example code, never a tree reference, and their backticks would
 * throw off the single-backtick `INLINE_CODE_RE` pairing for prose later in the file. */
const FENCED_CODE_RE = /```[\s\S]*?```/g;

const stripFragment = (target: string): string => target.replace(/#.*$/, '').trim();

/**
 * Classify a candidate reference, or return `null` for the many non-reference strings markdown and
 * inline-code throw off (storefront routes `/components/…`, anchors `#tokens`, external URLs,
 * prose code like `aria-label` or the bare package name `component-meta`).
 */
const classify = (target: string, source: 'markdown' | 'code'): ReferenceKind | null => {
  if (target === JS_PEER_META_SPECIFIER || target === JS_PEER_SCSS_SPECIFIER) {
    return 'raw';
  }
  if (target.startsWith('../')) {
    return source === 'markdown' ? 'produced' : 'raw';
  }
  if (target.startsWith('./') || target.startsWith('references/')) {
    return 'produced';
  }
  return null;
};

/**
 * Extract every reference path from a markdown body, deduped, with its kind. Scans both markdown
 * links (`[…](./…)`) and inline code (`` `../meta` ``, `` `references/…` ``) — the raw-meta links
 * are written as inline code, not links. Placeholder rows like `references/components/<p-component>/<p-component>.md`
 * (the SKILL.md map's per-component pattern) are dropped via the `<` guard.
 */
export const extractReferences = (
  markdown: string,
  { includePackageSpecifiers = true }: { includePackageSpecifiers?: boolean } = {}
): ReferenceLink[] => {
  const prose = markdown.replace(FENCED_CODE_RE, '');
  const byTarget = new Map<string, ReferenceKind>();
  const add = (raw: string, source: 'markdown' | 'code'): void => {
    const target = stripFragment(raw);
    if (!target || target.includes('<')) {
      return;
    }
    const kind =
      !includePackageSpecifiers && (target === JS_PEER_META_SPECIFIER || target === JS_PEER_SCSS_SPECIFIER)
        ? null
        : classify(target, source);
    if (kind) {
      byTarget.set(target, kind);
    }
  };
  for (const match of prose.matchAll(MARKDOWN_LINK_RE)) {
    add(match[1], 'markdown');
  }
  for (const match of prose.matchAll(INLINE_CODE_RE)) {
    add(match[1], 'code');
  }
  return [...byTarget].map(([target, kind]) => ({ target, kind }));
};

/** Tree-relative POSIX paths of every `*.md` file under `skillRoot`, sorted for stable iteration. */
export const listMarkdownFiles = (skillRoot: string): string[] =>
  listSkillTreeFiles(skillRoot).filter((relativePath) => relativePath.endsWith('.md'));

/**
 * Resolve a single produced reference against a staged skill tree. The two conventions
 * resolve against different bases:
 * - `references/…` rows (the SKILL.md reference map) are skill-root-relative wherever they appear.
 * - `./…` links are relative to the markdown file they live in.
 * SKILL.md is itself the root file, so both bases coincide there; keeping them distinct means a bare
 * `references/…` mention inside a *nested* file still resolves at the root instead of being reported
 * as a false dangling path relative to that file's directory.
 */
export const resolveProduced = (skillRoot: string, sourceFile: string, target: string): boolean => {
  const base = target.startsWith('references/') ? skillRoot : path.dirname(path.join(skillRoot, sourceFile));
  const absolute = path.resolve(base, target);
  return fs.existsSync(absolute);
};

/**
 * Resolve a js-peer subpath against a built js dist root, honouring its `exports` map and trying the
 * given condition keys in order (meta exposes `default`/`import`/`types`; scss exposes `sass`). Encodes
 * the shim edge: this targets the js package's real file, never the framework wrapper's local re-export
 * shim. Returns the resolved file, or `null` if the dist, its package.json, the export, or the target
 * file is missing.
 */
const resolveJsPeerSubpath = (jsDistRoot: string, subpath: string, conditions: readonly string[]): string | null => {
  const pkgPath = path.join(jsDistRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  const entry = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).exports?.[subpath];
  const relative = typeof entry === 'string' ? entry : conditions.map((condition) => entry?.[condition]).find(Boolean);
  if (!relative) {
    return null;
  }
  const absolute = path.join(jsDistRoot, relative);
  return fs.existsSync(absolute) ? absolute : null;
};

/** Resolve the js-peer `/meta` subpath (`./meta` → `meta/{esm,cjs}/…`) against a built js dist root. */
export const resolveJsPeerMeta = (jsDistRoot: string): string | null =>
  resolveJsPeerSubpath(jsDistRoot, './meta', ['default', 'import', 'types']);

/** Resolve the js-peer `/scss` subpath (`./scss` → `scss/_index.scss` under the `sass` condition). */
export const resolveJsPeerScss = (jsDistRoot: string): string | null =>
  resolveJsPeerSubpath(jsDistRoot, './scss', ['sass', 'default']);

/**
 * Resolve a single raw reference against the built dist.
 * - `@porsche-design-system/components-js/meta` / `…/scss` (framework skills) → the js peer's subpath.
 * - `../../meta` / `../../tokens` / `../../tailwindcss/index.css` / `../../scss` (skill-root-relative) → this
 *   framework's own dist sibling. The js skill's `../../meta` and `../../scss` are its real data; framework
 *   skills carry the js-peer specifiers for those instead. `../../tailwindcss/index.css` is real in every
 *   wrapper, so every skill carries it directly.
 */
export const resolveRaw = (distSkillRoot: string, jsDistRoot: string, target: string): boolean => {
  if (target === JS_PEER_META_SPECIFIER) {
    return resolveJsPeerMeta(jsDistRoot) !== null;
  }
  if (target === JS_PEER_SCSS_SPECIFIER) {
    return resolveJsPeerScss(jsDistRoot) !== null;
  }
  return fs.existsSync(path.resolve(distSkillRoot, target));
};
