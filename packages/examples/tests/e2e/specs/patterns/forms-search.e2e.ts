import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search` – a search field filters dealer choices in a controlled popover. The arrow keys move a highlight,
 * and Enter writes that choice into the field.
 */

const url = getExampleUrl('patterns-forms-search');

const popover = (page: Page) => page.locator('#dealer-search-popover');
const field = (page: Page) => page.locator('#dealer-search input');

/**
 * Ids a combobox relationship in the browser accessibility tree.
 *
 * String `aria-controls` and `aria-activedescendant` cannot name elements from inside the field's shadow tree. The
 * page sets the element references instead, and this reads the relationship the tree actually exposes. CDP is
 * Chromium-only.
 */
const relationshipIds = async (page: Page, name: 'controls' | 'activedescendant'): Promise<string[]> => {
  const client = await page.context().newCDPSession(page);
  try {
    await client.send('Accessibility.enable');
    const { nodes } = await client.send('Accessibility.getFullAXTree');
    const combobox = nodes.find((node) => node.role?.value === 'combobox' && node.name?.value === 'City');
    const property = combobox?.properties?.find((item) => item.name === name);
    return (property?.value.relatedNodes ?? []).flatMap((node) => (node.idref ? [node.idref] : []));
  } finally {
    await client.detach();
  }
};

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('role', 'combobox');
  await expect(field(page)).toHaveAttribute('aria-autocomplete', 'list');
  await expect(field(page)).toHaveAttribute('aria-haspopup', 'listbox');
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect
    .poll(() => field(page).evaluate((input) => input.ariaControlsElements?.[0]?.id === 'dealer-search-results'))
    .toBe(true);
});

test('filters dealer choices and writes the highlighted one into the field', async ({ page, browserName }) => {
  await setupExamplePage(page, url);

  await field(page).fill('stu');

  const stuttgart = page.getByRole('option', { name: 'Stuttgart', exact: true });
  await expect(stuttgart).toBeVisible();
  await expect(page.getByRole('option', { name: 'Stuttgart Airport' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Berlin', exact: true })).toBeHidden();
  expect(await isOpen(popover(page))).toBe(true);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'true');
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipIds(page, 'controls')).toEqual(['dealer-search-results']);
  }

  await page.keyboard.press('ArrowDown');
  await expect(stuttgart).toHaveClass(/bg-frosted/);
  await expect(stuttgart).toHaveAttribute('aria-selected', 'true');
  await expect
    .poll(() =>
      field(page).evaluate((input) => input.ariaActiveDescendantElement?.id === 'dealer-search-result-stuttgart')
    )
    .toBe(true);
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipIds(page, 'activedescendant')).toEqual(['dealer-search-result-stuttgart']);
  }

  await page.keyboard.press('Enter');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(field(page)).toHaveValue('Stuttgart');
});

test('closes on Escape without clearing the query and stays closed until the query changes', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  await input.fill('ham');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('option', { name: 'Hamburg', exact: true })).toBeVisible();

  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('ham');
  await expect(input).toHaveAttribute('aria-expanded', 'false');

  await input.focus();
  expect(await isOpen(popover(page))).toBe(false);

  await input.fill('hamb');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('option', { name: 'Hamburg', exact: true })).toBeVisible();
});

test('reopens the list with ArrowDown and highlights the first match', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  const hamburg = page.getByRole('option', { name: 'Hamburg', exact: true });

  await input.fill('ham');
  await expect(hamburg).toBeVisible();
  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);

  await page.keyboard.press('ArrowDown');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(hamburg).toHaveAttribute('aria-selected', 'true');
});

test('submits the query with the Search button and the highlighted choice when there is one', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);
  const submit = page.getByRole('button', { name: 'Search' });

  await input.fill('ham');
  await submit.click();
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('ham');

  await input.fill('ber');
  await page.keyboard.press('ArrowDown');
  await submit.click();
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('Berlin');
});

test('announces when nothing matches', async ({ page }) => {
  await setupExamplePage(page, url);

  await field(page).fill('zzz');
  await expect(page.locator('#dealer-search-empty')).toBeVisible();
  await expect(page.locator('#dealer-search-status')).toHaveText('No results');

  await field(page).fill('');
  await expect(page.locator('#dealer-search-status')).toHaveText('');
});
