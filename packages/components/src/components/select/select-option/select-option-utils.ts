import type { Theme } from '../../../types';
import { consoleError, getTagNameWithoutPrefix } from '../../../utils';

export type SelectOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Option theme (synchronized from p-select) **/
  theme?: Theme;
};

// TODO: Partially copied from getOnlyChildrenOfKindHTMLElementOrThrow, maybe change getOnlyChildrenOfKindHTMLElementOrThrow to make it usable here
export const validateSelectOption = (slot: HTMLSlotElement, host: HTMLElement): void => {
  const directChildren = slot.assignedNodes();
  const notValid = directChildren.some((child) => {
    return !(
      (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName.toLowerCase() === 'img') ||
      child.nodeType === Node.TEXT_NODE
    );
  });

  if (notValid) {
    consoleError(
      `child HTMLElements of ${getTagNameWithoutPrefix(host)} are invalid. Expected all of: #text or <img />.`,
      host
    );
  }
};
