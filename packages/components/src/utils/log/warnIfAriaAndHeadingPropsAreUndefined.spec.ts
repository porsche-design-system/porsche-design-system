import { warnIfAriaAndHeadingPropsAreUndefined } from './warnIfAriaAndHeadingPropsAreUndefined';

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation();
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
      'heading or aria has to be set via property for component p-modal in order to ensure accessibility.',
      host
    );
    expect(spy).toHaveBeenCalledWith(
      '[Porsche Design System]',
      'heading or aria has to be set via property for component p-modal in order to ensure accessibility.',
      host
    );
  });
});
