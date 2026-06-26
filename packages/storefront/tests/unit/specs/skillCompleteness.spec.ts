import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import { FRAMEWORKS, WRAPPER_SKILL_DIRS } from '@/lib/skill/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Producer completeness gate. Asserts every documented component is fully represented
 * in each committed `skill/` tree (a `references/components/<tag>/<tag>.md` file plus a
 * roster row in `SKILL.md`) and that every emitted example carries a "when to use"
 * description. Fails on a missing component md, a missing roster row, or an example
 * without a description — catching coverage gaps the drift snapshot alone would bless.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');

/**
 * The components the storefront documents — the same filter `sitemap.tsx` uses for
 * `COMPONENT_ROUTES_META` (chunked, top-level components; excludes child components
 * like `p-table-row` that have no standalone docs page). The generator keys component
 * references off this same set, so it is the authoritative coverage source.
 */
const DOCUMENTED_TAGS = Object.entries(componentMeta)
  .filter(([, meta]) => meta.isChunked && !meta.requiredParent)
  .map(([tag]) => tag)
  .sort();

/** Extract the data rows of every markdown table under an `## Examples` heading. */
const exampleRows = (markdown: string): string[][] => {
  const lines = markdown.split('\n');
  const start = lines.findIndex((line) => /^##\s+Examples\b/.test(line));
  if (start === -1) {
    return [];
  }
  const rows: string[][] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('## ')) {
      break; // next section
    }
    if (!line.trim().startsWith('|')) {
      continue;
    }
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    const isHeader = cells[0] === 'Example';
    const isSeparator = cells.every((cell) => /^-+$/.test(cell));
    if (!isHeader && !isSeparator) {
      rows.push(cells);
    }
  }
  return rows;
};

describe('skill tree completeness', () => {
  it('has a non-empty documented-component set to gate against', () => {
    expect(DOCUMENTED_TAGS.length).toBeGreaterThan(0);
  });

  for (const framework of FRAMEWORKS) {
    describe(`${framework} skill tree`, () => {
      const root = path.join(REPO_ROOT, WRAPPER_SKILL_DIRS[framework]);
      const componentsDir = path.join(root, 'references/components');
      const skillMdPath = path.join(root, 'SKILL.md');
      const skillMd = fs.existsSync(skillMdPath) ? fs.readFileSync(skillMdPath, 'utf-8') : '';

      it.each(DOCUMENTED_TAGS)('documents %s with a reference file and a SKILL.md roster row', (tag) => {
        expect(
          fs.existsSync(path.join(componentsDir, tag, `${tag}.md`)),
          `missing references/components/${tag}/${tag}.md`
        ).toBe(true);
        expect(
          skillMd.includes(`[${tag}.md](references/components/${tag}/${tag}.md)`),
          `missing SKILL.md roster row for ${tag}`
        ).toBe(true);
      });

      it('gives every example a description', () => {
        const missing: string[] = [];
        for (const tag of DOCUMENTED_TAGS) {
          const file = path.join(componentsDir, tag, `${tag}.md`);
          if (!fs.existsSync(file)) {
            continue; // reported by the per-component assertion above
          }
          for (const [name, description] of exampleRows(fs.readFileSync(file, 'utf-8'))) {
            if (!description) {
              missing.push(`${tag} › ${name}`);
            }
          }
        }
        expect(missing, `examples without a description: ${missing.join(', ')}`).toEqual([]);
      });
    });
  }
});
