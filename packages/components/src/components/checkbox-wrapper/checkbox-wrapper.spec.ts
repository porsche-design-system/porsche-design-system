import { CheckboxWrapper } from './checkbox-wrapper';

const initComponent = (): CheckboxWrapper => {
  const component = new CheckboxWrapper();
  component.host = document.createElement('p-checkbox-wrapper');
  component.host.attachShadow({ mode: 'open' });
  const inputElement = document.createElement('input');
  inputElement.type = 'checkbox';
  component.host.append(inputElement);
  return component;
};

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
