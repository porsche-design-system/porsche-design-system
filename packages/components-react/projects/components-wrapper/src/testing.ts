import { getByRole } from '@testing-library/dom';
import type { GetByRole } from '@testing-library/dom';
import type { ByRoleMatcher } from '@testing-library/dom/types/matches';
import type { ByRoleOptions } from '@testing-library/dom/types/queries';

const getHTMLElementsWithShadowRoot = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll<HTMLElement>('*')).filter((el) => !!el.shadowRoot);
};

const isParamContainer = (param: HTMLElement): boolean =>
  typeof param.querySelector === 'function' && typeof param.querySelectorAll === 'function';

type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
  ? undefined
  : ((...b: T) => void) extends (a, ...b: infer I) => void
  ? I
  : [];

export function getByRoleShadowed<T extends HTMLElement = HTMLElement>(
  ...args: Parameters<GetByRole<T>>
): ReturnType<GetByRole<T>>;
export function getByRoleShadowed<T extends HTMLElement = HTMLElement>(
  ...args: RemoveFirstFromTuple<Parameters<GetByRole<T>>>
): ReturnType<GetByRole<T>>;
export function getByRoleShadowed<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  role: ByRoleMatcher,
  options?: ByRoleOptions
): ReturnType<GetByRole<T>> {
  let resultElement: T;

  if (!isParamContainer(container)) {
    // rewire parameters
    options = role as ByRoleOptions;
    role = container;
    container =
      typeof container.querySelector === 'function' && typeof container.querySelectorAll === 'function'
        ? container
        : document.body; // body as fallback
  }

  try {
    resultElement = getByRole(container, role, options);
  } catch (e) {
    const elements = getHTMLElementsWithShadowRoot(container);

    for (const el of elements) {
      resultElement = getByRoleShadowed(el.shadowRoot as unknown as T, role, options);

      if (resultElement) {
        break;
      }
    }
  }

  return resultElement;
}
