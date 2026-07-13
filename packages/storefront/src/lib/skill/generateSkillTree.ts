import { componentMeta } from '@porsche-design-system/component-meta';
import { type ComponentDocsMetaMap, writeComponentReferences } from './components/reference';
import { renderComponentsSection } from './components/section';
import {
  getPackageSkillRouteReferences,
  renderStylesheetsSection,
  renderStylingSection,
  writePackageSkillReferences,
} from './packageSkills';
import { buildSkillMd } from './skillMd';
import { type Framework, SkillTree } from './support/skillTree';
import { renderTokensSection, TOKENS_REFERENCE, writeTokensReference } from './tokensReference';

/**
 * Orchestrates one framework's skill tree, mirroring the generated layout: the package-skill
 * references (`references/stylesheets.md`, `references/styles/*.md`), the tokens reference
 * (`references/tokens.md`), the component references (`references/components/**`, `references/icons.md`),
 * and finally `SKILL.md` assembled from the domain-rendered sections. Adding a domain means adding
 * its write call (and section, if it owns one) here.
 *
 * The component docs meta is passed in rather than imported: it is the storefront's MDX-backed
 * `components.meta`, which only resolves under the MDX/alias-aware runtime the `build:skill` CLI
 * wires up (see `scripts/build-skill.ts`).
 */
export const generateSkillTree = (root: string, framework: Framework, docsMeta: ComponentDocsMetaMap): void => {
  const routeReferences = {
    ...getPackageSkillRouteReferences(),
    tokens: `references/${TOKENS_REFERENCE}`,
  };

  const tree = new SkillTree(root, framework);
  tree.reset();

  writePackageSkillReferences(tree, routeReferences);
  writeTokensReference(tree);
  const { roster } = writeComponentReferences(tree, { docsMeta, componentMeta, routeReferences });

  tree.write(
    'SKILL.md',
    buildSkillMd(framework, {
      components: renderComponentsSection(framework, roster),
      stylesheets: renderStylesheetsSection(framework),
      tokens: renderTokensSection(),
      styling: renderStylingSection(),
    })
  );
};
