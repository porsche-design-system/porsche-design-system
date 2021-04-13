import * as transitionListenerUtils from '../../../src/utils/transition-listener';
import { LinkPure } from '../../../src/components/navigation/link-pure/link-pure';
jest.mock('../../../src/utils/focus-handling');

describe('button-pure', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const linkPure = new LinkPure();
    linkPure.componentDidLoad();

    expect(spy).toBeCalledTimes(0);
  });

  it('should call transitionListener when size="inherit"', () => {
    const linkPure = new LinkPure();
    linkPure.size = 'inherit';
    linkPure.componentDidLoad();

    expect(spy).toBeCalledTimes(1);
  });
});
