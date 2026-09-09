import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { type RouteReferences, rewriteDocLinks } from '../../shared/links';
import type { SkillTree } from '../../shared/skillTree';
import {
  buildSubComponentMap,
  componentStatus,
  renderComponentApi,
  renderComponentStatusBanner,
  renderSubComponents,
} from './api';
import { type ComponentExamplesSource, writeComponentExamples } from './examples';
import { deriveIconNames, renderIconsReference } from './icons';
import { type ComponentProseSource, renderComponentProse } from './prose';

/**
 * Writes component references and returns the roster embedded in SKILL.md.
 */

/**
 * Structural docs subset keeps generation decoupled from storefront models and testable with MDX
 * fixtures.
 */
export type ComponentDocsSource = ComponentProseSource & ComponentExamplesSource;

export type ComponentDocsMetaMap = Record<string, ComponentDocsSource>;

export type ComponentRosterEntry = { tag: string; summary: string; status?: 'deprecated' | 'experimental' };

export type ComponentReferencesInput = {
  docsMeta: ComponentDocsMetaMap;
  /** Authoritative `componentMeta`; must cover every `docsMeta` tag (both derive from component-meta). */
  componentMeta: Record<string, ComponentMeta>;
  routeReferences: RouteReferences;
};

export type ComponentReferenceReport = {
  tags: string[];
  roster: ComponentRosterEntry[];
};

/**
 * Uses `docsMeta` as the iteration source so the completeness gate validates the same component set.
 */
export const writeComponentReferences = (
  tree: SkillTree,
  { docsMeta, componentMeta, routeReferences }: ComponentReferencesInput
): ComponentReferenceReport => {
  const tags = Object.keys(docsMeta).sort();
  const roster: ComponentRosterEntry[] = [];
  const subComponentsByParent = buildSubComponentMap(componentMeta);

  // Emit the large shared icon union once instead of repeating it in every typed prop.
  const iconNames = new Set(deriveIconNames(componentMeta));
  if (iconNames.size > 0) {
    tree.writeReference('icons.md', renderIconsReference([...iconNames]));
  }

  for (const tag of tags) {
    const apiMeta = componentMeta[tag];
    if (!apiMeta) {
      throw new Error(`No component-meta for documented tag ${tag} — docsMeta and componentMeta diverged.`);
    }
    const { markdown, summary, accessibilityMarkdown } = renderComponentProse(
      tag,
      docsMeta[tag],
      renderComponentStatusBanner(apiMeta),
      tree.framework
    );
    if (accessibilityMarkdown) {
      const accessibilityPath = `components/${tag}/accessibility.md`;
      tree.writeReference(
        accessibilityPath,
        rewriteDocLinks(accessibilityMarkdown, `references/${accessibilityPath}`, routeReferences)
      );
    }
    const sections = [markdown, renderComponentApi(apiMeta, iconNames)];
    const subComponents = subComponentsByParent[tag];
    if (subComponents && subComponents.length > 0) {
      sections.push(renderSubComponents(subComponents, iconNames));
    }
    const examplesTable = writeComponentExamples(tree, tag, docsMeta[tag]);
    if (examplesTable) {
      sections.push(examplesTable);
    }
    const relativePath = `components/${tag}/${tag}.md`;
    tree.writeReference(
      relativePath,
      rewriteDocLinks(sections.join('\n\n'), `references/${relativePath}`, routeReferences)
    );
    const status = componentStatus(apiMeta);
    roster.push({
      tag,
      summary,
      ...(status ? { status } : {}),
    });
  }

  return { tags, roster };
};
