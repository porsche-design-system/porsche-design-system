import { componentMeta } from '@porsche-design-system/component-meta';
import type { SkillGenerator } from '../shared/generation';
import { SkillTree } from '../shared/skillTree';
import { type ComponentDocsMetaMap, writeComponentReferences } from './components/reference';
import { renderComponentsSection } from './components/section';
import { collectDeprecations } from './deprecations/collect';
import { renderDeprecationsReference } from './deprecations/reference';
import {
  getPackageSkillRouteReferences,
  renderExamplesSection,
  renderStylesheetsSection,
  renderStylingSection,
  renderTokensSection,
  writePackageSkillReferences,
} from './packageSkills';
import { renderPageSections, type StorefrontPages, writePageReferences } from './pages';
import { buildSkillMd, DEPRECATIONS_REFERENCE_FILE, renderDeprecationsSection } from './skillMd';

const KNOWLEDGE_DIRECTORY_LAYOUT = ['references/components', 'references/examples', 'references/styles'] as const;

type KnowledgeInputs = { docsMeta: ComponentDocsMetaMap; storefrontPages: StorefrontPages };

/**
 * Component docs and Storefront pages are injected because MDX-backed metadata resolves only in the build CLI's
 * alias-aware runtime, and the pages are rendered in a process of their own (`scripts/collect-pages.ts`).
 */
export const generateKnowledgeSkill: SkillGenerator<KnowledgeInputs> = (
  root,
  framework,
  { docsMeta, storefrontPages }
) => {
  const routeReferences = getPackageSkillRouteReferences();
  const tree = new SkillTree(root, framework, KNOWLEDGE_DIRECTORY_LAYOUT);
  tree.reset();

  const pageReferences = writePageReferences(tree, storefrontPages);
  writePackageSkillReferences(tree, routeReferences);
  const { roster } = writeComponentReferences(tree, { docsMeta, componentMeta, routeReferences });
  tree.writeReference(DEPRECATIONS_REFERENCE_FILE, renderDeprecationsReference(collectDeprecations(), framework));

  tree.write(
    'SKILL.md',
    buildSkillMd(framework, {
      pages: renderPageSections(framework, pageReferences),
      components: renderComponentsSection(framework, roster),
      stylesheets: renderStylesheetsSection(framework),
      tokens: renderTokensSection(),
      styling: renderStylingSection(),
      examples: renderExamplesSection(framework),
      deprecations: renderDeprecationsSection(),
    })
  );
};
