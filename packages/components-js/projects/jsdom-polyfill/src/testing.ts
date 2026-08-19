export * from 'shadow-dom-testing-library';

import {
  getByShadowLabelText,
  getByShadowRole,
  getByShadowText,
  type ScreenShadowRoleMatcherParams,
  type ScreenShadowSelectorMatcherParams,
  type ShadowRoleMatcherParams,
  type ShadowSelectorMatcherParams,
  screen,
} from 'shadow-dom-testing-library';

// The three following aliases have always accepted the container as an optional first argument, falling back to the
// whole document when it is omitted. shadow-dom-testing-library splits that into two functions instead, a standalone
// one taking a container and a document-bound one on `screen`, so dispatch on whether a container was passed.
const hasContainer = (args: unknown[]): boolean => typeof (args[0] as HTMLElement)?.querySelectorAll === 'function';

export function getByRoleShadowed<T extends HTMLElement>(...args: ShadowRoleMatcherParams): T;
export function getByRoleShadowed<T extends HTMLElement>(...args: ScreenShadowRoleMatcherParams): T;
export function getByRoleShadowed<T extends HTMLElement>(
  ...args: ShadowRoleMatcherParams | ScreenShadowRoleMatcherParams
): T {
  return hasContainer(args)
    ? getByShadowRole<T>(...(args as ShadowRoleMatcherParams))
    : screen.getByShadowRole<T>(...(args as ScreenShadowRoleMatcherParams));
}

export function getByLabelTextShadowed<T extends HTMLElement>(...args: ShadowSelectorMatcherParams): T;
export function getByLabelTextShadowed<T extends HTMLElement>(...args: ScreenShadowSelectorMatcherParams): T;
export function getByLabelTextShadowed<T extends HTMLElement>(
  ...args: ShadowSelectorMatcherParams | ScreenShadowSelectorMatcherParams
): T {
  return hasContainer(args)
    ? getByShadowLabelText<T>(...(args as ShadowSelectorMatcherParams))
    : screen.getByShadowLabelText<T>(...(args as ScreenShadowSelectorMatcherParams));
}

export function getByTextShadowed<T extends HTMLElement>(...args: ShadowSelectorMatcherParams): T;
export function getByTextShadowed<T extends HTMLElement>(...args: ScreenShadowSelectorMatcherParams): T;
export function getByTextShadowed<T extends HTMLElement>(
  ...args: ShadowSelectorMatcherParams | ScreenShadowSelectorMatcherParams
): T {
  return hasContainer(args)
    ? getByShadowText<T>(...(args as ShadowSelectorMatcherParams))
    : screen.getByShadowText<T>(...(args as ScreenShadowSelectorMatcherParams));
}
