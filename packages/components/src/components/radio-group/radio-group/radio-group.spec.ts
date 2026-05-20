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
  const createOption = (
    value: string,
    {
      disabled = false,
      selected = false,
      loading = false,
      loadingParent = false,
      disabledParent = false,
    } = {}
  ) => {
    return {
      value,
      disabled,
      selected,
      loading,
      loadingParent,
      disabledParent,
      tabIndex: 0,
    } as unknown as RadioGroupOption;
  };

  it('should set tabIndex 0 on checked option and tabIndex -1 on all others', () => {
    const component = initComponent();
    const opt1 = createOption('a');
    const opt2 = createOption('b', { selected: true });
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(0);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should set tabIndex 0 on 1st possible (not disabled) option if none of them is checked', () => {
    const component = initComponent();
    const opt1 = createOption('a', { disabled: true });
    const opt2 = createOption('b');
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(-1);
    expect(radioGroupUtils.getFirstEnabledOptionIndex([opt1, opt2, opt3])).toBe(1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(0);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should set all options to tabindex -1 if they are disabled', () => {
    const component = initComponent();
    const opt1 = createOption('x', { disabled: true, selected: true });
    const opt2 = createOption('y', { disabled: true });
    const opt3 = createOption('z', { disabled: true });
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(-1);
    expect(radioGroupUtils.getFirstEnabledOptionIndex([opt1, opt2, opt3])).toBe(-1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(-1);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should return if no options are provided', () => {
    const component = initComponent();
    (component as any).radioGroupOptions = [];
    expect(() => (component as any).updateTabStops()).not.toThrow();
  });

  it('should not treat a checked-but-disabled option as checked; tabIndex 0 falls through to first enabled', () => {
    const component = initComponent();
    const opt1 = createOption('a', { disabled: true, selected: true });
    const opt2 = createOption('b');
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(-1);
    expect(radioGroupUtils.getFirstEnabledOptionIndex([opt1, opt2, opt3])).toBe(1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(0);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should not assign tabIndex 0 to an unselected option that is only in option-loading state (skip to next focusable)', () => {
    const component = initComponent();
    const opt1 = createOption('a', { loading: true, selected: false });
    const opt2 = createOption('b');
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.isRadioGroupOptionFocusable(opt1)).toBe(false);
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(-1);
    expect(radioGroupUtils.getFirstEnabledOptionIndex([opt1, opt2, opt3])).toBe(1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(0);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should keep tabIndex 0 on the selected option while another unselected option is in option-loading state', () => {
    const component = initComponent();
    const opt1 = createOption('a', { selected: true });
    const opt2 = createOption('b', { loading: true, selected: false });
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(0);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(0);
    expect(opt2.tabIndex).toBe(-1);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should set all tabIndex to -1 when parent group is loading (loadingParent), so no non-interactive host is tabbable', () => {
    const component = initComponent();
    const opt1 = createOption('a', { selected: true, loadingParent: true });
    const opt2 = createOption('b', { loadingParent: true });
    const opt3 = createOption('c', { loadingParent: true });
    (component as any).radioGroupOptions = [opt1, opt2, opt3];
    expect(radioGroupUtils.isRadioGroupOptionFocusable(opt1)).toBe(false);
    expect(radioGroupUtils.getCheckedOptionIndex([opt1, opt2, opt3])).toBe(-1);
    expect(radioGroupUtils.getFirstEnabledOptionIndex([opt1, opt2, opt3])).toBe(-1);

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(-1);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should set all options to tabIndex -1 when the radio group loading prop is true', () => {
    const component = initComponent();
    component.loading = true;
    const opt1 = createOption('a');
    const opt2 = createOption('b', { selected: true });
    const opt3 = createOption('c');
    (component as any).radioGroupOptions = [opt1, opt2, opt3];

    (component as any).updateTabStops();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(-1);
    expect(opt3.tabIndex).toBe(-1);
  });

  it('should restore tabIndex 0 to the selected option after loading ends once loadingParent is synced (componentDidRender)', () => {
    const component = initComponent();
    component.loading = true;
    const opt1 = createOption('a');
    const opt2 = createOption('b', { selected: true });
    (component as any).radioGroupOptions = [opt1, opt2];
    (component as any).updateTabStops();
    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(-1);

    component.loading = false;
    opt1.loadingParent = false;
    opt2.loadingParent = false;

    (component as any).componentDidRender();

    expect(opt1.tabIndex).toBe(-1);
    expect(opt2.tabIndex).toBe(0);
  });
});

describe('onKeyDown', () => {
  const createOption = () => {
    const click = vi.fn();
    return { click } as unknown as RadioGroupOption;
  };

  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should preventDefault and activate the focused option on Space', () => {
    const component = initComponent();
    const opt = createOption();
    (component as any).radioGroupOptions = [opt];
    vi.spyOn(radioGroupUtils, 'getActiveOptionIndex').mockReturnValue(0);
    vi.spyOn(radioGroupUtils, 'isRadioGroupOptionFocusable').mockReturnValue(true);

    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');

    (component as any).onKeyDown(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(opt.click).toHaveBeenCalled();
  });

  it('should not activate when the radio group is disabled', () => {
    const component = initComponent();
    component.disabled = true;
    const opt = createOption();
    (component as any).radioGroupOptions = [opt];
    vi.spyOn(radioGroupUtils, 'getActiveOptionIndex').mockReturnValue(0);

    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');

    (component as any).onKeyDown(event);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(opt.click).not.toHaveBeenCalled();
  });
});
