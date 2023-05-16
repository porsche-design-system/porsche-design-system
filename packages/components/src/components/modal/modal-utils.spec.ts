import { clickStartedInScrollbarTrack, warnIfAriaAndHeadingPropsAreUndefined } from './modal-utils';

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-modal');

    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, "{'aria-label': 'OtherHeading'}");
    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', "{'aria-label': 'OtherHeading'}");

    expect(spy).not.toBeCalled();

    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, null, null);

    expect(spy).toBeCalledTimes(2);
  });
});

describe('clickStartedInScrollbarTrack()', () => {
  const ev = new MouseEvent('click', { clientX: 100 });

  it('should return false if scrollHeight > offsetHeight', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 600 });
    Object.defineProperty(host, 'scrollHeight', { value: 400 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(false);
  });

  it('should return true if scrollWidth === offsetWidth and clientX > clientWidth', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 400 });
    Object.defineProperty(host, 'clientWidth', { value: 116 });
    Object.defineProperty(host, 'scrollHeight', { value: 600 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(true);
  });

  it('should return false if scrollWidth !== offsetWidth and clientX < clientWidth', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 400 });
    Object.defineProperty(host, 'clientWidth', { value: 100 });
    Object.defineProperty(host, 'scrollHeight', { value: 600 });
    Object.defineProperty(host, 'scrollWidth', { value: 100 });
    Object.defineProperty(host, 'offsetWidth', { value: 90 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(false);
  });
});
