import { warnIfCaptionIsMissing } from './table-utils';

describe('warnIfCaptionIsMissing()', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(global.console, 'warn').mockImplementation();
  });
  afterEach(() => {
    spy.mockRestore();
  });

  it('should print warning when no caption as prop or named slot is defined', () => {
    const host = document.createElement('p-table');

    warnIfCaptionIsMissing(host, 'some valid caption');

    expect(spy).not.toBeCalled();

    warnIfCaptionIsMissing(host, '');
    warnIfCaptionIsMissing(host, undefined);
    warnIfCaptionIsMissing(host, null);

    expect(spy).toBeCalledTimes(3);
  });

  it('should not print warning when caption as slot is defined', () => {
    const host = document.createElement('p-table');
    const slot = document.createElement('span');
    slot['slot'] = 'caption';
    host.appendChild(slot);

    warnIfCaptionIsMissing(host, undefined);
    warnIfCaptionIsMissing(host, 'some valid caption');

    expect(spy).not.toBeCalled();
  });
});
