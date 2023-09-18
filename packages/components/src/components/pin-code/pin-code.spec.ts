import * as getClosestHTMLElementUtils from '../../utils/dom/getClosestHTMLElement';
import * as pinCodeUtils from './pin-code-utils';
import { PinCode } from './pin-code';

const initComponent = (): PinCode => {
  const component = new PinCode();
  component.host = document.createElement('p-pin-code');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentWillLoad', () => {
  it('should call getClosestHTMLElement() and set isWithinForm', () => {
    const component = initComponent();
    const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');

    spy.mockReturnValue(null);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, 'form');
    expect(component['isWithinForm']).toBe(false);

    spy.mockReturnValue(document.createElement('form'));
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, 'form');
    expect(component['isWithinForm']).toBe(true);
  });

  it('should call initHiddenInput() with correct parameters if component is used within form and set hiddenInput', () => {
    const component = initComponent();
    jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement').mockReturnValue(document.createElement('form'));
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

describe('componentWillUpdate', () => {
  it('should call syncHiddenInput() with correct parameters if component is used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    component['hiddenInput'] = document.createElement('input');
    component.value = '1234';
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput').mockImplementation();

    component.componentWillUpdate();

    expect(spy).toBeCalledWith(component['hiddenInput'], undefined, '1234', false, false);
  });

  it('should not call syncHiddenInput() if component is not used within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');

    component.componentWillUpdate();

    expect(spy).not.toBeCalled();
  });
});

describe('render', () => {
  it('should call validateInitialValue()', () => {
    const component = initComponent();
    component.value = '1a&^b';
    component.update = { emit: jest.fn() };
    const spy = jest.spyOn(component, 'validateInitialValue' as any);

    component.render();

    expect(component.value).toStrictEqual('');
    expect(spy).toBeCalled();
  });
});

describe('emitUpdateEvent()', () => {
  it('should call update.emit() with correct parameters', () => {
    const component = new PinCode();
    const emitSpy = jest.fn();
    component.update = { emit: emitSpy };
    component.value = '1234';

    // @ts-ignore
    component.emitUpdateEvent();

    expect(emitSpy).toBeCalledWith({ value: component.value, isComplete: true });
  });
});

describe('validateInitialValue()', () => {
  it('should reset prop value and call throwWarningAboutTransformedValue() if value does not consist of digits/whitespaces only', () => {
    const component = initComponent();
    component.value = '1a&^b';
    const spy = jest.spyOn(pinCodeUtils, 'throwWarningAboutTransformedValue');
    component.update = { emit: jest.fn() };

    component['validateInitialValue']();

    expect(component.value).toStrictEqual('');
    expect(spy).toBeCalledWith(component.host);
  });

  it('should slice prop value and call throwWarningAboutTransformedValue() with correct parameters if value.length is longer then prop length', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'throwWarningAboutTransformedValue');
    component.value = '12 345';
    component.update = { emit: jest.fn() };

    component['validateInitialValue']();

    expect(component.value).toStrictEqual('12 3');
    expect(spy).toBeCalledWith(component.host, 4);
  });

  it('should not slice prop value and not call throwWarningAboutTransformedValue() if value.length is equal to prop length', () => {
    const component = initComponent();
    const spy = jest.spyOn(pinCodeUtils, 'throwWarningAboutTransformedValue');
    component.value = '1234';
    component.update = { emit: jest.fn() };

    component['validateInitialValue']();

    expect(component.value).toStrictEqual('1234');
    expect(spy).not.toBeCalled();
  });
});
