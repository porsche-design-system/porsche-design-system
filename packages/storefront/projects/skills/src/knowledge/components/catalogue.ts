import { type Example, examples } from '@porsche-design-system/examples';
import { parseMdxToMdast } from '../mdx/renderMdxToMarkdown';
import type { SkillAccessibilityExample, SkillAccessibilityMeta } from './accessibility';
import type { SkillExample } from './examples';
import type { ComponentDocsSource } from './reference';

/**
 * Looks the examples a component's meta lists up in the catalogue of `@porsche-design-system/examples`, which holds
 * their title, description (MDX source) and code. Fails for an id the catalogue lacks or of the wrong kind, so a
 * renamed example breaks the build rather than the skill.
 */

const lookUp = (id: string): Example => {
  const example = (examples as Partial<Record<string, Example>>)[id];
  if (!example) {
    throw new Error(`[skills] "${id}" is not an example of @porsche-design-system/examples`);
  }
  return example;
};

export const toSkillExample = (id: string): SkillExample => {
  const example = lookUp(id);
  if (example.kind !== 'story' && example.kind !== 'framework') {
    throw new Error(`[skills] "${id}" is a ${example.kind}, not a story or framework example`);
  }
  const { title, description, code } = example;
  return { id, title, ...(description !== undefined && { description: parseMdxToMdast(description) }), code };
};

export const toSkillAccessibilityExample = (id: string): SkillAccessibilityExample => {
  const example = lookUp(id);
  if (example.kind !== 'accessibility') {
    throw new Error(`[skills] "${id}" is a ${example.kind}, not an accessibility example`);
  }
  const { title, antiPattern, recommended } = example;
  return { title, antiPattern, recommended };
};

/** A component's docs meta as the Storefront writes it: its examples by id, in their order. */
export type StorefrontComponentDocs = Omit<ComponentDocsSource, 'configurator' | 'examples' | 'accessibility'> & {
  configurator: string;
  examples: string[];
  accessibility: Omit<SkillAccessibilityMeta, 'examples'> & { examples: string[] };
};

/** The docs meta of a component with its examples looked up, as the knowledge skill renders them. */
export const resolveComponentDocs = (docs: StorefrontComponentDocs): ComponentDocsSource => ({
  ...docs,
  configurator: toSkillExample(docs.configurator),
  examples: docs.examples.map(toSkillExample),
  accessibility: { ...docs.accessibility, examples: docs.accessibility.examples.map(toSkillAccessibilityExample) },
});
