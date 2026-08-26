import { vi } from 'vitest';
import * as throwIfInvalidLinkUsageUtils from '../../utils/validation/throwIfInvalidLinkUsage';
import { Link } from './link';

const initComponent = (): Link => {
  const component = new Link();
  component.host = document.createElement('p-link');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = {
    states: { add: vi.fn(), delete: vi.fn() } as unknown as CustomStateSet,
  } as unknown as ElementInternals;
  return component;
};

describe('connectedCallback', () => {
  it('should attach internals only once', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    const internals = { states: { add: vi.fn(), delete: vi.fn() } } as unknown as ElementInternals;
    const spy = vi.fn().mockReturnValue(internals);
    component.host.attachInternals = spy;

    component.connectedCallback();
    component.connectedCallback();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component['internals']).toBe(internals);
  });

  it('should not throw if ElementInternals is not supported', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    component.host.attachInternals = undefined as unknown as HTMLElement['attachInternals'];

    expect(() => component.connectedCallback()).not.toThrow();
    expect(component['internals']).toBeUndefined();
  });

  it('should not throw if attachInternals() throws', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    component.host.attachInternals = vi.fn().mockImplementation(() => {
      throw new Error('NotSupportedError');
    });

    expect(() => component.connectedCallback()).not.toThrow();
    expect(component['internals']).toBeUndefined();
  });
});

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = vi.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new Link();
    component.host = document.createElement('p-link');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith(component.host, component.href);
  });
});

describe('componentWillRender()', () => {
  it('should sync custom states for variant', () => {
    const component = initComponent();
    component.variant = 'secondary';

    component.componentWillRender();

    const { add, delete: remove } = component['internals'].states;
    expect(add).toHaveBeenCalledWith('variant-secondary');
    expect(remove).toHaveBeenCalledWith('variant-primary');
  });

  it('should not throw if CustomStateSet is not supported', () => {
    const component = initComponent();
    component['internals'] = {} as unknown as ElementInternals;

    expect(() => component.componentWillRender()).not.toThrow();
  });

  it('should not throw if ElementInternals is not supported', () => {
    const component = initComponent();
    component['internals'] = undefined;

    expect(() => component.componentWillRender()).not.toThrow();
  });
});
