import { ButtonPure } from './button-pure';
import * as buttonLinkPureUtils from '../../utils/button-link-pure-utils';

jest.mock('../../utils/button-handling');

const initComponent = (): ButtonPure => {
  const component = new ButtonPure();
  component.host = document.createElement('p-button-pure');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('render', () => {
  it('should call warnIfParentIsPTextAndIconIsNone() with correct parameters', () => {
    const spy = jest.spyOn(buttonLinkPureUtils, 'warnIfParentIsPTextAndIconIsNone');

    const component = new ButtonPure();
    component.host = document.createElement('p-button-pure');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, component.icon, component.iconSource);
  });
});

describe('connectedCallback()', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.connectedCallback();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.connectedCallback();
    expect(component['initialLoading']).toBe(false);
  });
});

describe('componentWillUpdate()', () => {
  it('should assign this.initialLoading to true for this.loading = true', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillUpdate();
    expect(component['initialLoading']).toBe(true);
  });
});

describe('componentWillLoad', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(false);
  });
});
