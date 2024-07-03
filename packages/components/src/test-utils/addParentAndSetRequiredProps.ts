import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const addParentAndSetRequiredProps = (tagName: TagName, component: any): void => {
  const { requiredParent, requiredChild, propsMeta, hasEvent, eventsMeta, requiredNamedSlots } =
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

  if (requiredNamedSlots) {
    requiredNamedSlots.forEach(({ slotName, tagName: requiredTagName }) => {
      const child = document.createElement(requiredTagName);
      child.slot = slotName;

      if (requiredTagName.includes('link')) {
        (child as any).href = '#';
      }

      component.host.appendChild(child);
    });
  }

  const requiredProps = Object.entries(propsMeta)
    .filter(([, value]) => value.isRequired)
    .map(([key]) => key);

  if (requiredProps) {
    requiredProps.forEach((prop) => {
      component[prop] = propsMeta[prop].defaultValue ?? 'some value';
    });
  }

  if (hasEvent) {
    Object.keys(eventsMeta).forEach((event) => {
      component[event] = jest.fn();
    });
  }
};
