import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

type ComponentStatusProps = {
  tagName: TagName;
};

export const ComponentStatus = ({ tagName }: ComponentStatusProps) => {
  const meta = componentMeta[tagName];
  return (
    <>
      {meta.isDeprecated && (
        <span title="This component is deprecated and will be removed with the next major release."> 🚫</span>
      )}
      {meta.isExperimental && <span title="This component is experimental and might change in the future."> 🧪</span>}
    </>
  );
};
