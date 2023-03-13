import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const addParentAndSetRequiredProps = (tagName: TagName, component: any): void => {
  const { requiredParent, requiredChild, requiredProps, props, hasEvent, eventNames, namedSlots } =
    getComponentMeta(tagName);
  if (requiredParent) {
    const parent = document.createElement(requiredParent);
    parent.append(component.host as HTMLElement);
  }

  if (requiredChild) {
    const [childTagName, childAttribute] = requiredChild.split(' ');
    const child = document.createElement(childTagName);
    if (childAttribute) {
      const [childAttributeName, childAttributeValue] = childAttribute.replace(/"/g, '').split('=');
      child[childAttributeName] = childAttributeValue;
    }

    component.host.append(child);
    component[childTagName] = child;
  }

  if (requiredProps) {
    requiredProps.forEach((prop) => {
      component[prop] = props[prop] ?? 'some value';
    });
  }

  if (hasEvent) {
    eventNames.forEach((event) => {
      component[event] = jest.fn();
    });
  }

  if (tagName === 'p-link-tile-model-signature') {
    namedSlots.forEach((slotName, i) => {
      const child = document.createElement('p-link');
      child.href = '#';
      child.slot = slotName;
      child.variant = i < 1 ? 'primary' : 'secondary';
      child.theme = 'dark';

      component.host.appendChild(child);
    });
  }
};
