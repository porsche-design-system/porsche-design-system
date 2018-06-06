import { TextSizePage } from './text-size.po';
import { by } from 'protractor';
import { hasClass } from '../../helpers/has-class';

describe('Atoms: Text Size', () => {
  let page: TextSizePage;

  beforeEach(() => {
    page = new TextSizePage();
    page.navigateTo();
  });

  it('to display correct tag and classes for Text Size 1', () => {
    const h1 = page.getTextSize1Component().element(by.css('h1'));
    const h1Thin = page.getTextSize1ToggleableComponent().element(by.css('h1'));
    expect(h1.isElementPresent).toBeTruthy();
    expect(h1Thin.isElementPresent).toBeTruthy();
    expect(hasClass(h1, '-text-size-1-regular')).toBeTruthy();
    expect(hasClass(h1, '-text-size-1-thin')).toBeFalsy();
    expect(hasClass(h1Thin, '-text-size-1-thin')).toBeTruthy();
    expect(hasClass(h1Thin, '-text-size-1-regular')).toBeFalsy();
  });

  it('to display correct tag and classes for Text Size 1 directive', () => {
    const span = page.getTextSize1Directive();
    const spanThin = page.getTextSize1ToggleableDirective();
    expect(span.isElementPresent).toBeTruthy();
    expect(spanThin.isElementPresent).toBeTruthy();
    expect(hasClass(span, '-text-size-1-regular')).toBeTruthy();
    expect(hasClass(span, '-text-size-1-thin')).toBeFalsy();
    expect(hasClass(spanThin, '-text-size-1-thin')).toBeTruthy();
    expect(hasClass(spanThin, '-text-size-1-regular')).toBeFalsy();
  });

  it('to keep it\'s content for Text Size 1', () => {
    const h1 = page.getTextSize1Component().element(by.css('h1'));
    expect(h1.getText()).toEqual('I\'m text-size 1');

    const span = page.getTextSize1Directive();
    expect(span.getText()).toEqual('I\'m text-size 1 directive');
  });

  it('to keep existing classes for Text Size 1', () => {
    expect(hasClass(page.getTextSize1Component(), 'a')).toBeTruthy();
    expect(hasClass(page.getTextSize1Directive(), 'b')).toBeTruthy();
  });

  it('to switch between thin and regular for Text Size 1', () => {
    const h1Thin = page.getTextSize1ToggleableComponent().element(by.css('h1'));
    const spanThin = page.getTextSize1ToggleableDirective();
    expect(hasClass(h1Thin, '-text-size-1-thin')).toBeTruthy();
    expect(hasClass(h1Thin, '-text-size-1-regular')).toBeFalsy();
    expect(hasClass(spanThin, '-text-size-1-thin')).toBeTruthy();
    expect(hasClass(spanThin, '-text-size-1-regular')).toBeFalsy();

    h1Thin.click();
    spanThin.click();

    expect(hasClass(h1Thin, '-text-size-1-regular')).toBeTruthy();
    expect(hasClass(h1Thin, '-text-size-1-thin')).toBeFalsy();
    expect(hasClass(spanThin, '-text-size-1-regular')).toBeTruthy();
    expect(hasClass(spanThin, '-text-size-1-thin')).toBeFalsy();
  });
});
