'use client';

import type { SkillId } from '@porsche-design-system/skills/registry';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { frameworkRenderContextMap } from '@/models/framework';

const formatMap = {
  suffix: 'frameworkSuffix',
  name: 'frameworkName',
} as const;

const useFrameworkRenderContext = () => frameworkRenderContextMap[useStorefrontFramework().framework];

/**
 * The framework selected storefront-wide, e.g. `react`; Vanilla JS resolves to `js` to match the
 * package and skill names. Renders plain text so it can be used inline anywhere, including inside a
 * code block, and composed into the values that are derived from it.
 */
export const StorefrontFramework = ({ format = 'suffix' }: { format?: keyof typeof formatMap }) =>
  useFrameworkRenderContext()[formatMap[format]];

/** npm package of the selected framework, e.g. `@porsche-design-system/components-react`. */
export const FrameworkPackage = () => useFrameworkRenderContext().componentPackageName;

/** Skill directory of the selected framework, e.g. `pds-knowledge-react`. */
export const FrameworkSkill = ({ skill = 'knowledge' }: { skill?: SkillId }) =>
  useFrameworkRenderContext().getSkillName(skill);
