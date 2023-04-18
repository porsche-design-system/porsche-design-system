import { Accordion } from './accordion';
import * as accordionUtils from './accordion-utils';

jest.mock('../../utils/dom');

describe('connectedCallback', () => {
  it('should not call this.observeResize() initially', () => {
    const component = new Accordion();
    const spy = jest.spyOn(component, 'observeResize' as any);
    component.connectedCallback();

    expect(spy).not.toBeCalled();
  });

  it('should call this.observeResize() when this.content is defined', () => {
    const component = new Accordion();
    const spy = jest.spyOn(component, 'observeResize' as any);
    component['content'] = document.createElement('div');
    component.connectedCallback();

    expect(spy).toBeCalledWith();
  });
});

describe('componentDidLoad', () => {
  it('should call this.observeResize()', () => {
    const component = new Accordion();
    const spy = jest.spyOn(component, 'observeResize' as any);
    component.componentDidLoad();

    expect(spy).toBeCalledWith();
  });
});

describe('disconnectedCallback', () => {
  it('should call this.observeResize()', () => {
    const component = new Accordion();
    const spy = jest.spyOn(accordionUtils, 'unobserveResize');
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(undefined);
  });
});

describe('this.observeResize()', () => {
  it('should call observeResize() with correct parameters', () => {
    const spy = jest.spyOn(accordionUtils, 'observeResize');
    const component = new Accordion();
    component['observeResize']();

    expect(spy).toBeCalledWith(undefined, expect.any(Function), { box: 'border-box' });
  });
});
