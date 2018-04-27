import { browser, by, element } from 'protractor';

export class TextSizePage {
  navigateTo() {
    return browser.get('/atoms/text/text-size');
  }

  getTextSize1Component() {
    return element(by.css('.a'));
  }

  getTextSize1Directive() {
    return element(by.css('.b'));
  }

  getTextSize1ToggleableComponent() {
    return element(by.css('.c'));
  }

  getTextSize1ToggleableDirective() {
    return element(by.css('.d'));
  }
}
