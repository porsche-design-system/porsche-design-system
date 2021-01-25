import { ElementHandle, Page } from 'puppeteer';
import { goto, selectNode } from '../helpers';
import { browser } from '../config';

const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';
const HYDRATED_CLASS = 'hydrated';

describe('core-class-names', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getClassName = async (element: ElementHandle): Promise<string> => {
    return element.evaluate((el) => el.className);
  };

  const getButton1 = () => selectNode(page, 'p-button:first-child');
  const getButton2 = () => selectNode(page, 'p-button:last-child');

  it('should map className to class initially', async () => {
    await goto(page, 'core-class-names');

    const button = await getButton1();
    const className = await getClassName(button);

    expect(className).toContain(SOME_CLASS_1);
    expect(className).toContain(SOME_CLASS_2);
    expect(className).toContain(HYDRATED_CLASS);
  });

  it('should keep hydrated class on rerender with className change', async () => {
    await goto(page, 'core-class-names');

    const button = await getButton1();

    let className = await getClassName(button);
    expect(className).toContain(HYDRATED_CLASS);

    await button.click();

    className = await getClassName(button);
    expect(className).toContain(HYDRATED_CLASS);
  });

  it('should keep added class on rerender with className change', async () => {
    await goto(page, 'core-class-names');

    const button = await getButton1();
    const addedClass = 'xyClass';
    await button.evaluate((el, addedClass) => {
      el.classList.add(addedClass);
    }, addedClass);

    let className = await getClassName(button);
    expect(className).toContain(addedClass);

    await button.click();
    className = await getClassName(button);

    expect(className).toContain(SOME_CLASS_1);
    expect(className).not.toContain(SOME_CLASS_2);
    expect(className).toContain(HYDRATED_CLASS);
    expect(className).toContain(addedClass);
  });

  it('should keep other classes if one is removed', async () => {
    await goto(page, 'core-class-names');

    const button = await getButton1();
    let className = await getClassName(button);

    expect(className).toContain(SOME_CLASS_1);
    expect(className).toContain(SOME_CLASS_2);

    await button.click();

    className = await getClassName(button);

    expect(className).toContain(SOME_CLASS_1);
    expect(className).not.toContain(SOME_CLASS_2);
  });

  it('should not interfere with classNames of another PButton', async () => {
    await goto(page, 'core-class-names');

    const button1 = await getButton1();
    const button2 = await getButton2();

    await button1.click();

    let className1 = await getClassName(button1);

    expect(className1).toContain(HYDRATED_CLASS, 'className1, before button2 click');
    expect(className1).toContain(SOME_CLASS_1, 'className1, before button2 click');
    expect(className1).not.toContain(SOME_CLASS_2, 'className1, before button2 click');

    await button2.click();

    const className2 = await getClassName(button2);
    className1 = await getClassName(button1);

    expect(className2).toContain(HYDRATED_CLASS, 'className2, after button2 click');
    expect(className2).toContain(SOME_CLASS_1, 'className2, after button2 click');
    expect(className2).not.toContain(SOME_CLASS_2, 'className2, after button2 click');

    expect(className1).toContain(HYDRATED_CLASS, 'className1, after button2 click');
    expect(className1).toContain(SOME_CLASS_1, 'className1, after button2 click');
    expect(className1).not.toContain(SOME_CLASS_2, 'className1, after button2 click');
  });
});
