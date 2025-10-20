import { vi } from 'vitest';
import { warnIfAriaAndHeadingPropsAreUndefined } from './warnIfAriaAndHeadingPropsAreUndefined';

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = vi.spyOn(global.console, 'warn').mockImplementation(() => null);
    const host = document.createElement('p-modal');

    warnIfAriaAndHeadingPropsAreUndefined(host, true, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, false, "{'aria-label': 'OtherHeading'}");
    warnIfAriaAndHeadingPropsAreUndefined(host, true, "{'aria-label': 'OtherHeading'}");

    expect(spy).not.toHaveBeenCalled();

    warnIfAriaAndHeadingPropsAreUndefined(host, false, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, false, null);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'heading prop (deprecated), aria prop or header slot has to be set for component p-modal in order to ensure accessibility.',
      host
    );
    expect(spy).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'heading prop (deprecated), aria prop or header slot has to be set for component p-modal in order to ensure accessibility.',
      host
    );
  });
});
