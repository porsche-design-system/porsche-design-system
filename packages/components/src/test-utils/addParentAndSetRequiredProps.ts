import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/shared';

export const addParentAndSetRequiredProps = (tagName: TagName, component: any): void => {
  const meta = getComponentMeta(tagName);
  if (meta.requiredParent) {
    const parent = document.createElement(meta.requiredParent);
    parent.append(component.host as HTMLElement);
  }

  if (meta.requiredChild) {
    const [childTagName, childAttribute] = meta.requiredChild.split(' ');
    const child = document.createElement(childTagName);
    if (childAttribute) {
      const [childAttributeName, childAttributeValue] = childAttribute.replace(/"/g, '').split('=');
      child[childAttributeName] = childAttributeValue;
    }

    component.host.append(child);
    component[childTagName] = child;
  }

  if (meta.requiredProps) {
    meta.requiredProps.forEach((prop) => {
      component[prop] = 'some value';
    });
  }

  if (meta.hasEvent) {
    meta.eventNames.forEach((event) => {
      component[event] = jest.fn();
    });
  }

  if (tagName === 'p-link-tile-model-signature') {
    meta.namedSlots.forEach((slotName, i) => {
      const child = document.createElement('p-link');
      child.href = '#';
      child.slot = slotName;
      child.variant = i < 1 ? 'primary' : 'secondary';
      child.theme = 'dark';

      component.host.appendChild(child);
    });
  }
};
