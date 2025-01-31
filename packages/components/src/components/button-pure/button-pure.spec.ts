import * as buttonLinkPureUtils from '../../utils/button-link-pure-utils';
import { ButtonPure } from './button-pure';

jest.mock('../../utils/button-handling');

const initComponent = (): ButtonPure => {
  const component = new ButtonPure();
  component.host = document.createElement('p-button-pure');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = {
    setFormValue: jest.fn(),
    form: { requestSubmit: jest.fn(), reset: jest.fn() } as unknown as HTMLFormElement,
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
  let component: ButtonPure;

  beforeEach(() => {
    mockEvent = new MouseEvent('click');
    jest.spyOn(mockEvent, 'stopPropagation');
    jest.spyOn(mockEvent, 'preventDefault');

    component = initComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
