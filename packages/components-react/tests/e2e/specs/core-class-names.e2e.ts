import { Page } from 'puppeteer';
import { getCssClasses, selectNode, waitForComponentsReady } from '../helpers';
import { browser } from '../config';

const URL = 'http://localhost:3000/core-class-names';
const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';
const HYDRATED_CLASS = 'hydrated';

describe('core-class-names', () => {
  let page: Page;

  const goto = async () => {
    await page.goto(`${URL}`);
    await waitForComponentsReady(page);
  };

  beforeEach(async () => {
    page = await browser.newPage();
    await goto();
    await page.waitForSelector('html.hydrated');
  });
  afterEach(async () => await page.close());

  const getButton1 = () => selectNode(page, 'p-button#button1');
  const getButton2 = () => selectNode(page, 'p-button#button2');

  it('should map className to class initially', async () => {
    const button = await getButton1();

    const classList = await getCssClasses(button);

    expect(classList).toContain(SOME_CLASS_1);
    expect(classList).toContain(SOME_CLASS_2);
    expect(classList).toContain(HYDRATED_CLASS);
  });

  it('should keep hydrated class on rerender with className change', async () => {
    const button = await getButton1();

    let classList = await getCssClasses(button);
    expect(classList).toContain(HYDRATED_CLASS);

    await button.click();

    classList = await getCssClasses(button);
    expect(classList).toContain(HYDRATED_CLASS);
  });

  it('should keep added class on rerender with className change', async () => {
    const button = await getButton1();
    const addedClass = 'xyClass';
    await button.evaluate((el, addedClass) => {
      el.classList.add(addedClass);
    }, addedClass);

    let classList = await getCssClasses(button);
    expect(classList).toContain(addedClass);

    await button.click();
    classList = await getCssClasses(button);

    expect(classList).toContain(SOME_CLASS_1);
    expect(classList).not.toContain(SOME_CLASS_2);
    expect(classList).toContain(HYDRATED_CLASS);
    expect(classList).toContain(addedClass);
  });

  it('should keep other classes if one is removed', async () => {
    const button = await getButton1();
    let classList = await getCssClasses(button);

    expect(classList).toContain(SOME_CLASS_1);
    expect(classList).toContain(SOME_CLASS_2);

    await button.click();

    classList = await getCssClasses(button);

    expect(classList).toContain(SOME_CLASS_1);
    expect(classList).not.toContain(SOME_CLASS_2);
  });

  it('should not interfere with classNames of another PButton', async () => {
    const button1 = await getButton1();
    const button2 = await getButton2();

    await button1.click();

    let classList1 = await getCssClasses(button1);

    expect(classList1).toContain(HYDRATED_CLASS);
    expect(classList1).toContain(SOME_CLASS_1);
    expect(classList1).not.toContain(SOME_CLASS_2);

    await button2.click();

    const classList2 = await getCssClasses(button2);
    classList1 = await getCssClasses(button1);

    expect(classList2).toContain(HYDRATED_CLASS);
    expect(classList2).toContain(SOME_CLASS_1);
    expect(classList2).not.toContain(SOME_CLASS_2);

    expect(classList1).toContain(HYDRATED_CLASS);
    expect(classList1).toContain(SOME_CLASS_1);
    expect(classList1).not.toContain(SOME_CLASS_2);
  });
});
