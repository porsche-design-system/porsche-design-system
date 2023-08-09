import * as formUtils from '../../utils/form';
import { PinCode } from "./pin-code";

describe('componentWillLoad', () => {
  it('should call isWithinForm() and set isWithinForm', () => {
    const component = new PinCode();
    const spy = jest.spyOn(formUtils, 'isWithinForm');

    expect(component['isWithinForm']).toBe(undefined);

    spy.mockReturnValue(true);
    component.componentWillLoad();
    expect(component['isWithinForm']).toBe(true);

    spy.mockReturnValue(false);
    component.componentWillLoad();
    expect(component['isWithinForm']).toBe(false);
  });
});
