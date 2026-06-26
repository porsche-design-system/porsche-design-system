import fs from 'node:fs';
import path from 'node:path';

/**
 * The js package's `/meta` subpath. The framework skills (angular/react/vue) link this rather
 * than their local `../meta`, because every framework wrapper's `meta/` is a re-export shim
 * (`export * from '@porsche-design-system/components-js/meta'`) — only the js package ships the
 * real `component-meta` data. The link is version-exact via the same-version js peer.
 */
export const JS_PEER_META_SPECIFIER = '@porsche-design-system/components-js/meta';

/**
 * A skill tree carries two classes of reference path:
 * - `produced` — files generated into the tree (md, examples, generated assets), referenced by a
 *   path relative to the markdown file they appear in. Resolved against the committed snapshot.
 * - `raw` — raw implementation linked where it physically lives: the skill-root-relative `../meta`
 *   / `../tokens` dist siblings, or the js-peer `/meta` subpath. Resolved against the built dist.
 */
export type ReferenceKind = 'produced' | 'raw';

export type ReferenceLink = {
  /** The reference string exactly as written in the tree. */
  target: string;
  kind: ReferenceKind;
};

const MARKDOWN_LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;
const INLINE_CODE_RE = /`([^`]+)`/g;

const stripFragment = (target: string): string => target.replace(/#.*$/, '').trim();

/**
 * Classify a candidate reference, or return `null` for the many non-reference strings markdown and
 * inline-code throw off (storefront routes `/components/…`, anchors `#tokens`, external URLs,
 * prose code like `aria-label` or the bare package name `component-meta`).
 */
const classify = (target: string): ReferenceKind | null => {
  if (target === JS_PEER_META_SPECIFIER) {
    return 'raw';
  }
  if (target.startsWith('../')) {
    return 'raw'; // escapes the tree → a built-dist sibling (`../meta`, `../tokens`)
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
export const extractReferences = (markdown: string): ReferenceLink[] => {
  const byTarget = new Map<string, ReferenceKind>();
  const add = (raw: string): void => {
    const target = stripFragment(raw);
    if (!target || target.includes('<')) {
      return;
    }
    const kind = classify(target);
    if (kind) {
      byTarget.set(target, kind);
    }
  };
  for (const match of markdown.matchAll(MARKDOWN_LINK_RE)) {
    add(match[1]);
  }
  for (const match of markdown.matchAll(INLINE_CODE_RE)) {
    add(match[1]);
  }
  return [...byTarget].map(([target, kind]) => ({ target, kind }));
};

/** Tree-relative POSIX paths of every `*.md` file under `skillRoot`, sorted for stable iteration. */
export const listMarkdownFiles = (skillRoot: string): string[] => {
  const walk = (current: string): string[] =>
    fs.readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
      const absolute = path.join(current, entry.name);
      return entry.isDirectory() ? walk(absolute) : [absolute];
    });
  return walk(skillRoot)
    .filter((absolute) => absolute.endsWith('.md'))
    .map((absolute) => path.relative(skillRoot, absolute).split(path.sep).join('/'))
    .sort();
};

/**
 * Resolve a single produced reference against a committed-snapshot skill tree.
 * Produced `./…` links are relative to the markdown file they live in; the SKILL.md reference-map's
 * `references/…` rows are relative to the skill root (and SKILL.md is the root file, so the same
 * file-relative resolution is correct for both).
 */
export const resolveProduced = (skillRoot: string, sourceFile: string, target: string): boolean => {
  const absolute = path.resolve(path.dirname(path.join(skillRoot, sourceFile)), target);
  return fs.existsSync(absolute);
};

/**
 * Resolve the js-peer `/meta` subpath against a built js dist root, honouring its `exports` map
 * (`./meta` → `meta/{esm,cjs}/…`). Encodes the shim edge: this targets the js package's real meta,
 * never the framework wrapper's local re-export shim. Returns the resolved file, or `null` if the
 * dist, its package.json, the `./meta` export, or the target file is missing.
 */
export const resolveJsPeerMeta = (jsDistRoot: string): string | null => {
  const pkgPath = path.join(jsDistRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  const entry = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).exports?.['./meta'];
  const relative = typeof entry === 'string' ? entry : (entry?.default ?? entry?.import ?? entry?.types);
  if (!relative) {
    return null;
  }
  const absolute = path.join(jsDistRoot, relative);
  return fs.existsSync(absolute) ? absolute : null;
};

/**
 * Resolve a single raw reference against the built dist.
 * - `@porsche-design-system/components-js/meta` (framework skills) → the js peer's `/meta` subpath.
 * - `../meta` / `../tokens` (skill-root-relative) → this framework's own dist sibling. The js skill's
 *   `../meta` is its real data; framework skills only carry `../tokens` here, never `../meta`.
 */
export const resolveRaw = (distSkillRoot: string, jsDistRoot: string, target: string): boolean => {
  if (target === JS_PEER_META_SPECIFIER) {
    return resolveJsPeerMeta(jsDistRoot) !== null;
  }
  return fs.existsSync(path.resolve(distSkillRoot, target));
};
