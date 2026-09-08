import { vi } from 'vitest';
import * as a11yUtils from '../../../utils/a11y/select/select-aria';
import * as attachComponentCssUtils from '../../../utils/jss';
import * as prefixedTagNamesUtils from '../../../utils/tag-name';
import * as validatePropsUtils from '../../../utils/validation/validateProps';
import { SelectOption } from './select-option';

const initComponent = (): SelectOption => {
  const component = new SelectOption();
  const host = document.createElement('p-select-option') as HTMLElement & {
    selected: boolean;
    highlighted: boolean;
    hidden: boolean;
    disabledParent: boolean;
  };
  host.attachShadow({ mode: 'open' });
  host.selected = false;
  host.highlighted = false;
  host.hidden = false;
  host.disabledParent = false;
  component.host = host as any;
  return component;
};

describe('hasValue computation passed to getOptionAriaAttributes', () => {
  beforeEach(() => {
    vi.spyOn(validatePropsUtils, 'validateProps').mockImplementation(() => {});
    vi.spyOn(attachComponentCssUtils, 'attachComponentCss').mockImplementation(() => {});
    vi.spyOn(prefixedTagNamesUtils, 'getPrefixedTagNames').mockReturnValue({ pIcon: 'p-icon' } as never);
  });

  it.each<[string | number | null | undefined, boolean]>([
    [undefined, false],
    [null, false],
    ['', true],
    ['abc', true],
    [0, true],
    [42, true],
    [-1, true],
  ])('should pass hasValue=%p when value=%p', (value, expectedHasValue) => {
    const spy = vi.spyOn(a11yUtils, 'getOptionAriaAttributes').mockReturnValue({});
    const component = initComponent();
    component.value = value;

    component.render();

    // Signature: (isSelected, isDisabled, isHidden, hasValue)
    expect(spy).toHaveBeenCalledWith(false, false, false, expectedHasValue);
  });
});



