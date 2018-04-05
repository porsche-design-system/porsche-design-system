import {browser, by, element} from 'protractor';

export class TextPage {
  navigateTo() {
    return browser.get('/atoms/text');
  }

  getH1Component() {
    return element(by.css('pui-h1'));
  }

  getH1Directive() {
    return element(by.css('span[puiH1]'));
  }

  getH2Component() {
    return element(by.css('pui-h2'));
  }

  getH2Directive() {
    return element(by.css('span[puiH2]'));
  }

  getH3Component() {
    return element(by.css('pui-h3'));
  }

  getH3Directive() {
    return element(by.css('span[puiH3]'));
  }
}
