import * as getClosestHTMLElementUtils from '../../utils/dom/getClosestHTMLElement';
import * as pinCodeUtils from './pin-code-utils';
import { PinCode } from './pin-code';

const initComponent = (): PinCode => {
  const component = new PinCode();
  component.host = document.createElement('p-pin-code');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('connectedCallback', () => {
  it('should call getClosestHTMLElement() and set isWithinForm', () => {
    const component = initComponent();
    const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');

    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 'form');
    expect(component['isWithinForm']).toBe(false);

    const form = document.createElement('form');
    spy.mockReturnValue(form);

    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 'form');
    expect(component['isWithinForm']).toBe(true);
  });
});

describe('componentWillLoad', () => {
  it('should call initHiddenInput() with correct parameters if component is used within form and set hiddenInput', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    const spy = jest.spyOn(pinCodeUtils, 'initHiddenInput');

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, undefined, '', false, false);
    expect(component['hiddenInput']).not.toBeUndefined();
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
  it('should initialize prop value with array of empty strings and not call warnAboutTransformedInitialValue() if value is not set', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component['update'] = { emit: jest.fn() };

    component.componentWillRender();

    expect(component['value']).toStrictEqual(['', '', '', '']);
    expect(spy).not.toBeCalled();
  });

  it('should reset prop value with array of empty strings and call warnAboutTransformedInitialValue() if value does not consist of digits only', () => {
    const component = initComponent();
    component['value'] = ['1', 'a', '&', '^', 'b'];
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component['update'] = { emit: jest.fn() };

    component.componentWillRender();

    expect(component['value']).toStrictEqual(['', '', '', '']);
    expect(spy).toBeCalledWith();
  });

  it('should slice prop value and call warnAboutTransformedInitialValue() with correct parameters if value.length is longer then prop length', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component['value'] = ['1', '2', '3', '4', '5'];
    component['update'] = { emit: jest.fn() };

    component.componentWillRender();

    expect(component['value']).toStrictEqual(['1', '2', '3', '4']);
    expect(spy).toBeCalledWith(4);
  });

  it('should not slice prop value and not call warnAboutTransformedInitialValue() if value.length is equal to prop length', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedInitialValue');
    component['value'] = ['1', '2', '3', '4'];
    component['update'] = { emit: jest.fn() };

    component.componentWillRender();

    expect(component['value']).toStrictEqual(['1', '2', '3', '4']);
    expect(spy).not.toBeCalled();
  });

  it('should call syncHiddenInput() with correct parameters if component is used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    component['hiddenInput'] = document.createElement('input');
    component['value'] = ['1', '2', '3', '4'];
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');

    component.componentWillRender();

    expect(spy).toBeCalledWith(component['hiddenInput'], undefined, '1234', false, false);
  });

  it('should not call syncHiddenInput() if component is not used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    component['value'] = ['1', '2', '3', '4'];
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');

    component.componentWillRender();

    expect(spy).not.toBeCalled();
  });
});

describe('updateValue()', () => {
  it('should call update.emit()', () => {
    const component = new PinCode();
    const emitSpy = jest.fn();
    component.update = { emit: emitSpy };
    component.value = ['1', '2', '3', '4'];

    // @ts-ignore
    component.updateValue();

    expect(emitSpy).toBeCalledWith({ value: component.value });
  });
});
