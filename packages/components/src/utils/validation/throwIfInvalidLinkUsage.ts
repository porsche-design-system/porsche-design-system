import { throwException } from '../log/logger';
import { getTagNameWithoutPrefix } from '../tag-name';
import { getOnlyChildOfKindHTMLElementOrThrow } from './getOnlyChildOfKindHTMLElementOrThrow';

export const throwIfInvalidLinkUsage = (host: HTMLElement, hrefValue: string): void => {
  // without child elements a missing href can't be validated, since a framework may set it after the initial load
  if (!host.children.length) {
    return;
  }

  let isInvalid = !!hrefValue;

  if (!hrefValue) {
    try {
      getOnlyChildOfKindHTMLElementOrThrow(host, 'a');
    } catch {
      isInvalid = true;
    }
  }

  if (isInvalid) {
    throwException(
      `usage of ${getTagNameWithoutPrefix(
        host
      )} is not valid. Please provide a href property or a single and direct <a> child element.`
    );
  }
};
