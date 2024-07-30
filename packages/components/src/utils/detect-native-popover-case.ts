import { getHasNativePopoverSupport } from './';
import { findClosestComponent } from './dom';

export const detectNativePopoverCase = (host: HTMLElement, nested: boolean): boolean | void => {
  if (getHasNativePopoverSupport()) {
    const parentTableElement = findClosestComponent(
      nested ? ((host.getRootNode() as ShadowRoot).host as HTMLElement) : host,
      'pTable'
    );
    if (!!parentTableElement) {
      return true;
    }
  }
};
