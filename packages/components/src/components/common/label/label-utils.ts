export const labelId = 'label';
export const descriptionId = 'description';
export const LABEL_TAGS = ['label', 'div'] as const;
export type LabelTag = (typeof LABEL_TAGS)[number];

const INTERACTIVE_SELECTOR =
  'a[href],button,input,select,textarea,summary,[contenteditable]:not([contenteditable="false"]),[tabindex]:not([tabindex="-1"])';

export const isEventInInteractiveLabelContent = (e: MouseEvent): boolean => {
  for (const target of e.composedPath()) {
    if (target === e.currentTarget) {
      break;
    }
    if (target instanceof HTMLElement && target.matches(INTERACTIVE_SELECTOR)) {
      return true;
    }
  }
  return false;
};
