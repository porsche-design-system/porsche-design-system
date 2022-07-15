import { getDirectAndOnlyChildOfKindHTMLElementOrThrow, getTagName } from '../../utils';

export const throwIfInvalidLinkUsage = (host: HTMLElement, hrefValue: string): void => {
  let isInvalid = hrefValue && !!host.children.length;

  if (!isInvalid || !hrefValue) {
    try {
      !hrefValue && getDirectAndOnlyChildOfKindHTMLElementOrThrow(host, 'a');
    } catch {
      isInvalid = true;
    }
  }

  if (isInvalid) {
    throw new Error(
      `Usage of ${getTagName(
        host
      )} is not valid. Please provide a href property or a single and direct 'a' child element.`
    );
  }
};
