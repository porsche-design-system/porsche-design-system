import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { Fragment } from 'react';

// A jsdom test needs the attachInternals() mock for anything the component renders, not just for the component itself,
// e.g. p-carousel renders p-button-pure. So follow nestedComponents until an ElementInternals user turns up.
const usesElementInternals = (tagName: TagName, seen = new Set<TagName>()): boolean => {
  if (componentMeta[tagName]?.hasElementInternals) {
    return true;
  }

  for (const nestedTagName of componentMeta[tagName]?.nestedComponents ?? []) {
    if (!seen.has(nestedTagName)) {
      seen.add(nestedTagName);

      if (usesElementInternals(nestedTagName, seen)) {
        return true;
      }
    }
  }

  return false;
};

export const ElementInternalsComponents = () => {
  const tagNames = (Object.keys(componentMeta) as TagName[]).filter((tagName) => usesElementInternals(tagName)).sort();

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
