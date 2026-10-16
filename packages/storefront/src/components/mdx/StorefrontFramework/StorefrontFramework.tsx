import type { SkillId } from '@porsche-design-system/skills/registry';
import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { FrameworkContent } from '../shared/FrameworkContent';

const formatMap = {
  suffix: 'frameworkSuffix',
  name: 'frameworkName',
} as const;

const FrameworkValue = ({ resolve }: { resolve: (context: FrameworkRenderContext) => string }) => (
  <FrameworkContent content={resolveFrameworkValues(resolve)} />
);

/**
 * The framework selected storefront-wide, e.g. `react`; Vanilla JS resolves to `js` to match the
 * package and skill names. Renders plain text so it can be used inline anywhere, including inside a
 * code block, and composed into the values that are derived from it.
 */
export const StorefrontFramework = ({ format = 'suffix' }: { format?: keyof typeof formatMap }) => (
  <FrameworkValue resolve={(context) => context[formatMap[format]]} />
);

/** npm package of the selected framework, e.g. `@porsche-design-system/components-react`. */
export const FrameworkPackage = () => <FrameworkValue resolve={(context) => context.componentPackageName} />;

/** Skill directory of the selected framework, e.g. `pds-knowledge-react`. */
export const FrameworkSkill = ({ skill = 'knowledge' }: { skill?: SkillId }) => (
  <FrameworkValue resolve={(context) => context.getSkillName(skill)} />
);
