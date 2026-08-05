import fs from 'node:fs';
import path from 'node:path';
import type { DeprecationEntry, DeprecationSource, SourceCategory } from '../types';
import { emotionRoot, vanillaExtractRoot } from './packageRoots';

/**
 * Collects the deprecated exports of the two TypeScript styling solutions, which share a layout: each
 * domain keeps its legacy surface in a `src/<domain>/deprecated/` directory whose `index.ts` re-exports
 * the public names, and each declaration carries an `@deprecated` JSDoc naming its replacement.
 *
 * That authored JSDoc is why no replacement has to be invented here: `Use radiusLg instead` and
 * `Use 1px instead` were written by the team that made the deprecation, at the exact version.
 *
 * The public surface is taken from the `index.ts` re-export graph rather than from whatever happens to
 * be exported by a file, because the directories also hold shared internals (`_displayFontPartA`,
 * `displayShared.ts`) that are not part of the package's API and must not be reported to a project.
 */

type ExportSite = { name: string; file: string };

const isSource = (file: string): boolean => file.endsWith('.ts') && !file.endsWith('.spec.ts');

/**
 * Every name a `deprecated/` tree exports, resolved through its `index.ts` files. Handles the two
 * re-export forms the packages use — `export { a, b } from './x'` and `export * from './x'` — and
 * recurses, since typography nests one level deeper (`typography/deprecated/display/index.ts`).
 */
const resolveExports = (indexFile: string, seen: Set<string> = new Set()): ExportSite[] => {
  if (seen.has(indexFile) || !fs.existsSync(indexFile)) {
    return [];
  }
  seen.add(indexFile);

  const dir = path.dirname(indexFile);
  const source = fs.readFileSync(indexFile, 'utf-8');
  const sites: ExportSite[] = [];

  for (const match of source.matchAll(/export\s+\*\s+from\s+'([^']+)'/g)) {
    sites.push(...resolveExports(resolveTarget(dir, match[1] ?? ''), seen));
  }

  for (const match of source.matchAll(/export\s*\{([^}]*)\}\s*from\s*'([^']+)'/g)) {
    const target = resolveTarget(dir, match[2] ?? '');
    for (const clause of (match[1] ?? '').split(',')) {
      // `export { a as b }` publishes `b`; the alias is what a project writes.
      const name = clause
        .split(/\s+as\s+/)
        .pop()
        ?.replace(/\btype\b/, '')
        .trim();
      if (name) {
        sites.push({ name, file: target });
      }
    }
  }

  return sites;
};

/** Resolve a relative specifier to the file it names, preferring `<specifier>.ts` over its directory index. */
const resolveTarget = (dir: string, specifier: string): string => {
  const base = path.resolve(dir, specifier);
  return fs.existsSync(`${base}.ts`) ? `${base}.ts` : path.join(base, 'index.ts');
};

/** The `@deprecated` message on `name`'s declaration in `file`, or `undefined` when it carries none. */
const deprecationMessage = (file: string, name: string): string | undefined => {
  if (!fs.existsSync(file) || !isSource(file)) {
    return undefined;
  }
  const source = fs.readFileSync(file, 'utf-8');
  const declaration = new RegExp(String.raw`export\s+(?:const|function|type)\s+${name}\b`).exec(source);
  if (!declaration) {
    return undefined;
  }
  const jsDoc = source.slice(0, declaration.index).match(/\/\*\*([\s\S]*?)\*\/\s*$/);
  const message = jsDoc?.[1]
    ?.replace(/^\s*\*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!message || !/@deprecated/i.test(message)) {
    return undefined;
  }
  return message.replace(/^@deprecated\s*/i, '').trim();
};

const parseReplacement = (message: string): string | undefined => {
  const match = message.match(/\b[Uu]se (?:the )?[`']?([^`'.,]+?)[`']?(?: instead\b|\.|$)/);
  return match?.[1]?.trim() || undefined;
};

const collect = (root: string, category: SourceCategory, origin: string): DeprecationSource => {
  const src = path.join(root, 'src');
  const entries: DeprecationEntry[] = [];
  const seenNames = new Set<string>();

  for (const domain of fs.readdirSync(src).sort()) {
    const indexFile = path.join(src, domain, 'deprecated', 'index.ts');
    for (const { name, file } of resolveExports(indexFile)) {
      if (seenNames.has(name)) {
        continue;
      }
      seenNames.add(name);
      const message = deprecationMessage(file, name);
      entries.push({
        id: `styleAlias/${category}/${name}`,
        kind: 'styleAlias',
        source: category,
        identifier: name,
        message: message ?? '',
        replacement: message ? parseReplacement(message) : undefined,
        reference: `references/styles/${category === 'emotion' ? 'emotion' : 'vanilla-extract'}.md`,
      });
    }
  }

  entries.sort((a, b) => a.identifier.localeCompare(b.identifier));

  return { category, origin, entries };
};

export const collectEmotionDeprecations = (): DeprecationSource =>
  collect(emotionRoot(), 'emotion', "the Emotion package's `deprecated/` exports");

export const collectVanillaExtractDeprecations = (): DeprecationSource =>
  collect(vanillaExtractRoot(), 'vanillaExtract', "the vanilla-extract package's `deprecated/` exports");
