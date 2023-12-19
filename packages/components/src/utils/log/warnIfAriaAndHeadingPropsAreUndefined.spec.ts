import { warnIfAriaAndHeadingPropsAreUndefined } from './warnIfAriaAndHeadingPropsAreUndefined';

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation();
    const host = document.createElement('p-modal');

    warnIfAriaAndHeadingPropsAreUndefined(host, true, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, false, "{'aria-label': 'OtherHeading'}");
    warnIfAriaAndHeadingPropsAreUndefined(host, true, "{'aria-label': 'OtherHeading'}");

    expect(spy).not.toBeCalled();

    warnIfAriaAndHeadingPropsAreUndefined(host, false, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, false, null);

    expect(spy).toBeCalledTimes(2);
  });
});
