import { LinkPure } from './link-pure';
import * as transitionListenerUtils from '../../../utils/transition-listener';
import * as linkValidationUtils from '../link-validation';
import * as focusHandling from '../../../utils/focus-handling';

jest.mock('../../../utils/focus-handling');

describe('componentWillLoad()', () => {
  it('should call throwIfInvalidLinkUsage() ', () => {
    const spy = jest.spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, component.href);
  });

  it('should call improveFocusHandlingForCustomElement() ', () => {
    const focusHandlingSpy = jest.spyOn(focusHandling, 'improveFocusHandlingForCustomElement');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillLoad();

    expect(focusHandlingSpy).toBeCalledWith(component.host);
  });
});

describe('componentDidLoad()', () => {
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
