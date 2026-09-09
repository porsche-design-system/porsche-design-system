import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import { getPackageSkillRouteReferences } from '@skills/knowledge/packageSkills';
import { FRAMEWORKS, stagedSkillDir } from '@skills/shared/skillTree';
import { listSkillTreeFiles } from '@skills/shared/skillTreeFiles';
import { describe, expect, it } from 'vitest';

/**
 * Producer completeness gate. Asserts every documented component and every registered
 * non-component reference (package skills, tokens, icons) is fully represented in each staged
 * `skill/` tree (the reference file plus its `SKILL.md` presence). Fails on a missing file,
 * roster row, or section link, catching coverage gaps the drift snapshot alone would bless.
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
  deprecations: { path: 'references/deprecations.md', linkedFromSkillMd: true },
  icons: { path: 'references/icons.md', linkedFromSkillMd: false },
};

/** Every tag `componentMeta` carries — keeps the `componentMeta[tag]` lookups below typed. */
type ComponentTag = keyof typeof componentMeta;

const COMPONENT_TAGS = Object.keys(componentMeta) as ComponentTag[];

/**
 * The components the storefront documents — the same filter `sitemap.tsx` uses for
 * `COMPONENT_ROUTES_META` (chunked, top-level components; excludes child components
 * like `p-table-row` that have no standalone docs page). The generator keys component
 * references off this same set, so it is the authoritative coverage source.
 */
const DOCUMENTED_TAGS = COMPONENT_TAGS.filter(
  (tag) => componentMeta[tag].isChunked && !componentMeta[tag].requiredParent
).sort();

/**
 * Sub-components (a `requiredParent` is set) have no standalone docs page; their API is
 * documented under their parent(s) in a "Sub-components" section. Each must appear as a
 * `### \`<tag>\`` heading in at least one parent reference file somewhere in the tree.
 */
const SUB_COMPONENT_TAGS = COMPONENT_TAGS.filter((tag) => componentMeta[tag].requiredParent).sort();

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

describe('skill tree completeness', () => {
  it('has a non-empty documented-component set to gate against', () => {
    expect(DOCUMENTED_TAGS.length).toBeGreaterThan(0);
  });

  for (const framework of FRAMEWORKS) {
    describe(`${framework} skill tree`, () => {
      const root = path.join(REPO_ROOT, stagedSkillDir('knowledge', framework));
      const componentsDir = path.join(root, 'references/components');
      const skillMdPath = path.join(root, 'SKILL.md');
      const skillMd = fs.existsSync(skillMdPath) ? fs.readFileSync(skillMdPath, 'utf-8') : '';

      it.each(Object.entries(NON_COMPONENT_REFERENCES))(
        'ships the %s reference and links it from SKILL.md when required',
        (_name, reference) => {
          expect(fs.existsSync(path.join(root, reference.path)), `missing ${reference.path}`).toBe(true);
          if (reference.linkedFromSkillMd) {
            expect(skillMd.includes(`](${reference.path})`), `SKILL.md does not link ${reference.path}`).toBe(true);
          }
        }
      );

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

      it.each(DOCUMENTED_TAGS)('links the accessibility reference for %s exactly when it is generated', (tag) => {
        const componentPath = path.join(componentsDir, tag, `${tag}.md`);
        const accessibilityPath = path.join(componentsDir, tag, 'accessibility.md');
        const componentContent = fs.existsSync(componentPath) ? fs.readFileSync(componentPath, 'utf-8') : '';
        const hasAccessibilityReference = fs.existsSync(accessibilityPath);

        expect(componentContent.includes('](./accessibility.md)')).toBe(hasAccessibilityReference);
        if (hasAccessibilityReference) {
          const accessibilityContent = fs.readFileSync(accessibilityPath, 'utf-8');
          expect(accessibilityContent).toContain(`# ${tag} accessibility integration examples`);
          expect(accessibilityContent).toContain('#### ❌ Anti-pattern');
          expect(accessibilityContent).toContain('#### ✅ Recommended');
        }
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

      it('resolves the {js|angular|react|vue} package placeholder everywhere in the tree', () => {
        const offenders = fs.existsSync(root)
          ? listSkillTreeFiles(root).filter((relativePath) =>
              fs.readFileSync(path.join(root, relativePath), 'utf-8').includes('{js|angular|react|vue}')
            )
          : [];
        expect(offenders, `unresolved framework placeholder in: ${offenders.join(', ')}`).toEqual([]);
      });
    });
  }
});
