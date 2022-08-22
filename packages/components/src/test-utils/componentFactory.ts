import type { TagName } from '@porsche-design-system/shared';
import type { ClassType } from './tag-names-constructor-map';
import { TAG_NAMES_CONSTRUCTOR_MAP } from './tag-names-constructor-map';

export const componentFactory = (tagName: TagName): ClassType => {
  const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
  component.host = document.createElement(tagName);
  component.host.attachShadow({ mode: 'open' });
  return component;
};
