import { vi } from 'vitest';
import { RadioGroup } from './radio-group';
import type { RadioGroupOption } from './radio-group-utils';
import * as radioGroupUtils from './radio-group-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): RadioGroup => {
  const component = new RadioGroup();
  component.host = document.createElement('p-radio-group');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;
  return component;
};

describe('connectedCallback', () => {
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

  it('should call updateOptions() and updateRadioGroupOptions() with correct parameters', () => {
    const component = initComponent();
    const updateRadioGroupOptionsSpy = vi.spyOn(radioGroupUtils, 'updateRadioGroupOptions');

    component.componentWillLoad();
    expect(updateRadioGroupOptionsSpy).toHaveBeenCalledWith(component['radioGroupOptions'], component['value']);
  });
});

describe('componentDidLoad', () => {
  it('should call setFormValue with correct value', () => {
    const component = initComponent();
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });
});

describe('render', () => {
  it('should call syncRadioGroupChildrenProps() with correct parameters', () => {
    const spy = vi.spyOn(radioGroupUtils, 'syncRadioGroupChildrenProps');
    const component = initComponent();
    component.render();
    expect(spy).toHaveBeenCalledWith(
      component['radioGroupOptions'],
      component.disabled,
      component.loading,
      component.state,
      component.name
    );
  });
});

describe('formResetCallback', () => {
  it('should reset value to defaultValue', () => {
    const component = initComponent();
    const defaultValue = 'default-value';
    component['defaultValue'] = defaultValue;
    component.value = 'test';
    component.formResetCallback();
    expect(component.value).toBe(defaultValue);
  });
});

describe('formDisabledCallback', () => {
  it('should set disabled to true when called with true', () => {
    const component = initComponent();
    component.disabled = false;
    component.formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });
});

describe('formStateRestoreCallback', () => {
  it('should restore value', () => {
    const component = initComponent();
    component.value = 'test';
    const restoredValue = 'restored-value';
    component.formStateRestoreCallback(restoredValue);
    expect(component.value).toBe(restoredValue);
  });
});

describe('updateTabStops', () => {
  const createOption = (value: string, { disabled = false, checked = false } = {}) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.disabled = disabled;
    input.checked = checked;

    const shadowRoot = {
      querySelector: vi.fn().mockImplementation((sel: string) => {
        if (sel === 'input[type="radio"]') return input;
        return null;
      }),
    };

    return {
      value,
      disabled,
      shadowRoot,
    } as unknown as RadioGroupOption;
  };

  const radioInputs = (opt1: RadioGroupOption, opt2?: RadioGroupOption, opt3?: RadioGroupOption) =>
    [opt1, opt2, opt3].map((o) => o.shadowRoot.querySelector('input[type="radio"]') as HTMLInputElement);

  it('should set tabIndex 0 on checked option and tabIndex -1 on all others', () => {
    const component = initComponent();
    const opt1 = createOption('a', { checked: false });
    const opt2 = createOption('b', { checked: true });
    const opt3 = createOption('c', { checked: false });
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    vi.spyOn(radioGroupUtils, 'getCheckedOptionIndex').mockReturnValue(1);
    vi.spyOn(radioGroupUtils, 'getFirstEnabledOptionIndex').mockReturnValue(0);

    (component as any).updateTabStops();

    const inputs = radioInputs(opt1, opt2, opt3);
    expect(inputs[0].tabIndex).toBe(-1);
    expect(inputs[1].tabIndex).toBe(0);
    expect(inputs[2].tabIndex).toBe(-1);
  });

  it('should set tabIndex 0 on 1st possible (not disabled) option if none of them is checked', () => {
    const component = initComponent();
    const opt1 = createOption('a', { disabled: true });
    const opt2 = createOption('b');
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    vi.spyOn(radioGroupUtils, 'getCheckedOptionIndex').mockReturnValue(-1);
    vi.spyOn(radioGroupUtils, 'getFirstEnabledOptionIndex').mockReturnValue(1);

    (component as any).updateTabStops();

    const inputs = radioInputs(opt1, opt2, opt3);
    expect(inputs[0].tabIndex).toBe(-1);
    expect(inputs[1].tabIndex).toBe(0);
    expect(inputs[2].tabIndex).toBe(-1);
  });

  it('should set all inputs to tabindex -1 if they are disabled', () => {
    const component = initComponent();
    const opt1 = createOption('x', { disabled: true });
    const opt2 = createOption('y', { disabled: true });
    const opt3 = createOption('z', { disabled: true });
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    vi.spyOn(radioGroupUtils, 'getFirstEnabledOptionIndex').mockReturnValue(-1);
    vi.spyOn(radioGroupUtils, 'getCheckedOptionIndex').mockReturnValue(-1);

    (component as any).updateTabStops();

    const inputs = radioInputs(opt1, opt2, opt3);
    expect(inputs[0].tabIndex).toBe(-1);
    expect(inputs[1].tabIndex).toBe(-1);
    expect(inputs[2].tabIndex).toBe(-1);
  });

  it('should return if no options are provided', () => {
    const component = initComponent();
    (component as any).radioGroupOptions = [];
    expect(() => (component as any).updateTabStops()).not.toThrow();
  });

  it('should set tabindex -1 to option if it is checked and disabled', () => {
    const component = initComponent();
    const opt1 = createOption('a', { disabled: true, checked: true });
    const opt2 = createOption('b');
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    vi.spyOn(radioGroupUtils, 'getFirstEnabledOptionIndex').mockReturnValue(1);
    vi.spyOn(radioGroupUtils, 'getCheckedOptionIndex').mockReturnValue(-1);

    (component as any).updateTabStops();

    const inputs = radioInputs(opt1, opt2, opt3);
    expect((inputs[0] as HTMLInputElement).tabIndex).toBe(-1);
    expect((inputs[1] as HTMLInputElement).tabIndex).toBe(0);
    expect((inputs[2] as HTMLInputElement).tabIndex).toBe(-1);
  });
});
