import { TextSizePage } from './text-size.po';
import {by} from 'protractor';
import {hasClass} from '../../helpers/has-class';

describe('Atoms: Text', () => {
  let page: TextSizePage;

  beforeEach(() => {
    page = new TextSizePage();
  });

  it('to display correct tag and classes for Headline 1', () => {
    page.navigateTo();
    const h1 = page.getTextSize1Component().element(by.css('h1'));
    expect(h1.isElementPresent).toBeTruthy();
    expect(hasClass(h1, '-text-size-1-regular')).toBeTruthy();
    expect(h1.getText()).toEqual('I\'m headline 1');
  });

  it('to display correct tag and classes for Headline 1 directive', () => {
    page.navigateTo();
    const span = page.getTextSize1Directive();
    expect(span.isElementPresent).toBeTruthy();
    expect(hasClass(span, '-text-size-1-regular')).toBeTruthy();
    expect(span.getText()).toEqual('I\'m headline 1 directive');
  });
});
