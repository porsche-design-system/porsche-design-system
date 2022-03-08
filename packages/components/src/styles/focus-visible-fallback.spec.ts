import { getFocusVisibleFallback, supportsFocusVisible } from './focus-visible-fallback';
import * as focusVisibleFallbackUtils from './focus-visible-fallback';
import type { JssStyle } from 'jss';

describe('supportsFocusVisible()', () => {
  it('should temporarily add style tag into head', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.head, 'appendChild');
    supportsFocusVisible();

    expect(createElementSpy).toHaveBeenCalledWith('style');
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(document.querySelector('head style')).toBeNull();
  });

  it('should return true if insertRule does not throw', () => {
    expect(supportsFocusVisible()).toBe(true);
  });

  it('should return false if insertRule throws', () => {
    const style = document.createElement('style');
    document.head.appendChild(style);

    jest.spyOn(document, 'createElement').mockReturnValue(style);
    jest.spyOn(document.head, 'appendChild').mockImplementation((el: HTMLStyleElement) => {
      el.sheet.insertRule = () => {
        throw new Error();
      };
      return el;
    });

    expect(supportsFocusVisible()).toBe(false);
  });
});

describe('getFocusVisibleFallback()', () => {
  const input: JssStyle = { display: 'block', background: 'deeppink' };

  it('should call getHasFocusVisibleSupport() but not supportsFocusVisible()', () => {
    const getHasFocusVisibleSupportSpy = jest.spyOn(focusVisibleFallbackUtils, 'getHasFocusVisibleSupport');
    const supportsFocusVisibleSpy = jest.spyOn(focusVisibleFallbackUtils, 'supportsFocusVisible');
    getFocusVisibleFallback(input);

    expect(getHasFocusVisibleSupportSpy).toHaveBeenCalledTimes(1);
    expect(supportsFocusVisibleSpy).not.toBeCalled();
  });

  it('should return input if :focus-visible is supported', () => {
    expect(getFocusVisibleFallback(input)).toBe(input);
  });

  it('should return fallback if :focus-visible is not supported', () => {
    jest.spyOn(focusVisibleFallbackUtils, 'getHasFocusVisibleSupport').mockReturnValue(false);
    expect(getFocusVisibleFallback(input)).toEqual({ outline: 0 });
  });
});
