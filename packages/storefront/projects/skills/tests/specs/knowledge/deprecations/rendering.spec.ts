import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { type SourceCategory, USAGE_KINDS } from '@skills/knowledge/deprecations/types';
import { getWrapperPackageName } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir, WRAPPER_DIST_DIRS } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Rendering completeness for `references/deprecations.md`.
 *
 * The collectors being complete is necessary but not sufficient: a renderer that silently drops rows
 * produces exactly the failure the index exists to prevent — an audit scanning a short list and
 * reporting a clean project. This gates the last step, per framework, since component locating guidance differs.
 *
 * Rows are counted rather than matched by identifier, because an identifier is rendered inside a
 * larger subject (`p-banner` with `slot="description"`) and a substring check would happily accept a
 * table that lost rows to a formatting bug.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../../..');

/** Mirrors the renderer's category labels, declared here so the test does not import its internals. */
const LABELS: Record<SourceCategory, string> = {
  components: 'Components',
  scss: 'SCSS',
  emotion: 'Emotion',
  vanillaExtract: 'vanilla-extract',
  tailwindcss: 'Tailwind CSS',
  tokens: 'Tokens',
  icons: 'Icons',
  stylesheets: 'Stylesheets',
};

const PUBLIC_EXPORTS = [
  '.',
  './scss',
  './emotion',
  './vanilla-extract',
  './tailwindcss',
  './tokens',
  './index.css',
  './variables.css',
  './color-scheme.css',
] as const;

const INTERNAL_WORKSPACES = [
  '@porsche-design-system/component-meta',
  '@porsche-design-system/scss',
  '@porsche-design-system/emotion',
  '@porsche-design-system/vanilla-extract',
  '@porsche-design-system/tailwindcss',
  '@porsche-design-system/tokens-meta',
  '@porsche-design-system/tokens',
  '@porsche-design-system/stylesheets',
  '@porsche-design-system/partials',
] as const;

const SOURCES = collectDeprecations();
const POPULATED = SOURCES.filter((source) => source.entries.length > 0);
const EMPTY = SOURCES.filter((source) => source.entries.length === 0);

const reference = (framework: (typeof FRAMEWORKS)[number]): string =>
  fs.readFileSync(path.join(REPO_ROOT, stagedSkillDir('knowledge', framework), 'references/deprecations.md'), 'utf-8');

/** The `## <heading>` section bodies of a rendered reference, keyed by heading. */
const sections = (markdown: string): Record<string, string> =>
  Object.fromEntries(
    markdown
      .split(/\n## /)
      .slice(1)
      .map((block) => {
        const newline = block.indexOf('\n');
        return [block.slice(0, newline).trim(), block.slice(newline)];
      })
  );

/** Data rows of a section's markdown table (header and delimiter rows excluded). */
const tableRows = (section: string | undefined): number =>
  section === undefined ? -1 : section.split('\n').filter((line) => line.startsWith('| ')).length - 2;

describe('deprecations reference rendering', () => {
  it('has both populated and empty categories to gate against', () => {
    expect(POPULATED.length).toBeGreaterThan(0);
    expect(EMPTY.length).toBeGreaterThan(0);
  });

  for (const framework of FRAMEWORKS) {
    describe(`${framework} tree`, () => {
      it('renders one table row per collected entry, in every populated category', () => {
        const rendered = sections(reference(framework));
        expect(
          POPULATED.map((source) => [source.category, tableRows(rendered[LABELS[source.category]])])
        ).toStrictEqual(POPULATED.map((source) => [source.category, source.entries.length]));
      });

      it('mentions every collected identifier somewhere in the reference', () => {
        const rendered = reference(framework);
        const missing = SOURCES.flatMap((source) => source.entries).filter(
          (entry) => !rendered.includes(entry.identifier)
        );
        expect(missing.map((entry) => entry.id)).toStrictEqual([]);
      });

      it('renders every entry rule id, so a report never has to invent one', () => {
        // Found by running the audit against a real project: the index rendered no ids at all, so the
        // agent guessed the scheme — right for props by luck and wrong for values.
        const rendered = reference(framework);
        const missing = SOURCES.flatMap((source) => source.entries).filter(
          (entry) => !rendered.includes(`\`${entry.id}\``)
        );
        expect(missing.map((entry) => entry.id)).toStrictEqual([]);
      });

      it('links every row to its skill-root-relative reference', () => {
        const rendered = reference(framework);
        const missing = SOURCES.flatMap((source) => source.entries).filter(
          (entry) => !entry.reference || !rendered.includes(`[${entry.reference}](${entry.reference})`)
        );
        expect(missing.map((entry) => entry.id)).toStrictEqual([]);
      });

      it('emits references that resolve inside the generated knowledge skill', () => {
        const skillRoot = path.join(REPO_ROOT, stagedSkillDir('knowledge', framework));
        const unresolved = SOURCES.flatMap((source) => source.entries).filter(
          (entry) => !entry.reference || !fs.existsSync(path.resolve(skillRoot, entry.reference))
        );
        expect(unresolved.map((entry) => [entry.id, entry.reference])).toStrictEqual([]);
      });

      it('uses one table shape with identifiers and guidance in separate columns', () => {
        const rendered = reference(framework);
        expect(rendered).toContain('| Rule ID | Deprecated | Replacement | Note | Reference |');
        expect(rendered).not.toContain('| Search for |');
      });

      it('renders locating guidance once for every usage kind', () => {
        const rendered = reference(framework);
        for (const usageKind of USAGE_KINDS) {
          expect(rendered).toContain(`| \`${usageKind}\` |`);
        }
      });

      it('keeps the deprecated column to the exact identifier', () => {
        const entry = SOURCES.flatMap((source) => source.entries).find(
          ({ usageKind }) => usageKind === 'propValue'
        ) as NonNullable<(typeof SOURCES)[number]['entries'][number]>;
        expect(reference(framework)).toContain(`| \`${entry.id}\` | \`${entry.identifier}\` |`);
      });

      it('never leaves a named successor stranded in the note column', () => {
        // A row whose note reads `Use x instead.` while its Replacement column is empty is graded one
        // effort level dearer and loses its exact edit, and the audit says "no replacement documented"
        // beside a note that names one. Section 6 reads only the Replacement column, so the column is
        // where a single-identifier successor has to be. 76 rows shipped this way. The identifier has
        // to start like one: `Use 1px instead.` is guidance, not an export, and stays a note.
        const rows = reference(framework)
          .split('\n')
          .filter((line) => line.startsWith('| `'))
          .map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
        const stranded = rows.filter(
          ([, , replacement, note]) =>
            replacement === '—' && /^Use `?[A-Za-z_$][\w$]*`? instead\.$/.test(note ?? '')
        );
        expect(stranded.map(([ruleId, , , note]) => `${ruleId} ${note}`)).toStrictEqual([]);
      });

      it('gives every source category its own section, including the empty ones', () => {
        const headings = Object.keys(sections(reference(framework)));
        for (const source of SOURCES) {
          expect(headings, `no section for ${source.category}`).toContain(LABELS[source.category]);
        }
      });

      it('varies component locating guidance by framework', () => {
        expect(reference('react')).toContain('named JSX prop');
        expect(reference('angular')).toContain('Angular property bindings');
        expect(reference('vue')).toContain('Vue bindings');
        expect(reference('js')).toContain('`setAttribute`');
      });

      it('states that empty categories were checked rather than skipped', () => {
        expect(reference(framework).match(/verified result, not an omission/g) ?? []).toHaveLength(EMPTY.length);
      });

      it("names this framework's public exports instead of internal workspaces", () => {
        const packageJson: { name: string; exports: Record<string, unknown> } = JSON.parse(
          fs.readFileSync(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'package.json'), 'utf-8')
        );
        const rendered = reference(framework);
        expect(packageJson.name).toBe(getWrapperPackageName(framework));

        for (const exportPath of PUBLIC_EXPORTS) {
          expect(packageJson.exports[exportPath], `missing public export ${exportPath}`).toBeDefined();
          const specifier = exportPath === '.' ? packageJson.name : `${packageJson.name}/${exportPath.slice(2)}`;
          expect(rendered, `missing public specifier ${specifier}`).toContain(`\`${specifier}\``);
        }
        for (const workspace of INTERNAL_WORKSPACES) {
          expect(rendered, `internal workspace leaked: ${workspace}`).not.toContain(workspace);
        }
        expect(rendered).not.toContain(`${packageJson.name}/stylesheets`);
        expect(rendered).not.toContain(`${packageJson.name}/partials`);
        expect(rendered).not.toContain('{js|angular|react|vue}');
        expect(rendered).not.toContain('Current values:');
      });
    });
  }
});
