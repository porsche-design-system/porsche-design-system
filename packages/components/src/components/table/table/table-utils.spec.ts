import { vi } from 'vitest';
import * as domUtils from '../../../utils/dom';
import * as loggerUtils from '../../../utils/log/logger';
import { warnIfCaptionIsMissing } from './table-utils';

describe('warnIfCaptionIsMissing()', () => {
  it('should warn when caption is empty and no named slot exists', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(false);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, '');

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('caption has to be set'), host);
  });

  it('should warn when caption is undefined and no named slot exists', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(false);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, undefined);

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
  });

  it('should not warn when caption is provided', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(false);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, 'Sales data');

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should not warn when caption is empty but named slot exists', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(true);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, '');

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should not warn when both caption and named slot are provided', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(true);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, 'Sales data');

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should include the component tag name in the warning message', () => {
    const host = document.createElement('p-table');
    vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(false);
    const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, '');

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('p-table'), host);
  });

  it('should check the "caption" named slot', () => {
    const host = document.createElement('p-table');
    const hasNamedSlotSpy = vi.spyOn(domUtils, 'hasNamedSlot').mockReturnValue(false);
    vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(() => {});

    warnIfCaptionIsMissing(host, '');

    expect(hasNamedSlotSpy).toHaveBeenCalledWith(host, 'caption');
  });
});
