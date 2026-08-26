import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { spellings } from '@skills/knowledge/deprecations/spellings';
import type { SourceCategory } from '@skills/knowledge/deprecations/types';
import { getWrapperPackageName } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir, WRAPPER_DIST_DIRS } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Rendering completeness for `references/deprecations.md`.
 *
 * The collectors being complete is necessary but not sufficient: a renderer that silently drops rows
 * produces exactly the failure the index exists to prevent — an audit scanning a short list and
 * reporting a clean project. This gates the last step, per framework, since spellings differ.
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
        // agent guessed the scheme — right for props by luck, wrong for values (`size=small` instead
        // of `size/small`) and wrong for Tailwind aliases, which it typed as `cssVariable` rather than
        // `styleAlias` and therefore graded at the wrong baseline effort.
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

      it('leads every table with the rule id, so the kind is readable from it', () => {
        // The kind is the id's first segment. Style tables never carried a kind column, which is how
        // a Tailwind alias got reported as a `cssVariable`.
        const rendered = reference(framework);
        for (const header of ['| Rule ID | Deprecated | Search for |', '| Rule ID | Deprecated | Replacement']) {
          expect(rendered, `missing table header: ${header}`).toContain(header);
        }
      });

      it("renders this framework's spellings, not another's", () => {
        const rendered = reference(framework);
        const component = SOURCES.flatMap((source) => source.entries).find((entry) => entry.kind === 'component');
        expect(component, 'no deprecated component to gate against').toBeDefined();
        for (const spelling of spellings(component as NonNullable<typeof component>, framework)) {
          expect(rendered, `missing ${framework} spelling ${spelling}`).toContain(spelling);
        }
      });

      it('gives every source category its own section, including the empty ones', () => {
        const headings = Object.keys(sections(reference(framework)));
        for (const source of SOURCES) {
          expect(headings, `no section for ${source.category}`).toContain(LABELS[source.category]);
        }
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
