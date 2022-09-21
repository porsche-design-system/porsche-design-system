import { ButtonPure } from './button-pure';
import * as buttonLinkPureUtils from '../../../utils/button-link-pure-utils';
import * as transitionListenerUtils from '../../../utils/transition-listener';
import * as lineHeightUtils from '../../../utils/typography/setLineHeightOnSizeInherit';

jest.mock('../../../utils/button-handling');

describe('componentWillRender', () => {
  it('should call warnIfParentIsPTextAndIconIsNone() with correct parameters', () => {
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

  it('should call transitionListener() with correct parameters when size="inherit"', () => {
    const component = new ButtonPure();
    component.size = 'inherit';
    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
  });

  it('should call setLineHeightOnSizeInherit() with correct parameters when size="inherit"', () => {
    const component = new ButtonPure();
    component.host = document.createElement('p-button-pure');
    const spySetLineHeight = jest.spyOn(lineHeightUtils, 'setLineHeightOnSizeInherit').mockImplementation();

    component.componentDidLoad();
    expect(spySetLineHeight).toBeCalledTimes(0);

    component.size = 'inherit';
    component.host.style.fontSize = '48px';
    component['labelTag'] = document.createElement('span');
    component['sublineTag'] = document.createElement('div');
    component.componentDidLoad();

    expect(spySetLineHeight.mock.calls[0]).toEqual([component.size, component['labelTag']]);
    expect(spySetLineHeight.mock.calls[1]).toEqual([component.size, component['sublineTag']]);
    expect(spySetLineHeight).toBeCalledTimes(2);
  });
});
