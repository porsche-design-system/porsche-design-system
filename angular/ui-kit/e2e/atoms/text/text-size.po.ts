import {browser, by, element} from 'protractor';

export class TextSizePage {
  navigateTo() {
    return browser.get('/atoms/text/text-size');
  }

  getTextSize1Component() {
    return element(by.css('pui-text-size-1'));
  }

  getTextSize1Directive() {
    return element(by.css('span[puiTextSize1]'));
  }
}
