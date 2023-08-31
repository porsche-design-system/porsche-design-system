import * as isWithinFormUtils from '../../utils/form/isWithinForm';
import { PinCode } from './pin-code';

xdescribe('connectedCallback', () => {
  it('should call isWithinForm() and set isWithinForm', () => {
    const component = new PinCode();
    const spy = jest.spyOn(isWithinFormUtils, 'isWithinForm');

    expect(component['isWithinForm']).toBe(undefined);

    spy.mockReturnValue(true);
    component.connectedCallback();
    expect(component['isWithinForm']).toBe(true);

    spy.mockReturnValue(false);
    component.connectedCallback();
    expect(component['isWithinForm']).toBe(false);
  });
});
