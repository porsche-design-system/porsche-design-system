import type { ForwardedRef, MutableRefObject } from 'react';
import { syncRef } from './utils';

/**
 * Removes the marker of a server rendered host once React has hydrated it.
 * The web component waits for the end marker of a host with `data-dsr` while the document is still loading (see the PDS
 * patch of the Stencil runtime, patches/@stencil+core+*.patch). React only hydrates markup that is complete, and may
 * change the children of the host from then on, the end marker included, so the component must no longer wait for it.
 */
export const syncHydratedRef = (
  elementRef: MutableRefObject<HTMLElement | undefined>,
  ref: ForwardedRef<HTMLElement>
): ((el: HTMLElement | null) => void) => {
  const sync = syncRef(elementRef, ref);

  return (el) => {
    el?.removeAttribute('data-dsr');
    sync(el as HTMLElement);
  };
};
