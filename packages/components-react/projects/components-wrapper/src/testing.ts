import { getByRole, getByLabelText, getByText } from '@testing-library/dom';
import type { GetByRole, GetByText } from '@testing-library/dom';

const getHTMLElementsWithShadowRoot = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll<HTMLElement>('*')).filter((el) => !!el.shadowRoot);
};

const isParamContainer = (param: HTMLElement): boolean =>
  typeof param.querySelector === 'function' && typeof param.querySelectorAll === 'function';

type Func = (container: HTMLElement, idOrRole: any, options?: any) => HTMLElement;

const shadowFactory =
  (getByFunc: Func, selfFunc: Func) =>
  (container: HTMLElement, idOrRole: Parameters<Func>[1], options?: Parameters<Func>[2]): HTMLElement => {
    let resultElement: HTMLElement;

    if (!isParamContainer(container)) {
      // rewire parameters
      options = idOrRole;
      idOrRole = container;
      container = document.body; // body as fallback
    }

    try {
      resultElement = getByFunc(container, idOrRole, options);
    } catch (e) {
      const elements = getHTMLElementsWithShadowRoot(container);

      for (const el of elements) {
        resultElement = selfFunc(el.shadowRoot as unknown as HTMLElement, idOrRole, options);

        if (resultElement) {
          break;
        }
      }
    }

    return resultElement;
  };

type RemoveFirst<T extends any[]> = T['length'] extends 0
  ? undefined
  : ((...b: T) => void) extends (a, ...b: infer I) => void
  ? I
  : [];

export function getByRoleShadowed<T extends HTMLElement>(...args: Parameters<GetByRole<T>>): T;
export function getByRoleShadowed<T extends HTMLElement>(...args: RemoveFirst<Parameters<GetByRole<T>>>): T;
export function getByRoleShadowed<T extends HTMLElement>(
  ...args: Parameters<GetByRole<T>> | RemoveFirst<Parameters<GetByRole<T>>>
): T {
  // @ts-ignore
  return shadowFactory(getByRole, getByRoleShadowed)(...args);
}

export function getByLabelTextShadowed<T extends HTMLElement>(...args: Parameters<GetByText<T>>): T;
export function getByLabelTextShadowed<T extends HTMLElement>(...args: RemoveFirst<Parameters<GetByText<T>>>): T;
export function getByLabelTextShadowed<T extends HTMLElement>(
  ...args: Parameters<GetByText<T>> | RemoveFirst<Parameters<GetByText<T>>>
): T {
  // @ts-ignore
  return shadowFactory(getByLabelText, getByLabelTextShadowed)(...args);
}

export function getByTextShadowed<T extends HTMLElement>(...args: Parameters<GetByText<T>>): T;
export function getByTextShadowed<T extends HTMLElement>(...args: RemoveFirst<Parameters<GetByText<T>>>): T;
export function getByTextShadowed<T extends HTMLElement>(
  ...args: Parameters<GetByText<T>> | RemoveFirst<Parameters<GetByText<T>>>
): T {
  // @ts-ignore
  return shadowFactory(getByText, getByTextShadowed)(...args);
}
