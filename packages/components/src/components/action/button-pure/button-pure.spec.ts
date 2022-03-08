import { ButtonPure } from './button-pure';
import * as buttonLinkPureUtils from '../../../utils/button-link-pure-utils';
import * as transitionListenerUtils from '../../../utils/transition-listener';

jest.mock('../../../utils/button-handling');

describe('componentWillRender', () => {
  it('should call throwIfParentIsPTextAndIconIsNone()', () => {
    const spy = jest.spyOn(buttonLinkPureUtils, 'warnIfParentIsPTextAndIconIsNone');

    const component = new ButtonPure();
    component.host = document.createElement('p-button-pure');
    component.host.attachShadow({ mode: 'open' });
    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host, component.icon);
  });
});

describe('componentDidLoad', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const component = new ButtonPure();
    component.componentDidLoad();

    expect(spy).not.toBeCalled();
  });

  it('should call transitionListener when size="inherit"', () => {
    const component = new ButtonPure();
    component.size = 'inherit';
    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
  });
});
