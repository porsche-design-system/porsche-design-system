import type { Framework } from '@porsche-design-system/shared';
import type { Root } from 'mdast';

/**
 * Renders the accessibility examples of the catalogue, whose snippets the Storefront shows as well.
 */

const FENCE_LANGUAGE: Record<Framework, string> = {
  'vanilla-js': 'html',
  angular: 'html',
  react: 'tsx',
  vue: 'html',
};

/** An accessibility example of the catalogue: its title and the snippets of both sides. */
export type SkillAccessibilityExample = {
  title: string;
  antiPattern: Record<Framework, string>;
  recommended: Record<Framework, string>;
};

export type SkillAccessibilityMeta = {
  overview: Root;
  examples: SkillAccessibilityExample[];
  tests: Root;
};

export const renderA11yIntegrationExamples = (examples: SkillAccessibilityExample[], framework: Framework): string => {
  if (examples.length === 0) {
    return '';
  }

  const fence = FENCE_LANGUAGE[framework];
  const blocks: string[] = ['## Integration examples'];

  for (const { title, antiPattern, recommended } of examples) {
    blocks.push(`### ${title}`);
    blocks.push(`#### ❌ Anti-pattern\n\n\`\`\`${fence}\n${antiPattern[framework]}\n\`\`\``);
    blocks.push(`#### ✅ Recommended\n\n\`\`\`${fence}\n${recommended[framework]}\n\`\`\``);
  }

  return blocks.join('\n\n');
};
