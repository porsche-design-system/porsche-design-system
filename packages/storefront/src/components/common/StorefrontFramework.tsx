'use client';

import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { useFrameworkValue } from '@/hooks/useFrameworkValue';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { frameworkRenderContextMap, frameworks, type SkillId } from '@/models/framework';

const formatMap = {
  suffix: 'frameworkSuffix',
  name: 'frameworkName',
} as const;

/**
 * Framework selector bound to the storefront-wide framework, so every switch and snippet on a page —
 * and the code examples elsewhere in the storefront — stay in sync.
 */
export const StorefrontFrameworkTabs = ({ label, className }: { label: string; className?: string }) => {
  const { storefrontFramework, setStorefrontFramework } = useStorefrontFramework();

  return (
    <FrameworkTabs
      className={className}
      frameworks={frameworks}
      framework={storefrontFramework}
      onFrameworkChange={setStorefrontFramework}
      label={label}
    />
  );
};

/**
 * The framework selected storefront-wide, e.g. `react`; Vanilla JS resolves to `js` to match the
 * package and skill names. Renders plain text so it can be used inline anywhere, including inside a
 * code block, and composed into the values that are derived from it.
 */
export const StorefrontFramework = ({ format = 'suffix' }: { format?: keyof typeof formatMap }) =>
  useFrameworkValue(frameworkRenderContextMap)[formatMap[format]];

/** npm package of the selected framework, e.g. `@porsche-design-system/components-react`. */
export const FrameworkPackage = () => useFrameworkValue(frameworkRenderContextMap).componentPackageName;

/** Skill directory of the selected framework, e.g. `pds-knowledge-react`. */
export const FrameworkSkill = ({ skill = 'knowledge' }: { skill?: SkillId }) =>
  useFrameworkValue(frameworkRenderContextMap).getSkillName(skill);
