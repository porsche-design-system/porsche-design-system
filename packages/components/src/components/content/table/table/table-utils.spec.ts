import { warnIfCaptionIsUndefined } from './table-utils';

describe('warnIfCaptionIsUndefined()', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should print warning when no caption as prop or named slot is defined', () => {
    const host = document.createElement('p-table');

    warnIfCaptionIsUndefined(host, '');
    warnIfCaptionIsUndefined(host, undefined);
    warnIfCaptionIsUndefined(host, null);
    warnIfCaptionIsUndefined(host, 'some valid caption');

    expect(console.warn).toBeCalledTimes(3);
  });

  it('should not print warning when caption as slot is defined', () => {
    const host = document.createElement('p-table');
    const slot = document.createElement('span');
    slot['slot'] = 'caption';
    host.appendChild(slot);

    warnIfCaptionIsUndefined(host, undefined);
    warnIfCaptionIsUndefined(host, 'some valid caption');

    expect(console.warn).toBeCalledTimes(0);
  });
});
