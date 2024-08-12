import { expect, type Locator, type Page, test } from '@playwright/test';
import { goto } from '../helpers';

const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';
const HYDRATED_CLASS = 'hydrated';

const getClassName = async (element: Locator): Promise<string> => {
  return element.evaluate((el) => el.className);
};

const getButton1 = (page: Page) => page.locator('p-button:first-child');
const getButton2 = (page: Page) => page.locator('p-button:last-child');

test('should map className to class initially', async ({ page }) => {
  await goto(page, 'core-class-names');

  const button = getButton1(page);
  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${SOME_CLASS_2} ${HYDRATED_CLASS}`);
});

test('should keep hydrated class on rerender with className change', async ({ page }) => {
  await goto(page, 'core-class-names');

  const button = getButton1(page);

  expect(await getClassName(button)).toContain(HYDRATED_CLASS);

  await button.click();

  expect(await getClassName(button)).toContain(HYDRATED_CLASS);
});

test('should keep added class on rerender with className change', async ({ page }) => {
  await goto(page, 'core-class-names');

  const button = getButton1(page);
  const addedClass = 'xyClass';
  await button.evaluate((el: Element, addedClass: string): void => {
    el.classList.add(addedClass);
  }, addedClass);

  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${SOME_CLASS_2} ${HYDRATED_CLASS} ${addedClass}`);

  await button.click();

  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${HYDRATED_CLASS} ${addedClass}`);
});

test('should keep other classes if one is removed', async ({ page }) => {
  await goto(page, 'core-class-names');

  const button = getButton1(page);

  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${SOME_CLASS_2} ${HYDRATED_CLASS}`);

  await button.click();

  expect(await getClassName(button)).toBe(`${SOME_CLASS_1} ${HYDRATED_CLASS}`);
});

test('should not interfere with classNames of another PButton', async ({ page }) => {
  await goto(page, 'core-class-names');

  const button1 = getButton1(page);
  const button2 = getButton2(page);

  await button1.click();

  expect(await getClassName(button1), 'button 1 after button 1 click').toBe(`${SOME_CLASS_1} ${HYDRATED_CLASS}`);

  await button2.click();

  expect(await getClassName(button1), 'button 1 after button 2 click').toBe(`${SOME_CLASS_1} ${HYDRATED_CLASS}`);

  expect(await getClassName(button2), 'button 2 after button 2 click').toBe(`${SOME_CLASS_1} ${HYDRATED_CLASS}`);
});
