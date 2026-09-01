import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { Root } from 'mdast';
import type { AccessibilityExample, ExamplePayload } from '../../../../../src/models/accessibilityMeta';
import { resolveExamplePayload } from '../../../../../src/utils/generator/resolveExamplePayload';
import type { Framework } from '../../shared/skillTree';

/**
 * Uses the storefront's example pipeline so accessibility snippets stay identical in skill output.
 */

/** Maps the skill's `js` identifier to the markup model's `vanilla-js`. */
const FRAMEWORK_MARKUP_KEY: Record<Framework, keyof FrameworkMarkup> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

const FENCE_LANGUAGE: Record<Framework, string> = {
  js: 'html',
  angular: 'html',
  react: 'tsx',
  vue: 'html',
};

export type SkillAccessibilityMeta = {
  overview: Root;
  examples: Record<string, AccessibilityExample>;
  tests: Root;
};

/**
 * Resolves one side and throws with source context instead of shipping empty guidance.
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
