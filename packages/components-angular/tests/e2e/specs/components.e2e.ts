import type { Page } from 'puppeteer';
import {
  getConsoleErrorsAmount,
  getElementProp,
  getOuterHTML,
  goto,
  initConsoleObserver,
  selectNode,
  waitForComponentsReady,
} from '../helpers';

const console = require('console');

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('overview should work without errors', async () => {
  initConsoleObserver(page);
  await goto(page, 'overview');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

describe('without prefix', () => {
  it('should initialize component deterministically', async () => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const [component1, component2] = await page.$$('p-text-field-wrapper');

    const component1HTML = await getOuterHTML(component1);
    const component2HTML = await getOuterHTML(component2);

    expect(component1HTML).toBe(component2HTML);

    if (component1HTML !== component2HTML) {
      console.log('component1HTML', component1HTML);
      console.log('component2HTML', component2HTML);
    }
  });
});

describe('with prefix', () => {
  const regularSelector = 'p-text-field-wrapper';
  const prefixedSelector = `my-prefix-${regularSelector}`;

  it('should initialize angular component', async () => {
    await goto(page, 'core-initializer-prefixed');

    const prefixedComponent = await selectNode(page, prefixedSelector);

    expect(await getElementProp(prefixedComponent, 'description')).toBe('Some Description');
    expect(await getElementProp(prefixedComponent, 'label')).toBe('Some Label');
  });
});

describe('Form Wrapper with slotted input', () => {
  it('should have no console error if input type is bound', async () => {
    initConsoleObserver(page);
    await goto(page, 'form-wrapper-binding');

    await page.select('select', 'overview');
    await waitForComponentsReady(page);

    // back and forth navigation seems to be necessary to reproduce a bug
    await page.select('select', 'form-wrapper-binding');

    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});

describe('Stepper Horizontal states', () => {
  it('should have no console error if navigated between two pages', async () => {
    initConsoleObserver(page);
    await goto(page, 'stepper-horizontal-navigation-example-start-component');
    expect(getConsoleErrorsAmount()).toBe(0);

    await goto(page, 'stepper-horizontal-navigation-example-second-component');
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});
