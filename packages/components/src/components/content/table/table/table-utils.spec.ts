import { warnIfCaptionIsUndefined } from './table-utils';

describe('warnIfCaptionIsUndefined()', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    spy.mockRestore();
  });

  it('should print warning when no caption as prop or named slot is defined', () => {
    const host = document.createElement('p-table');

    warnIfCaptionIsUndefined(host, 'some valid caption');

    expect(spy).toBeCalledTimes(0);

    warnIfCaptionIsUndefined(host, '');
    warnIfCaptionIsUndefined(host, undefined);
    warnIfCaptionIsUndefined(host, null);

    expect(spy).toBeCalledTimes(3);
  });

  it('should not print warning when caption as slot is defined', () => {
    const host = document.createElement('p-table');
    const slot = document.createElement('span');
    slot['slot'] = 'caption';
    host.appendChild(slot);

    warnIfCaptionIsUndefined(host, undefined);
    warnIfCaptionIsUndefined(host, 'some valid caption');

    expect(spy).toBeCalledTimes(0);
  });
});
