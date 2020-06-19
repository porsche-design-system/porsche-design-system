import { trackEvent } from '../../../src/utils';

describe('trackEvent', () => {
  it('do a call via fetch', () => {
    // @ts-ignore
    const spy = jest.spyOn(global, 'fetch');
    trackEvent('test', 'test');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
