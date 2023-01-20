import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';

/**
 * @param children derived from PropsWithChildren
 *
 * type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined };
 * type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
 * interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
 *     type: T;
 *     props: P;
 *     key: Key | null;
 * }
 */
export const splitChildren = (
  children: ReactNode | undefined
): {
  children: Exclude<ReactNode, null | undefined>[];
  namedSlotChildren: ReactElement[];
  otherChildren: Exclude<ReactNode, null | undefined>[];
} => {
  children =
    typeof children === 'object' && 'type' in children && children.type === Fragment
      ? children.props.children // Unpack children of React.Fragment
      : children;

  const childrenArray = (Array.isArray(children) ? children : children ? [children] : []).filter(
    (x) => x !== undefined && x !== null // children are filtered due to cases where conditionally rendered children can be undefined.
  );

  const otherChildren = childrenArray.filter((child) => !child.props?.slot);
  const namedSlotChildren = childrenArray.filter((child) => child.props?.slot);

  return { children: childrenArray, namedSlotChildren, otherChildren };
};
