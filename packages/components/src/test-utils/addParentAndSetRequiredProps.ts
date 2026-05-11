import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { vi } from 'vitest';

export const addParentAndSetRequiredProps = (tagName: TagName, component: any): void => {
  const { requiredParent, requiredChild, propsMeta = {}, hasEvent, eventsMeta, slotsMeta } = getComponentMeta(tagName);

  if (requiredParent) {
    const parent = document.createElement(Array.isArray(requiredParent) ? requiredParent[0] : requiredParent);
    parent.append(component.host as HTMLElement);
  }

  if (requiredChild) {
    const [childTagName, childAttribute] = requiredChild.split(' ');
    const child = document.createElement(childTagName);
    if (childAttribute) {
      const [childAttributeName, childAttributeValue] = childAttribute.replace(/"/g, '').split('=');
      // @ts-expect-error: Type string can't be used to index type HTMLElement
      child[childAttributeName] = childAttributeValue;
    }

    component.host.append(child);
    component[childTagName] = child;
  }

  const requiredNamedSlots = slotsMeta && Object.entries(slotsMeta).filter(([, value]) => value.isRequired);

  if (requiredNamedSlots && requiredNamedSlots.length > 0) {
    for (const [slotName, value] of requiredNamedSlots) {
      const child = document.createElement(value.allowedTagNames[0]);
      child.slot = slotName;

      if (value.allowedTagNames[0].includes('link')) {
        (child as any).href = '#';
      }

      component.host.appendChild(child);
    }
  }

  const requiredProps =
    propsMeta &&
    Object.entries(propsMeta)
      .filter(([, value]) => value.isRequired)
      .map(([key]) => key);

  if (requiredProps) {
    for (const prop of requiredProps) {
      component[prop] = propsMeta[prop].defaultValue ?? 'some value';
    }
  }

  if (hasEvent) {
    for (const event of Object.keys(eventsMeta)) {
      component[event] = vi.fn();
    }
  }
};
