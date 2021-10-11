import { getConsoleErrorsAmount, goto, initConsoleObserver } from '../helpers';
import { Page } from 'puppeteer';
import { ComponentMeta, getComponentMeta, INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

/**
 * When stencil web components are unmounted directly, their lifecycle hooks are invoked after disconnectedCallback.
 * This can lead to exceptions when components require references to their parent element which is already gone.
 * https://github.com/ionic-team/stencil/issues/2502
 */
it.each(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))(
  'should not throw error after disconnectedCallback for %s',
  async (tagName) => {
    initConsoleObserver(page);
    await goto(page, ''); // start page

    const buildMarkup = (tagName: TagName, componentMeta: ComponentMeta) => {
      const buildChildMarkup = (requiredChild: string): string => {
        if (requiredChild) {
          return requiredChild.startsWith('input') ? `<${requiredChild} />` : `<${requiredChild}></${requiredChild}>`;
        } else {
          return 'Some child';
        }
      };

      const buildParentMarkup = (markup: string, { requiredParent }: ComponentMeta): string => {
        if (requiredParent) {
          const markupWithParent = `<${requiredParent}>${markup}</${requiredParent}>`;
          return buildParentMarkup(markupWithParent, getComponentMeta(requiredParent));
        } else {
          return markup;
        }
      };

      const componentMarkup = `<${tagName}>${buildChildMarkup(componentMeta.requiredChild)}</${tagName}>`;

      return buildParentMarkup(componentMarkup, componentMeta);
    };

    const markup = buildMarkup(tagName, getComponentMeta(tagName));

    await page.evaluate(
      (tag: TagName, markup: string) => {
        document.getElementById('app').innerHTML = markup;
        document.getElementById('app').querySelector(tag).remove(); // remove component immediately
      },
      tagName,
      markup
    );

    await page.waitForTimeout(100);
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  }
);
