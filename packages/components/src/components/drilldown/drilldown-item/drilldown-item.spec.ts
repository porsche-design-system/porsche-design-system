import { describe, expect, it, vi } from 'vitest';
import { DrilldownItem } from './drilldown-item';

const initComponent = (parentTag?: string): DrilldownItem => {
  const component = new DrilldownItem();
  component.host = document.createElement('p-drilldown-item');
  component.host.attachShadow({ mode: 'open' });
  component.identifier = 'item-1';
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('button click', () => {
  it('should request opening itself when directly inside p-drilldown and not secondary', () => {
    const component = initComponent('p-drilldown');
    component.secondary = false;
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');

    component['onClickButton']();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalUpdate', bubbles: true, detail: { activeIdentifier: 'item-1' } })
    );
  });

  it('should request closing when directly inside p-drilldown and already secondary', () => {
    const component = initComponent('p-drilldown');
    component.secondary = true;
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');

    component['onClickButton']();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalUpdate', bubbles: true, detail: { activeIdentifier: undefined } })
    );
  });

  it('should request opening itself when nested inside another p-drilldown-item and not secondary', () => {
    const component = initComponent('p-drilldown-item');
    component.secondary = false;
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');

    component['onClickButton']();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalUpdate', bubbles: true, detail: { activeIdentifier: 'item-1' } })
    );
  });

  it('should not dispatch anything when nested and already secondary', () => {
    const component = initComponent('p-drilldown-item');
    component.secondary = true;
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');

    component['onClickButton']();

    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });
});

describe('parent validation', () => {
  it('should throw when parent is neither p-drilldown nor p-drilldown-item', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-drilldown', () => {
    const component = initComponent('p-drilldown');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
