import { LinkPure } from './link-pure';
import * as transitionListenerUtils from '../../../utils/transition-listener';
import * as linkValidationUtils from '../link-validation';
import * as buttonLinkPureUtils from '../../../utils/button-link-pure-utils';

describe('connectedCallback', () => {
  it('should call throwIfParentIsPTextAndIconIsNone()', () => {
    const spy = jest.spyOn(buttonLinkPureUtils, 'throwIfParentIsPTextAndIconIsNone');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, component.icon);
  });
});

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage()', () => {
    const spy = jest.spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, component.href);
  });
});

describe('componentDidLoad', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const component = new LinkPure();
    component.componentDidLoad();

    expect(spy).toBeCalledTimes(0);
  });

  it('should call transitionListener when size="inherit"', () => {
    const component = new LinkPure();
    component.size = 'inherit';
    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
  });
});
