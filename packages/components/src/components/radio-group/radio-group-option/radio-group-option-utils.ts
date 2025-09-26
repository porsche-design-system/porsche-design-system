import type { Theme } from '../../../types';
import { consoleError, getTagNameWithoutPrefix } from '../../../utils';
import type { RadioGroupState } from '../radio-group/radio-group-utils';

export type RadioGroupOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** The disabled state of the parent radio-group. */
  disabledParent?: boolean;
  /** The loading state of the parent radio-group. */
  loadingParent?: boolean;
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Option theme (synchronized from p-select) **/
  theme?: Theme;
  /** Name **/
  name?: string;
  /** State **/
  state?: RadioGroupState;
};

// TODO: Partially copied from getOnlyChildrenOfKindHTMLElementOrThrow, maybe change getOnlyChildrenOfKindHTMLElementOrThrow to make it usable here
export const validateRadioGroupOption = (slot: HTMLSlotElement, host: HTMLElement): void => {
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
