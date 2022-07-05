import type { TagName } from '@porsche-design-system/shared';

// TODO: use getComponentMeta for less manual maintenance
export const addParentAndSetRequiredProps = (tagName: TagName, component: any): void => {
  // some components like grid-item and text-list-item require a parent to apply styles
  const parent = document.createElement('div');
  parent.append(component.host as HTMLElement);

  if (['p-checkbox-wrapper', 'p-radio-button-wrapper', 'p-text-field-wrapper'].includes(tagName)) {
    component.input = document.createElement('input');
  } else if (tagName === 'p-textarea-wrapper') {
    component.textarea = document.createElement('textarea');
  } else if (tagName === 'p-select-wrapper') {
    component.select = document.createElement('select');
  } else if (tagName === 'p-modal') {
    component.aria = { 'aria-label': 'Some Heading' };
  } else if (tagName === 'p-segmented-control-item') {
    component.value = 'Some value';
  }
};
