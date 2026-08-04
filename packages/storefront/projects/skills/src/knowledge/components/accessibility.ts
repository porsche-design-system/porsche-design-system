import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { Root } from 'mdast';
import type { AccessibilityExample, ExamplePayload } from '../../../../../src/models/accessibilityMeta';
import { resolveExamplePayload } from '../../../../../src/utils/generator/resolveExamplePayload';
import type { Framework } from '../../shared/skillTree';

/**
 * Renders a component's accessibility integration examples (anti-pattern/recommended pairs) inline
 * into its reference — the skill-side counterpart of the Storefront's `A11yIntegrationExamples`. Both
 * consume the same `ExamplePayload` shape and resolve markup through the same `resolveExamplePayload`
 * pipeline — generated snippets (for `kind: 'story'`) or authored `frameworkMarkup` (for
 * `kind: 'example'`) — so Storefront and skill output cannot drift.
 */

/** Skill `Framework` → `FrameworkMarkup` key (the js skill is the vanilla-JS variant). */
const FRAMEWORK_MARKUP_KEY: Record<Framework, keyof FrameworkMarkup> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

/** Skill `Framework` → fence language for the emitted anti-pattern/recommended code blocks. Snippets
 * are bare markup, so only React's JSX warrants a non-markup fence. */
const FENCE_LANGUAGE: Record<Framework, string> = {
  js: 'html',
  angular: 'html',
  react: 'tsx',
  vue: 'html',
};

/** A component's accessibility source — the structural subset of `ComponentDocsMeta.accessibility`
 * the skill reads. The skill consumes prose as rendered mdast where the storefront holds MDX
 * components; the example payloads are the storefront types verbatim, so the two cannot drift. */
export type SkillAccessibilityMeta = {
  overview: Root;
  examples: Record<string, AccessibilityExample>;
  tests: Root;
};

/**
 * Resolve one example side to markup for the given skill framework. Throws — rather than skipping or
 * degrading — identifying the component tag, example key, side and framework, so a missing/empty
 * variant fails the build at its exact source instead of shipping silently blank guidance.
 */
export const resolvePayload = (
  payload: ExamplePayload,
  framework: Framework,
  tag: string,
  key: string,
  side: 'antiPattern' | 'recommended'
): string => {
  return resolveExamplePayload(payload, FRAMEWORK_MARKUP_KEY[framework], { tag, key, side, framework });
};

/**
 * Render the `## Integration examples` section for a component: one `### <name>` subsection per pair,
 * then fenced `#### ❌ Anti-pattern` / `#### ✅ Recommended` code blocks. Returns an empty string for
 * an empty examples map so the section is omitted entirely.
 */
export const renderA11yIntegrationExamples = (
  tag: string,
  examples: Record<string, AccessibilityExample>,
  framework: Framework
): string => {
  const entries = Object.entries(examples);
  if (entries.length === 0) {
    return '';
  }

  const fence = FENCE_LANGUAGE[framework];
  const blocks: string[] = ['## Integration examples'];

  for (const [key, { name, antiPattern, recommended }] of entries) {
    const antiMarkup = resolvePayload(antiPattern, framework, tag, key, 'antiPattern');
    const recommendedMarkup = resolvePayload(recommended, framework, tag, key, 'recommended');

    blocks.push(`### ${name}`);
    blocks.push(`#### ❌ Anti-pattern\n\n\`\`\`${fence}\n${antiMarkup}\n\`\`\``);
    blocks.push(`#### ✅ Recommended\n\n\`\`\`${fence}\n${recommendedMarkup}\n\`\`\``);
  }

  return blocks.join('\n\n');
};
