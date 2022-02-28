import { ElementHandle, Page } from 'puppeteer';
import { goto, selectNode } from '../helpers';

const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';
const SKELETON_PROPERTY_CLASS_NAMES = 'PDS-Skeleton--theme-light PDS-Skeleton--variant-secondary';
const HYDRATED_CLASS = 'hydrated';

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
  expect(await getClassName(button)).toBe(
    `${SOME_CLASS_1} ${SOME_CLASS_2} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`
  );
});

it('should keep hydrated class on rerender with className change', async () => {
  await goto(page, 'core-class-names');

  const button = await getButton1();

  expect(await getClassName(button)).toContain(HYDRATED_CLASS);

  await button.click();

  expect(await getClassName(button)).toContain(HYDRATED_CLASS);
});

it('should keep added class on rerender with className change', async () => {
  await goto(page, 'core-class-names');

  const button = await getButton1();
  const addedClass = 'xyClass';
  await button.evaluate((el: Element, addedClass: string): void => {
    el.classList.add(addedClass);
  }, addedClass);

  expect(await getClassName(button)).toBe(
    `${SOME_CLASS_1} ${SOME_CLASS_2} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS} ${addedClass}`
  );

  await button.click();

  expect(await getClassName(button)).toBe(
    `${SOME_CLASS_1} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS} ${addedClass}`
  );
});

it('should keep other classes if one is removed', async () => {
  await goto(page, 'core-class-names');

  const button = await getButton1();

  expect(await getClassName(button)).toBe(
    `${SOME_CLASS_1} ${SOME_CLASS_2} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`
  );

  await button.click();

  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`);
});

it('should not interfere with classNames of another PButton', async () => {
  await goto(page, 'core-class-names');

  const button1 = await getButton1();
  const button2 = await getButton2();

  await button1.click();

  expect(await getClassName(button1), 'button 1 after button 1 click').toBe(
    `${SOME_CLASS_1} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`
  );

  await button2.click();

  expect(await getClassName(button1), 'button 1 after button 2 click').toBe(
    `${SOME_CLASS_1} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`
  );

  expect(await getClassName(button2), 'button 2 after button 2 click').toBe(
    `${SOME_CLASS_1} ${SKELETON_PROPERTY_CLASS_NAMES} ${HYDRATED_CLASS}`
  );
});
