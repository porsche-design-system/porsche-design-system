import * as isWithinFormUtils from '../../utils/form/isWithinForm';
import * as pinCodeUtils from './pin-code-utils';
import { PinCode } from './pin-code';

const initComponent = (): PinCode => {
  const component = new PinCode();
  component.host = document.createElement('p-pin-code');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentWillLoad', () => {
  it('should call isWithinForm() with correct parameters and and set isWithinForm', () => {
    const component = initComponent();
    const spy = jest.spyOn(isWithinFormUtils, 'isWithinForm');
    jest.spyOn(pinCodeUtils, 'initHiddenInput').mockImplementation(() => document.createElement('input'));

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host);
    expect(component['isWithinForm']).toBe(false);

    spy.mockReturnValue(true);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host);
    expect(component['isWithinForm']).toBe(true);
  });

  it('should call initHiddenInput() with correct parameters if component is used within form and set hiddenInput', () => {
    const component = initComponent();
    jest.spyOn(isWithinFormUtils, 'isWithinForm').mockReturnValue(true);
    component.name = 'name';
    const hiddenInput = document.createElement('input');
    const spy = jest.spyOn(pinCodeUtils, 'initHiddenInput').mockImplementation(() => {
      hiddenInput.setAttribute('name', component.name);
      return hiddenInput;
    });

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, 'name', '', false, false);
    expect(component['hiddenInput']).toBe(hiddenInput);
  });

  it('should not call initHiddenInput() if component is not used within form and not set hiddenInput', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const spy = jest.spyOn(pinCodeUtils, 'initHiddenInput');

    component.componentWillLoad();

    expect(spy).not.toBeCalled();
    expect(component['hiddenInput']).toBeUndefined();
  });
});

describe('componentWillRender', () => {
  it('should reset prop value and call warnAboutTransformedInitialValue() if value does not consist of digits/whitespaces only', () => {
    const component = initComponent();
    component.host = document.createElement('p-pin-code');
    component.value = '1a&^b';
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component.update = { emit: jest.fn() };

    component.componentWillRender();

    expect(component.value).toStrictEqual('');
    expect(spy).toBeCalledWith(component.host);
  });

  it('should slice prop value and call warnAboutTransformedInitialValue() with correct parameters if value.length is longer then prop length', () => {
    const component = initComponent();
    component.host = document.createElement('p-pin-code');
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component.value = '12 345';
    component.update = { emit: jest.fn() };

    component.componentWillRender();

    expect(component.value).toStrictEqual('12 3');
    expect(spy).toBeCalledWith(component.host, 4);
  });

  it('should not slice prop value and not call warnAboutTransformedInitialValue() if value.length is equal to prop length', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component.value = '1234';
    component.update = { emit: jest.fn() };

    component.componentWillRender();

    expect(component.value).toStrictEqual('1234');
    expect(spy).not.toBeCalled();
  });

  it('should call syncHiddenInput() with correct parameters if component is used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    component['hiddenInput'] = document.createElement('input');
    component.value = '1234';
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput').mockImplementation();

    component.componentWillRender();

    expect(spy).toBeCalledWith(component['hiddenInput'], undefined, '1234', false, false);
  });

  it('should not call syncHiddenInput() if component is not used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');

    component.componentWillRender();

    expect(spy).not.toBeCalled();
  });
});

describe('updateValue()', () => {
  it('should call update.emit() with correct parameters', () => {
    const component = new PinCode();
    const emitSpy = jest.fn();
    component.update = { emit: emitSpy };
    component.value = '1234';

    // @ts-ignore
    component.updateValue();

    expect(emitSpy).toBeCalledWith({ value: component.value, isComplete: true });
  });
});
