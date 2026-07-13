import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import { describe, expect, it } from 'vitest';
import { ROSTER_SUMMARY_OVERRIDES } from '@/lib/skill/components/prose';
import { getPackageSkillRouteReferences } from '@/lib/skill/packageSkills';
import { FRAMEWORKS, STAGED_SKILL_DIRS } from '@/lib/skill/support/skillTree';

/**
 * Producer completeness gate. Asserts every documented component and every registered
 * non-component reference (package skills, tokens, icons) is fully represented in each staged
 * `skill/` tree (the reference file plus its `SKILL.md` presence) and that every emitted example
 * carries a "when to use" description. Fails on a missing file, a missing roster row or section
 * link, or an example without a description — catching coverage gaps the drift snapshot alone
 * would bless.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');

/**
 * Every non-component reference each tree must ship: the registered package skills (styling
 * solutions + stylesheets), the tokens reference, and the shared icon-name list. All but icons.md
 * must also be linked from SKILL.md (icons.md is linked from the component references instead).
 */
const NON_COMPONENT_REFERENCES: Record<string, { path: string; linkedFromSkillMd: boolean }> = {
  ...Object.fromEntries(
    Object.entries(getPackageSkillRouteReferences()).map(([name, referencePath]) => [
      name,
      { path: referencePath, linkedFromSkillMd: true },
    ])
  ),
  tokens: { path: 'references/tokens.md', linkedFromSkillMd: true },
  icons: { path: 'references/icons.md', linkedFromSkillMd: false },
};

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

/**
 * Sub-components (a `requiredParent` is set) have no standalone docs page; their API is
 * documented under their parent(s) in a "Sub-components" section. Each must appear as a
 * `### \`<tag>\`` heading in at least one parent reference file somewhere in the tree.
 */
const SUB_COMPONENT_TAGS = Object.entries(componentMeta)
  .filter(([, meta]) => meta.requiredParent)
  .map(([tag]) => tag)
  .sort();

/**
 * Component-level status (deprecated/experimental) of a tag, or `undefined`. This lives only on
 * `componentMeta` — never in the prose MDX — so the generator must surface it explicitly; these sets
 * gate that it does, in every tree, for both top-level components and sub-components.
 */
const statusOf = (meta: {
  isDeprecated?: boolean;
  isExperimental?: boolean;
}): 'deprecated' | 'experimental' | undefined =>
  meta.isDeprecated ? 'deprecated' : meta.isExperimental ? 'experimental' : undefined;

const FLAGGED_TAGS = DOCUMENTED_TAGS.filter((tag) => statusOf(componentMeta[tag]));
const FLAGGED_SUB_COMPONENT_TAGS = SUB_COMPONENT_TAGS.filter((tag) => statusOf(componentMeta[tag]));

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
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());
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

  it('only overrides roster summaries for real documented components', () => {
    for (const tag of Object.keys(ROSTER_SUMMARY_OVERRIDES)) {
      expect(DOCUMENTED_TAGS, `stale roster-summary override for ${tag}`).toContain(tag);
    }
  });

  for (const framework of FRAMEWORKS) {
    describe(`${framework} skill tree`, () => {
      const root = path.join(REPO_ROOT, STAGED_SKILL_DIRS[framework]);
      const componentsDir = path.join(root, 'references/components');
      const skillMdPath = path.join(root, 'SKILL.md');
      const skillMd = fs.existsSync(skillMdPath) ? fs.readFileSync(skillMdPath, 'utf-8') : '';

      it.each(
        Object.entries(NON_COMPONENT_REFERENCES)
      )('ships the %s reference and links it from SKILL.md when required', (_name, reference) => {
        expect(fs.existsSync(path.join(root, reference.path)), `missing ${reference.path}`).toBe(true);
        if (reference.linkedFromSkillMd) {
          expect(skillMd.includes(`](${reference.path})`), `SKILL.md does not link ${reference.path}`).toBe(true);
        }
      });

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

      it('documents exactly the componentMeta-derived set — no missing and no extra component references', () => {
        // The staged component dirs are the generator's output, keyed off `componentDocsMeta`. If
        // that iteration source drifts from the `componentMeta` filter (a new/removed/renamed tag, or a
        // sub-component leaking a top-level page), the two sets diverge — assert them equal so neither
        // direction can rot silently.
        const documented = fs.existsSync(componentsDir)
          ? fs
              .readdirSync(componentsDir, { withFileTypes: true })
              .filter((entry) => entry.isDirectory())
              .map((entry) => entry.name)
              .sort()
          : [];
        expect(documented).toEqual(DOCUMENTED_TAGS);
      });

      it.each(SUB_COMPONENT_TAGS)('documents sub-component %s under a parent reference', (tag) => {
        const heading = `### \`${tag}\``;
        const documented = DOCUMENTED_TAGS.some((parent) => {
          const file = path.join(componentsDir, parent, `${parent}.md`);
          return fs.existsSync(file) && fs.readFileSync(file, 'utf-8').includes(heading);
        });
        expect(documented, `sub-component ${tag} is not documented under any parent reference`).toBe(true);
      });

      it.each(FLAGGED_TAGS)('marks deprecated/experimental component %s in its reference and roster row', (tag) => {
        const status = statusOf(componentMeta[tag]);
        const bannerPrefix = status === 'deprecated' ? '> **Deprecated:**' : '> **Experimental:**';
        const file = path.join(componentsDir, tag, `${tag}.md`);
        const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
        expect(content, `missing ${status} status banner in ${tag}.md`).toContain(bannerPrefix);
        expect(skillMd, `missing ${status} roster marker for ${tag}`).toContain(`\`${tag}\` _(${status})_`);
      });

      it.each(FLAGGED_SUB_COMPONENT_TAGS)('marks deprecated/experimental sub-component %s under a parent', (tag) => {
        const status = statusOf(componentMeta[tag]);
        const heading = `### \`${tag}\` _(${status})_`;
        const documented = DOCUMENTED_TAGS.some((parent) => {
          const file = path.join(componentsDir, parent, `${parent}.md`);
          return fs.existsSync(file) && fs.readFileSync(file, 'utf-8').includes(heading);
        });
        expect(documented, `sub-component ${tag} not marked ${status} under any parent reference`).toBe(true);
      });

      it('uses the curated roster summary for overridden components', () => {
        for (const [tag, summary] of Object.entries(ROSTER_SUMMARY_OVERRIDES)) {
          expect(skillMd, `${tag} roster summary not overridden in SKILL.md`).toContain(`| \`${tag}\` | ${summary} |`);
        }
      });

      it('resolves the {js|angular|react|vue} package placeholder everywhere in the tree', () => {
        const offenders: string[] = [];
        const walk = (dir: string): void => {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const abs = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              walk(abs);
            } else if (fs.readFileSync(abs, 'utf-8').includes('{js|angular|react|vue}')) {
              offenders.push(path.relative(root, abs));
            }
          }
        };
        if (fs.existsSync(root)) {
          walk(root);
        }
        expect(offenders, `unresolved framework placeholder in: ${offenders.join(', ')}`).toEqual([]);
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
