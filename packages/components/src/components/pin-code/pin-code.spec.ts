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

  it('should not call initHiddenInput() if component is used within form and not set hiddenInput', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const spy = jest.spyOn(pinCodeUtils, 'initHiddenInput');

    component.componentWillLoad();

    expect(spy).not.toBeCalled();
  });
});

describe('componentWillRender', () => {});

describe('render', () => {});

describe('onClick', () => {});

describe('onInput', () => {});

describe('onKeyDown', () => {});

describe('onPaste', () => {});

describe('updateValue', () => {});

describe('focusFirstEmptyOrLastElement', () => {});
