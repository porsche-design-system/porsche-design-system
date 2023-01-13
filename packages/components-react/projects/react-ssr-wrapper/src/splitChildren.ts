import type { ReactElement } from 'react';

export const splitChildren = (
  children: ReactElement | ReactElement[]
): {
  children: ReactElement[];
  namedSlotChildren: ReactElement[];
  otherChildren: ReactElement[];
} => {
  const childrenArray: ReactElement[] = (Array.isArray(children) ? children : children ? [children] : []).filter(
    (x) => x !== undefined && x !== null // children are filtered due to cases where conditionally rendered children can be undefined.
  );

  const otherChildren = childrenArray.filter((child) => !child.props?.slot);
  const namedSlotChildren = childrenArray.filter((child) => child.props?.slot);

  return { children: childrenArray, namedSlotChildren, otherChildren };
};
