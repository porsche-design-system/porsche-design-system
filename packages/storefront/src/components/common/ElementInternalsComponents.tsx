import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { Fragment } from 'react';

export const ElementInternalsComponents = () => {
  const tagNames = (Object.keys(componentMeta) as TagName[])
    .filter((tagName) => componentMeta[tagName]?.hasElementInternals)
    .sort();

  return (
    <>
      {tagNames.map((tagName, index) => (
        <Fragment key={tagName}>
          {index > 0 && ', '}
          <code className="my-fluid-md rounded-lg">{tagName}</code>
        </Fragment>
      ))}
    </>
  );
};
