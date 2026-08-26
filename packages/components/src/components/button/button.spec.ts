import { vi } from 'vitest';
import { Button } from './button';

const initComponent = (): Button => {
  const component = new Button();
  component.host = document.createElement('p-button');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = {
    setFormValue: vi.fn(),
    form: { requestSubmit: vi.fn(), reset: vi.fn() } as unknown as HTMLFormElement,
    states: { add: vi.fn(), delete: vi.fn() } as unknown as CustomStateSet,
  } as unknown as ElementInternals;
  component.form = 'some-form';
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

  it('should call setFormValue() if form prop is defined', () => {
    const component = initComponent();
    const value = 'some-value';
    component.form = 'some-form';
    component.value = value;
    component.componentWillLoad();
    expect(component['internals'].setFormValue).toHaveBeenCalledWith(value);
  });

  it('should not call setFormValue() if form prop is undefined', () => {
    const component = initComponent();
    component.form = undefined;
    component.componentWillLoad();
    expect(component['internals'].setFormValue).not.toHaveBeenCalled();
  });
});

describe('componentWillRender()', () => {
  it('should sync custom states for disabled, loading and variant', () => {
    const component = initComponent();
    component.disabled = true;
    component.loading = false;
    component.variant = 'secondary';

    component.componentWillRender();

    const { add, delete: remove } = component['internals'].states;
    expect(add).toHaveBeenCalledWith('disabled');
    expect(remove).toHaveBeenCalledWith('loading');
    expect(add).toHaveBeenCalledWith('variant-secondary');
    expect(remove).toHaveBeenCalledWith('variant-primary');
    expect(remove).toHaveBeenCalledWith('variant-destructive');
  });

  it('should not throw if CustomStateSet is not supported', () => {
    const component = initComponent();
    component['internals'] = { setFormValue: vi.fn() } as unknown as ElementInternals;

    expect(() => component.componentWillRender()).not.toThrow();
  });

  it('should not throw if ElementInternals is not supported', () => {
    const component = initComponent();
    component['internals'] = undefined;

    expect(() => component.componentWillRender()).not.toThrow();
  });
});

describe('onValueChange()', () => {
  it('should call setFormValue() if form prop is defined', () => {
    const component = initComponent();
    const value = 'some-value';
    component.form = 'some-form';
    component.onValueChange(value);
    expect(component['internals'].setFormValue).toHaveBeenCalledWith(value);
  });

  it('should not call setFormValue() if form prop is undefined', () => {
    const component = initComponent();
    component.form = undefined;
    component.onValueChange('some-value');
    expect(component['internals'].setFormValue).not.toHaveBeenCalled();
  });
});

describe('onClick()', () => {
  let mockEvent: MouseEvent;
  let component: Button;

  beforeEach(() => {
    mockEvent = new MouseEvent('click');
    vi.spyOn(mockEvent, 'stopPropagation');
    vi.spyOn(mockEvent, 'preventDefault');

    component = initComponent();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should stop propagation if the component is disabled or loading', () => {
    component.loading = true;

    component.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(component['internals'].form.requestSubmit).not.toHaveBeenCalled();
    expect(component['internals'].form.reset).not.toHaveBeenCalled();
  });

  it('should call requestSubmit for type "submit"', () => {
    component.loading = false;
    component.type = 'submit';

    component.onClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component['internals'].form.requestSubmit).toHaveBeenCalled();
    expect(component['internals'].form.reset).not.toHaveBeenCalled();
  });

  it('should call reset for type "reset"', () => {
    component.loading = false;
    component.type = 'reset';

    component.onClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component['internals'].form.requestSubmit).not.toHaveBeenCalled();
    expect(component['internals'].form.reset).toHaveBeenCalled();
  });

  it('should not call any form actions for unhandled types', () => {
    component.loading = false;
    component.type = 'button';

    component.onClick(mockEvent);

    expect(component['internals'].form.requestSubmit).not.toHaveBeenCalled();
    expect(component['internals'].form.reset).not.toHaveBeenCalled();
  });

  it('should not call any form actions for missing form id', () => {
    component.form = null;
    component.loading = false;
    component.type = 'submit';

    component.onClick(mockEvent);

    expect(component['internals'].form.requestSubmit).not.toHaveBeenCalled();
    expect(component['internals'].form.reset).not.toHaveBeenCalled();
  });
});
