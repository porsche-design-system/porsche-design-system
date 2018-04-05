import { TextPage } from './text.po';
import {by} from 'protractor';
import {hasClass} from '../../helpers/has-class';

describe('Atoms: Text', () => {
  let page: TextPage;

  beforeEach(() => {
    page = new TextPage();
  });

  it('to display correct tag and classes for Headline 1', () => {
    page.navigateTo();
    const h1 = page.getH1Component().element(by.css('h1'));
    expect(h1.isElementPresent).toBeTruthy();
    expect(hasClass(h1, '-text-size-1-regular')).toBeTruthy();
    expect(h1.getText()).toEqual('I\'m headline 1');
  });

  it('to display correct tag and classes for Headline 1 directive', () => {
    page.navigateTo();
    const span = page.getH1Directive();
    expect(span.isElementPresent).toBeTruthy();
    expect(hasClass(span, '-text-size-1-regular')).toBeTruthy();
    expect(span.getText()).toEqual('I\'m headline 1 directive');
  });

  it('To display correct tag and classes for Headline 2', () => {
    page.navigateTo();
    const h2 = page.getH2Component().element(by.css('h2'));
    expect(h2.isElementPresent).toBeTruthy();
    expect(hasClass(h2, '-text-size-2-regular')).toBeTruthy();
    expect(h2.getText()).toEqual('I\'m headline 2');
  });

  it('to display correct tag and classes for Headline 2 directive', () => {
    page.navigateTo();
    const span = page.getH2Directive();
    expect(span.isElementPresent).toBeTruthy();
    expect(hasClass(span, '-text-size-2-regular')).toBeTruthy();
    expect(span.getText()).toEqual('I\'m headline 2 directive');
  });

  it('To display correct tag and classes for Headline 3', () => {
    page.navigateTo();
    const h3 = page.getH3Component().element(by.css('h3'));
    expect(h3.isElementPresent).toBeTruthy();
    expect(hasClass(h3, '-text-size-3-regular')).toBeTruthy();
    expect(h3.getText()).toEqual('I\'m headline 3');
  });

  it('to display correct tag and classes for Headline 3 directive', () => {
    page.navigateTo();
    const span = page.getH3Directive();
    expect(span.isElementPresent).toBeTruthy();
    expect(hasClass(span, '-text-size-3-regular')).toBeTruthy();
    expect(span.getText()).toEqual('I\'m headline 3 directive');
  });
});
