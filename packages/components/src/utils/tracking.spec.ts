import { trackEvent } from './tracking';
import { version } from '../../package.json';

describe('trackEvent()', () => {
  it('does a call via fetch', () => {
    const spy = jest.spyOn(global, 'fetch');

    let requestUri = '';
    spy.mockImplementationOnce((val) => {
      requestUri = val.toString();
      return Promise.resolve(new Response());
    });

    trackEvent('test', 'test');

    expect(requestUri).toContain('aws.designsystem.porsche.com');
    expect(requestUri).toContain(version);
    expect(requestUri).not.toContain('0.0.0');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
